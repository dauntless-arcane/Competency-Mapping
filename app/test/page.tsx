'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Brain, CheckCircle, GripVertical, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { apiClient, getUser } from "@/lib/auth/apiClient";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

/* ------------------------------------
   Types: separate MCQ vs Kolb option
   ------------------------------------ */

interface MCQOption {
  _id: string;
  label: string;
  value: number | string; // API might send number or numeric-string; we'll normalize
}

interface KolbOption {
  _id: string;
  label: string;
  mode: string; // AC | CE | RO | AE
}

/* Generic question type (options can be either) */
interface Question {
  _id: string;
  surveyId: string;
  questionId: string;
  text: string;
  options: Array<MCQOption | KolbOption>;
  // other optional props...
}

/* Test structure */
interface TestData {
  surveyId: string;
  name: string;
  description: string;
  categories?: { name: string }[];
  totalQuestions?: number;
  scoringMethod?: string;
  questions: Question[];
  updatedAt?: string;
}

interface ApiResponse {
  status: boolean;
  error: boolean;
  count?: number;
  data: TestData[];
  message?: string;
}

/* ------------------------------------
   Canonical answers model in state
   ------------------------------------ */

type MCQAnswer = { kind: 'mcq'; value: number };
type KolbRankedItem = { optionId: string; label: string; mode?: string; rank: number };
type KolbAnswer = { kind: 'kolb'; ranked: KolbRankedItem[] };

type Answer = MCQAnswer | KolbAnswer;
type AnswersState = { [questionId: string]: Answer };

/* ------------------------------------
   Helpers: normalize & migrations
   ------------------------------------ */

/** Ensure MCQ option has numeric value and Kolb option has mode */
function normalizeMCQOption(opt: MCQOption, index: number): MCQOption {
  const v = typeof opt.value === 'number' ? opt.value : (typeof opt.value === 'string' && opt.value !== '' ? Number(opt.value) : index);
  return { ...opt, value: Number.isFinite(v) ? v : index };
}

function normalizeKolbOption(opt: KolbOption): KolbOption {
  return { ...opt, mode: opt.mode ?? opt._id };
}

/** Create default answers for question if you want prefill */
function defaultMCQAnswer(): MCQAnswer {
  return { kind: 'mcq', value: -1 };
}

function defaultKolbAnswer(question: Question): KolbAnswer {
  // use options order as default ranking
  const ranked = (question.options as KolbOption[]).map((o: any, i) => ({
    optionId: (o as KolbOption).mode ?? (o as KolbOption)._id,
    label: (o as KolbOption).label,
    mode: (o as KolbOption).mode ?? (o as KolbOption)._id,
    rank: i + 1,
  }));
  return { kind: 'kolb', ranked };
}

/** Migrate older saved answers (buffer) into our canonical state */
function migrateSavedAnswers(raw: any): AnswersState {
  if (!raw || typeof raw !== 'object') return {};
  const out: AnswersState = {};
  for (const qid of Object.keys(raw)) {
    const v = raw[qid];
    // case 1: old MCQ numeric
    if (typeof v === 'number') {
      out[qid] = { kind: 'mcq', value: v };
      continue;
    }
    // case 2: old Kolb as JSON-string
    if (typeof v === "string") {
      try {
        const arr = JSON.parse(v);

        if (Array.isArray(arr)) {
          const ranked: KolbRankedItem[] = arr
            .filter(Boolean) // remove null/undefined before mapping
            .map((it: any, i: number) => {
              const optionId =
                it.optionId ?? it.mode ?? it._id ?? `opt_${i}`;

              return {
                optionId,
                label: it.label ?? "",
                mode: it.mode ?? it.optionId ?? undefined,
                rank: Number(it.rank ?? i + 1)
              } as KolbRankedItem;
            });

          out[qid] = { kind: "kolb", ranked };
          continue;
        }
      } catch { }
    }

    // case 3: already structured (maybe from a previous canonical save)
    if (v && typeof v === 'object') {
      if (v.kind === 'mcq' && typeof v.value === 'number') {
        out[qid] = { kind: 'mcq', value: v.value };
        continue;
      }
      if (v.kind === 'kolb' && Array.isArray(v.ranked)) {
        out[qid] = { kind: 'kolb', ranked: v.ranked.map((it: any, i: number) => ({ optionId: it.optionId ?? `opt${i}`, label: it.label ?? '', mode: it.mode ?? undefined, rank: Number(it.rank ?? (i + 1)) })) };
        continue;
      }
    }
  }
  return out;
}

/** Serialize answers to exactly the payload format you requested */
function serializeAnswersForSubmit(answers: AnswersState, surveyId: string) {
  const ans = Object.entries(answers).map(([questionId, answer]) => {
    if (answer.kind === 'mcq') return { questionId, value: answer.value };
    // kolb: backend expects a JSON-string of array
    return { questionId, value: JSON.stringify(answer.ranked) };
  });
  return { surveyId, ans };
}

/* ------------------------------------
   KolbRanker component (uses structured ranked array)
   ------------------------------------ */

function KolbRanker({
  question,
  savedValue,
  onChange,
}: {
  question: Question;
  savedValue?: KolbAnswer | undefined;
  onChange: (updated: KolbAnswer) => void;
}) {
  // Build items with stable id/mode
  const initial = useMemo(() => {
    return (question.options as KolbOption[]).map((opt) => ({
      id: opt.mode ?? opt._id,
      mode: opt.mode ?? opt._id,
      label: opt.label,
      _raw: opt,
    }));
  }, [question.options]);

  // If there's a saved ranking (savedValue.ranked), sort initial accordingly
  const sortedInitial = useMemo(() => {
    if (!savedValue || !Array.isArray(savedValue.ranked) || savedValue.ranked.length === 0) return initial;
    const map: Record<string, number> = {};
    savedValue.ranked.forEach((r) => (map[r.optionId] = r.rank));
    return [...initial].sort((a, b) => (map[a.mode] ?? 999) - (map[b.mode] ?? 999));
  }, [initial, savedValue]);

  const [items, setItems] = useState(sortedInitial);

  useEffect(() => {
    if (savedValue && Array.isArray(savedValue.ranked) && savedValue.ranked.length > 0) {
      const map: Record<string, number> = {};
      savedValue.ranked.forEach((r) => (map[r.optionId] = r.rank));
      const sorted = [...initial].sort((a, b) => (map[a.mode] ?? 999) - (map[b.mode] ?? 999));
      setItems(sorted);
    } else {
      setItems(initial);
    }
  }, [savedValue, initial]);

  const handleReorder = (newOrder: typeof items) => {
    setItems(newOrder);

    const ranked = newOrder.map((opt, i) => ({
      optionId: opt.mode,
      label: opt.label,
      mode: opt.mode,
      rank: i + 1,
    }));

    onChange({ kind: 'kolb', ranked });
  };

  return (
    <div>
      <p className="text-gray-600 mb-4 text-sm">Drag to rank (1 = most like you, 4 = least like you)</p>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
        {items.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4 cursor-grab active:cursor-grabbing border hover:border-[#2E58A6] transition-colors"
          >
            <GripVertical className="text-gray-400" />
            <span className="text-lg font-medium flex-1 text-[#032B61]">{item.label}</span>
            <span className="w-8 h-8 bg-[#2E58A6] text-white rounded-full flex items-center justify-center font-semibold">{index + 1}</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

/* ------------------------------------
   Main TestPage component
   ------------------------------------ */

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('id') ?? '';

  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [isComplete, setIsComplete] = useState(false);

  const BUFFER_KEY = `testAnswersBuffer_${surveyId}`;

  // Fetch test data
  useEffect(() => {
    if (!surveyId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    const fetchTestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient(`${API_BASE}/users/fetch-tests/${surveyId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const result: ApiResponse = await response.json();
        if (result.status && !result.error && result.data && result.data.length > 0) {
          setTestData(result.data[0]);
        } else {
          throw new Error(result.message || 'Test not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test');
        console.error('Error fetching test:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [surveyId]);

  // Load answers from buffer on mount (after testData is loaded)
  useEffect(() => {
    if (!testData || !surveyId) return;

    const saved = localStorage.getItem(BUFFER_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migrated = migrateSavedAnswers(parsed);
        setAnswers(migrated);
      } catch (e) {
        console.error('Failed to parse saved buffer:', e);
      }
    }
  }, [testData, BUFFER_KEY, surveyId]);

  // Save buffer whenever answers change
  useEffect(() => {
    if (!surveyId) return;
    try {
      localStorage.setItem(BUFFER_KEY, JSON.stringify(answers));
    } catch (e) {
      console.error('Failed to save answers buffer:', e);
    }
  }, [answers, BUFFER_KEY, surveyId]);

  const handleSubmit = async () => {
    if (!answers || Object.keys(answers).length === 0) {
      // you may still want to submit empty, but we'll just return
      return;
    }

    const payload = serializeAnswersForSubmit(answers, surveyId || 'unknown');
    const user = getUser();

    try {
      const response = await apiClient(`${API_BASE}/users/entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-username': user?.username },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('✅ Response:', result);

      if ((result.Status && !result.Error) || (result.status && !result.error)) {
        localStorage.removeItem(BUFFER_KEY);
        router.push('/result');
      } else {
        console.error('❌ Server error:', result.ErrMsg || result.message || result);
      }
    } catch (err) {
      console.error('❌ Request failed:', err);
    } finally {
      try {
        localStorage.removeItem(BUFFER_KEY);
      } catch { }
      setIsComplete(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#2E58A6] mx-auto" />
          <p className="text-[#6B86B4]">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-[#032B61]">Error Loading Test</h3>
                <p className="text-[#6B86B4] mt-2">{error || 'Test not found'}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => router.push('/tests')} variant="outline" className="border-[#6B86B4]">
                  Back to Tests
                </Button>
                <Button onClick={() => window.location.reload()} className="bg-[#2E58A6] hover:bg-[#032B61]">
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const currentQ = testData.questions[currentQuestion];
  const isKolb = testData.surveyId === '9423E14'; // your indicator

  // Completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#032B61] mb-2">Assessment Complete!</h2>
                <p className="text-[#6B86B4]">Thank you for completing {testData.name}.</p>
              </div>
              <div className="bg-[#F2E5D8] p-4 rounded-lg mb-6 space-y-2">
                <p className="text-sm text-[#032B61]"><strong>Test:</strong> {testData.name}</p>
                <p className="text-sm text-[#032B61]"><strong>Questions Answered:</strong> {answeredQuestions} of {testData.questions.length}</p>
                <p className="text-sm text-[#6B86B4] mt-2">{testData.description}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsComplete(false)} className="flex-1 border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Review Answers
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-[#2E58A6] hover:bg-[#032B61] text-white" disabled={isKolb ? false : answeredQuestions < testData.questions.length}>
                  Submit Test <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              {!isKolb && answeredQuestions < testData.questions.length && (
                <p className="text-xs text-red-500 mt-2">
                  Please answer all questions before submitting
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // KOLB UI
  if (isKolb) {
    // ensure options are treated as KolbOption[]
    const kolbOptions = currentQ.options as KolbOption[];

    return (
      <div className="min-h-screen w-full bg-[#F8F4EF] flex justify-center p-6">
        <div className="max-w-3xl w-full">
          <div className="bg-[#2457A6] text-white p-6 rounded-2xl shadow-lg mb-8">
            <h1 className="text-2xl font-bold">{testData.name}</h1>
            <p className="text-white/90 mt-1">Question {currentQuestion + 1} of {testData.questions.length}</p>
            <div className="mt-4 bg-white/10 p-4 rounded-lg">
              <p className="text-white text-lg">Rank these statements from most like you (1) to least like you (4)</p>
            </div>
          </div>

          <KolbRanker
            question={currentQ}
            savedValue={(answers[currentQ.questionId] as KolbAnswer) ?? undefined}
            onChange={(val) => setAnswers((prev) => ({ ...prev, [currentQ.questionId]: val }))}
          />

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setCurrentQuestion((p) => Math.max(0, (p as number) - 1))} disabled={currentQuestion === 0} className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50">
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>

            <div className="flex gap-2">
              <Button onClick={() => currentQuestion < testData.questions.length - 1 ? setCurrentQuestion((p) => (p as number) + 1) : setIsComplete(true)} className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
                {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Non-Kolb UI (MCQ style)
  // normalize options and use safe values
  const mcqOptions = (currentQ.options as MCQOption[]).map((o, i) => normalizeMCQOption(o as MCQOption, i));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-3xl w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4 bg-gradient-to-r from-[#2E58A6] to-[#032B61] text-white rounded-t-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full"><Brain className="h-6 w-6" /></div>
                <div>
                  <CardTitle className="text-white text-xl">{testData.name}</CardTitle>
                  <CardDescription className="text-white/80">Question {currentQuestion + 1} of {testData.questions.length}</CardDescription>
                </div>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">{Math.round(progress)}%</div>
            </div>
            <Progress value={progress} className="h-2 bg-white/30" />
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <AnimatePresence mode="wait">
              <motion.div key={currentQ.questionId} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="space-y-6">
                <div className="p-5 bg-gradient-to-br from-[#F2E5D8] to-[#E8D5C4] rounded-lg border-l-4 border-[#C6902A]">
                  <h3 className="text-lg font-semibold text-[#032B61] mb-3 leading-relaxed">{currentQ.text}</h3>
                </div>

                <RadioGroup
                  value={(answers[currentQ.questionId] && (answers[currentQ.questionId] as MCQAnswer).kind === 'mcq' ? String((answers[currentQ.questionId] as MCQAnswer).value) : '')}
                  onValueChange={(value) => {
                    const numericValue = parseInt(value, 10);
                    setAnswers((prev) => ({ ...prev, [currentQ.questionId]: { kind: 'mcq', value: numericValue } }));
                    // Auto-move to next
                    setTimeout(() => {
                      if (currentQuestion < testData.questions.length - 1) setCurrentQuestion((p) => p + 1);
                      else setIsComplete(true);
                    }, 200);
                  }}
                  className="space-y-3"
                >
                  {mcqOptions.map((option, index) => {
                    const optValue = Number(option.value);
                    const selected = answers[currentQ.questionId] && (answers[currentQ.questionId] as MCQAnswer).kind === 'mcq' && (answers[currentQ.questionId] as MCQAnswer).value === optValue;
                    return (
                      <label key={option._id ?? index} htmlFor={`option-${index}`} className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${selected ? 'border-[#2E58A6] bg-[#2E58A6]/5' : 'border-gray-200 hover:border-[#6B86B4] hover:bg-[#F2E5D8]/30'}`}>
                        <RadioGroupItem value={String(optValue)} id={`option-${index}`} className="border-[#2E58A6]" />
                        <span className="text-[#032B61] font-medium flex-1">{String(option.label)}</span>
                      </label>
                    );
                  })}
                </RadioGroup>

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setCurrentQuestion((p) => Math.max(0, (p as number) - 1))} disabled={currentQuestion === 0} className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                  </Button>

                  <div className="flex gap-2">
                    <Button onClick={() => currentQuestion < testData.questions.length - 1 ? setCurrentQuestion((p) => (p as number) + 1) : setIsComplete(true)} className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
                      {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}