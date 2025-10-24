'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockTestQuestions } from '@/lib/mock-data';
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const BUFFER_KEY = 'testAnswersBuffer';

export default function TestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isComplete, setIsComplete] = useState(false);

  // --- Load answers from buffer on mount ---
  useEffect(() => {
    const saved = localStorage.getItem(BUFFER_KEY);
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  // --- Save buffer whenever answers change ---
  useEffect(() => {
    localStorage.setItem(BUFFER_KEY, JSON.stringify(answers));
  }, [answers]);

  const progress = ((currentQuestion + 1) / mockTestQuestions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [mockTestQuestions[currentQuestion].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < mockTestQuestions.length - 1) {
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

  // --- Download results as JSON + clear buffer ---
  const handleSubmit = async () => {
  const payload = {
    surveyId: 'refderfdvcxfdcx',
    username:"ab",
    ans: answers
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
      router.push('/results');
    } else {
      console.error('❌ Server error:', result.ErrMsg);
    }
  } catch (err) {
    console.error('❌ Request failed:', err);
  }
    // Clear buffer
    localStorage.removeItem(BUFFER_KEY);

    // Redirect to results page
    router.push('/results');
  };

  if (isComplete) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#032B61] mb-2">Assessment Complete!</h2>
                <p className="text-[#6B86B4]">
                  Thank you for completing the psychological wellness assessment.
                </p>
              </div>
              <div className="bg-[#F2E5D8] p-4 rounded-lg mb-6">
                <p className="text-sm text-[#032B61]">
                  <strong>Questions Answered:</strong> {answeredQuestions} of {mockTestQuestions.length}
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white"
              >
                Submit Test 
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const question = mockTestQuestions[currentQuestion];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#2E58A6]/10 rounded-full">
                  <Brain className="h-5 w-5 text-[#2E58A6]" />
                </div>
                <div>
                  <CardTitle className="text-[#032B61]">Psychological Assessment</CardTitle>
                  <CardDescription className="text-[#6B86B4]">
                    Question {currentQuestion + 1} of {mockTestQuestions.length}
                  </CardDescription>
                </div>
              </div>
              <div className="text-sm text-[#6B86B4]">
                {Math.round(progress)}% Complete
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-[#F2E5D8] rounded-lg">
                <h3 className="text-lg font-semibold text-[#032B61] mb-2">
                  {question.question}
                </h3>
                <div className="text-sm text-[#6B86B4] flex items-center space-x-2">
                  <span className="px-2 py-1 bg-[#2E58A6] text-white rounded text-xs">
                    {question.category}
                  </span>
                </div>
              </div>

              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#F2E5D8]/30 transition-colors"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-[#032B61] cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className="bg-[#2E58A6] hover:bg-[#032B61] text-white"
              >
                {currentQuestion === mockTestQuestions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
