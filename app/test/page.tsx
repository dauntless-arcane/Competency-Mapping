'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, ArrowLeft, ArrowRight, Brain, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3010/api';

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

  const handleSubmit = () => {
  if (!answers || Object.keys(answers).length === 0) return;

  // Prepare the JSON string
  const payload = {
    surveyId: testData?.surveyId || 'unknown',
    username: 'testuser',
    answers,
  };

  const dataStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'test-results.json';
  a.click();
  URL.revokeObjectURL(url);

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
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-[#F2E5D8] to-[#E8D5C4] rounded-lg border-l-4 border-[#C6902A]">
                <h3 className="text-lg font-semibold text-[#032B61] mb-3 leading-relaxed">
                  {currentQ.text}
                </h3>
              </div>

              <RadioGroup
                value={answers[currentQ.questionId]?.toString() || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={option._id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
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
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-[#032B61] cursor-pointer flex-1 font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
                onClick={handleNext}
                disabled={!answers[currentQ.questionId]}
                className="bg-[#2E58A6] hover:bg-[#032B61] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === testData.questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#6B86B4]">
                  Answered: {answeredQuestions} / {testData.questions.length}
                </p>
                <div className="flex gap-1">
                  {testData.questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-2 rounded-full ${
                        answers[testData.questions[idx].questionId]
                          ? 'bg-green-500'
                          : idx === currentQuestion
                          ? 'bg-[#2E58A6]'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}