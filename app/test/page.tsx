'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Brain, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/auth/apiClient';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface Option {
  value?: number;        // for normal MCQ/scale questions
  label: string;
  _id?: string;          // may be absent for some rank options
  mode?: string;         // for rank questions (e.g. CE, RO, etc.)
}

interface Question {
  _id: string;
  surveyId: string;
  questionId: string;
  text: string;
  options: Option[];
  trait: string;
  reversedScore: string;
  optionType?: string;   // "rank" | other
  __v: number;
}

interface Category {
  name: string;
}

interface TestData {
  surveyId: string;
  name: string;
  description: string;
  categories: Category[];
  totalQuestions: number;
  scoringMethod: string;
  questions: Question[];
  updatedAt: string;
}

interface ApiResponse {
  status: boolean;
  error: boolean;
  count?: number;
  data: TestData[];
  message?: string;
}

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('id');

  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | string }>({});
  const [isComplete, setIsComplete] = useState(false);

  // for rank questions
  const [rankOrder, setRankOrder] = useState<Option[]>([]);

  const BUFFER_KEY = `testAnswersBuffer_${surveyId}`;

  // Fetch test data from API
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
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

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

  // Load answers from buffer on mount
  useEffect(() => {
    if (!testData) return;

    const saved = typeof window !== 'undefined' ? localStorage.getItem(BUFFER_KEY) : null;
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, [testData, BUFFER_KEY]);

  // Save buffer whenever answers change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(BUFFER_KEY, JSON.stringify(answers));
    }
  }, [answers, BUFFER_KEY]);

  // When question changes, set up rankOrder (for rank type)
  useEffect(() => {
    if (!testData) return;
    const q = testData.questions[currentQuestion];
    if (!q) return;

    if (q.optionType === 'rank') {
      const savedValue = answers[q.questionId];

      if (typeof savedValue === 'string') {
        try {
          const parsed: { optionId: string; label?: string; mode?: string; rank: number }[] =
            JSON.parse(savedValue);

          const getId = (o: Option) => o._id || o.mode || o.label;
          const sorted = [...q.options].sort((a, b) => {
            const aid = getId(a);
            const bid = getId(b);
            const ap = parsed.findIndex((p) => p.optionId === aid);
            const bp = parsed.findIndex((p) => p.optionId === bid);
            const aIndex = ap === -1 ? Number.MAX_SAFE_INTEGER : ap;
            const bIndex = bp === -1 ? Number.MAX_SAFE_INTEGER : bp;
            return aIndex - bIndex;
          });

          setRankOrder(sorted);
          return;
        } catch (e) {
          console.warn('Failed to parse saved rank answer, resetting order.', e);
        }
      }

      // default order if none saved or parse failed
      setRankOrder(q.options);
    }
  }, [testData, currentQuestion, answers]);

  const handleAnswerChange = (value: string) => {
    if (!testData) return;

    const numericValue = parseInt(value, 10);
    const qId = testData.questions[currentQuestion].questionId;

    setAnswers((prev) => ({
      ...prev,
      [qId]: numericValue,
    }));

    // auto-next
    setTimeout(() => {
      if (currentQuestion < testData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 200);
  };

  const handleNext = () => {
    if (!testData) return;

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Save ranking for current question & go next
  const handleRankSaveNext = () => {
    if (!testData) return;
    const q = testData.questions[currentQuestion];
    if (!q) return;

    const getId = (o: Option) => o._id || o.mode || o.label;

    const serialized = JSON.stringify(
      rankOrder.map((o, index) => ({
        optionId: getId(o),
        label: o.label,
        mode: o.mode,
        rank: index + 1,
      }))
    );

    setAnswers((prev) => ({
      ...prev,
      [q.questionId]: serialized,
    }));

    setTimeout(() => {
      if (currentQuestion < testData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 200);
  };

  const handleSubmit = async () => {
    console.log(answers);

    if (!answers || Object.keys(answers).length === 0) return;

    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    const payload = {
      surveyId: surveyId || 'unknown',
      ans: formattedAnswers,
    };

    try {
      const response = await fetch(`${API_BASE}/users/entry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-username': 'testuser',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('✅ Response:', result);

      if (result.Status && !result.Error) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(BUFFER_KEY);
        }
        router.push('/result');
      } else {
        console.error('❌ Server error:', result.ErrMsg);
      }
    } catch (err) {
      console.error('❌ Request failed:', err);
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem(BUFFER_KEY);
    }

    setIsComplete(true);
  };

  // Loading state
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

  // Error state
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
                <Button
                  onClick={() => router.push('/tests')}
                  variant="outline"
                  className="border-[#6B86B4]"
                >
                  Back to Tests
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-[#2E58A6] hover:bg-[#032B61]"
                >
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
const answeredQuestions = testData.questions.filter(
  (q) => answers[q.questionId] !== undefined && answers[q.questionId] !== null && answers[q.questionId] !== ""
).length;
  const currentQ = testData.questions[currentQuestion];

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
                <p className="text-[#6B86B4]">
                  Thank you for completing {testData.name}.
                </p>
              </div>
              <div className="bg-[#F2E5D8] p-4 rounded-lg mb-6 space-y-2">
                <p className="text-sm text-[#032B61]">
                  <strong>Test:</strong> {testData.name}
                </p>
                <p className="text-sm text-[#032B61]">
                  <strong>Questions Answered:</strong> {answeredQuestions} of{' '}
                  {testData.questions.length}
                </p>
                <p className="text-sm text-[#6B86B4] mt-2">
                  {testData.description}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsComplete(false)}
                  className="flex-1 border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Review Answers
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#2E58A6] hover:bg-[#032B61] text-white"
                  disabled={answeredQuestions < testData.questions.length}
                >
                  Submit Test
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              {answeredQuestions < testData.questions.length && (
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-3xl w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4 bg-gradient-to-r from-[#2E58A6] to-[#032B61] text-white rounded-t-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">{testData.name}</CardTitle>
                  <CardDescription className="text-white/80">
                    Question {currentQuestion + 1} of {testData.questions.length}
                  </CardDescription>
                </div>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/30" />
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.questionId}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* Question */}
                <div className="p-5 bg-gradient-to-br from-[#F2E5D8] to-[#E8D5C4] rounded-lg border-l-4 border-[#C6902A]">
                  <h3 className="text-lg font-semibold text-[#032B61] mb-3 leading-relaxed">
                    {currentQ.text}
                  </h3>
                </div>

                {/* Options / Rank UI */}
                {currentQ.optionType === 'rank' ? (
                  <>
                    <div className="space-y-4">
                      <p className="text-[#032B61] text-sm">
                        Drag the options to rank them in order of preference.
                      </p>

                      <Reorder.Group
                        axis="y"
                        values={rankOrder}
                        onReorder={setRankOrder}
                        className="space-y-3"
                      >
                        {rankOrder.map((option) => {
                          const key = option._id || option.mode || option.label;
                          return (
                            <Reorder.Item
                              key={key}
                              value={option}
                              className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between"
                            >
                              <span className="text-[#032B61] font-medium">{option.label}</span>
                              {option.mode && (
                                <span className="text-xs px-2 py-1 rounded-full bg-[#F2E5D8] text-[#032B61]">
                                  {option.mode}
                                </span>
                              )}
                            </Reorder.Item>
                          );
                        })}
                      </Reorder.Group>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        onClick={handleRankSaveNext}
                        className="bg-[#2E58A6] hover:bg-[#032B61] text-white"
                      >
                        {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Save & Next'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <RadioGroup
                      value={answers[currentQ.questionId]?.toString() ?? ''}
                      onValueChange={handleAnswerChange}
                      className="space-y-3"
                    >
                      {currentQ.options.map((option, index) => (
                        <label
                          key={option._id ?? `${currentQ.questionId}-${index}`}
                          htmlFor={`option-${index}`}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            answers[currentQ.questionId] === option.value
                              ? 'border-[#2E58A6] bg-[#2E58A6]/5'
                              : 'border-gray-200 hover:border-[#6B86B4] hover:bg-[#F2E5D8]/30'
                          }`}
                        >
                          <RadioGroupItem
                            value={option.value?.toString() ?? ''}
                            id={`option-${index}`}
                            className="border-[#2E58A6]"
                          />
                          <span className="text-[#032B61] font-medium flex-1">{option.label}</span>
                        </label>
                      ))}
                    </RadioGroup>

                    {/* Buttons */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        onClick={handleNext}
                        disabled={answers[currentQ.questionId] === undefined}
                        className="bg-[#2E58A6] hover:bg-[#032B61] text-white disabled:opacity-50"
                      >
                        {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
