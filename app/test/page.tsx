'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Brain, CheckCircle, GripVertical, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE =`${process.env.NEXT_PUBLIC_API_URL}/api`;

interface Option {
  value: number;
  label: string;
  _id: string;
}

interface Question {
  _id: string;
  surveyId: string;
  questionId: string;
  text: string;
  options: Option[];
  trait: string;
  reversedScore: string;
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


function KolbRanker({ question, savedValue, onChange }) {
  // Initialize items with saved ranking order
  const initial = question.options.map(opt => ({
    ...opt,
    id: opt.mode, // Ensure unique ID for Reorder
  }));

  // If there's a saved value, sort by rank
  const sortedInitial = savedValue && Object.keys(savedValue).length > 0
    ? [...initial].sort((a, b) => (savedValue[a.mode] || 999) - (savedValue[b.mode] || 999))
    : initial;

  const [items, setItems] = useState(sortedInitial);

  useEffect(() => {
    // Update when savedValue changes (e.g., navigating back)
    if (savedValue && Object.keys(savedValue).length > 0) {
      const sorted = [...initial].sort((a, b) => 
        (savedValue[a.mode] || 999) - (savedValue[b.mode] || 999)
      );
      setItems(sorted);
    }
  }, [savedValue]);

  const handleReorder = (newOrder) => {
    setItems(newOrder);

    const ranked = {};
    newOrder.forEach((opt, i) => {
      ranked[opt.mode] = i + 1;
    });

    onChange(ranked);
  };

  return (
    <div>
      <p className="text-gray-600 mb-4 text-sm">
        Drag to rank (1 = most like you, 4 = least like you)
      </p>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-4"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.mode}
            value={item}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4 cursor-grab active:cursor-grabbing border hover:border-[#2E58A6] transition-colors"
          >
            <GripVertical className="text-gray-400" />
            <span className="text-lg font-medium flex-1 text-[#032B61]">
              {item.label}
            </span>
            <span className="w-8 h-8 bg-[#2E58A6] text-white rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

function KolbLayout({
  testData,
  answers,
  setAnswers,
  currentQuestion,
  setCurrentQuestion,
  handleSubmit,
}) {

  const currentQ = testData.questions[currentQuestion];
  const total = testData.questions.length;

  return (
    <div className="min-h-screen p-6 bg-[#FAF7F2] flex justify-center">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="bg-[#2E58A6] text-white p-6 rounded-xl shadow-xl mb-6">
          <h1 className="text-2xl font-bold">{testData.name}</h1>
          <p className="text-white/80">
            Question {currentQuestion + 1} of {total}
          </p>
        </div>

        {/* Ranking Component */}
        <KolbRanker
          question={currentQ}
          savedValue={answers[currentQ.questionId] || {}}
          onChange={(val) =>
            setAnswers(prev => ({
              ...prev,
              [currentQ.questionId]: val
            }))
          }
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (currentQuestion < total - 1) {
                setCurrentQuestion(p => p + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={!answers[currentQ.questionId]}
            className="px-4 py-2 bg-[#2E58A6] text-white rounded-lg disabled:opacity-40"
          >
            {currentQuestion === total - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('id');

  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isComplete, setIsComplete] = useState(false);

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

        const response = await fetch(`${API_BASE}/users/fetch-tests/${surveyId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

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

    const saved = localStorage.getItem(BUFFER_KEY);
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
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(BUFFER_KEY, JSON.stringify(answers));
    }
  }, [answers, BUFFER_KEY]);

  const handleAnswerChange = (value: string) => {
    if (!testData) return;

    const numericValue = parseInt(value, 10);
    setAnswers(prev => ({
      ...prev,
      [testData.questions[currentQuestion].questionId]: numericValue,
    }));
    setTimeout(() => {
      if (currentQuestion < testData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 20);
  };

  const handleNext = () => {
    if (!testData) return;

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    console.log(answers);

    if (!answers || Object.keys(answers).length === 0) return;
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value
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
        localStorage.removeItem(BUFFER_KEY);
        router.push('/result');
      } else {
        console.error('❌ Server error:', result.ErrMsg);
      }
    } catch (err) {
      console.error('❌ Request failed:', err);
    }
    // Clear the buffer
    localStorage.removeItem(BUFFER_KEY);

    // Mark as complete
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
  const answeredQuestions = Object.keys(answers).length;
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
                  <strong>Questions Answered:</strong> {answeredQuestions} of {testData.questions.length}
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

  const isKolb = testData?.surveyId === "9423E14";

if (isKolb) {
  return (
    <div className="min-h-screen w-full bg-[#F8F4EF] flex justify-center p-6">
      <div className="max-w-3xl w-full">

        {/* HEADER */}
        <div className="bg-[#2457A6] text-white p-6 rounded-2xl shadow-lg mb-8">
          <h1 className="text-2xl font-bold">{testData.name}</h1>

          <p className="text-white/90 mt-1">
            Question {currentQuestion + 1} of {testData.questions.length}
          </p>

          {/* Display question text or placeholder */}
          <div className="mt-4 bg-white/10 p-4 rounded-lg">
            <p className="text-white text-lg">
              {currentQ.text && currentQ.text.trim() !== "" 
                ? currentQ.text 
                : "<--question-->"}
            </p>
          </div>

          {/* Show instruction text */}
          <p className="text-white/80 text-sm mt-3">
            Rank these statements from most like you (1) to least like you (4)
          </p>
        </div>

        {/* RANKING UI */}
        <KolbRanker
          question={currentQ}
          savedValue={answers[currentQ.questionId] || {}}
          onChange={(val) =>
            setAnswers(prev => ({
              ...prev,
              [currentQ.questionId]: val
            }))
          }
        />

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
            disabled={currentQuestion === 0}
            className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={() =>
                currentQuestion < testData.questions.length - 1
                  ? setCurrentQuestion((p) => p + 1)
                  : setIsComplete(true)
              }
              disabled={!answers[currentQ.questionId] ||Object.keys(answers[currentQ.questionId]).length !== 4
  }
              className="bg-[#2E58A6] hover:bg-[#032B61] text-white disabled:opacity-50"
            >
              {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );

}
else{
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

    {/* Options */}
    <RadioGroup
      value={answers[currentQ.questionId]?.toString() ?? ''}
      onValueChange={(value) => {
        const numericValue = parseInt(value, 10);
        setAnswers((prev) => ({
          ...prev,
          [currentQ.questionId]: numericValue,
        }));

        // ✅ Auto move to next with smooth animation
        setTimeout(() => {
          if (currentQuestion < testData.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
          } else {
            setIsComplete(true);
          }
        }, 250);
      }}
      className="space-y-3"
    >
      {currentQ.options.map((option, index) => (
        <label
          key={option._id}
          htmlFor={`option-${index}`}
          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
            answers[currentQ.questionId] === option.value
              ? 'border-[#2E58A6] bg-[#2E58A6]/5'
              : 'border-gray-200 hover:border-[#6B86B4] hover:bg-[#F2E5D8]/30'
          }`}
        >
          <RadioGroupItem
            value={option.value.toString()}
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
        onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
        disabled={currentQuestion === 0}
        className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="flex gap-2">
        <Button
          onClick={() =>
            currentQuestion < testData.questions.length - 1
              ? setCurrentQuestion((p) => p + 1)
              : setIsComplete(true)
          }
          disabled={answers[currentQ.questionId] === undefined}
          className="bg-[#2E58A6] hover:bg-[#032B61] text-white disabled:opacity-50"
        >
          {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
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
  
}