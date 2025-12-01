'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Download, Target, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { apiClient, getUser } from "@/lib/auth/apiClient";

interface Trait {
  trait: string;
  description: string;
  _id: string;
}

interface FullResult {
  name: string;
  level: string;
  surveyId: string;
  attemptId: string;
  overallSummary: string;
  traitBreakdown: Trait[];
  dateAttempted: string;
  TestStatus: string;
}

interface ApiResponse {
  Status: boolean;
  Error: boolean;
  Msg: string;
  Result: FullResult;
}

export default function ResultsPage() {
  const params = useSearchParams();
  const attemptId = params.get('id');

  const [result, setResult] = useState<FullResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!attemptId) {
      setError('No attempt ID provided');
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const user = getUser();
        
        setLoading(true);
        const response = await apiClient(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/result/${user?.username}/${attemptId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data: ApiResponse = await response.json();

        if (data.Status && !data.Error) {
          setResult(data.Result);
        } else {
          throw new Error(data.Msg || 'Invalid response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch result');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [attemptId]);

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-[#032B61] animate-pulse text-xl">Loading your results...</div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error || !result) {
    return (
      <MainLayout>
        <div className="min-h-screen flex justify-center items-center">
          <Card className="p-6 max-w-md text-center border-red-200">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-medium mb-2">Failed to load results</p>
            <p className="text-gray-600">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Convert traitBreakdown to chart format
  const chartData = result.traitBreakdown.map(tr => {
    const score = parseInt(tr.description.match(/\d+/)?.[0] || '0');
    return {
      category: tr.trait,
      value: score,
      fullMark: 100
    };
  });

  const overallScore = Math.round(
    chartData.reduce((sum, score) => sum + score.value, 0) / chartData.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-[#C6902A]';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return CheckCircle;
    if (score >= 60) return Target;
    return AlertCircle;
  };



  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-[#032B61]">{result.name}</h1>
            <p className="text-[#6B86B4] mt-1">
              Completed on {new Date(result.dateAttempted).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Button className="bg-[#C6902A] hover:bg-[#C6902A]/80 text-white w-fit">
            <Download className="h-4 w-4 mr-2" />
            Download Report (PDF)
          </Button>
        </div>

        {/* Overall Score */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#2E58A6]/10 rounded-full">
                  <TrendingUp className="h-8 w-8 text-[#2E58A6]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#032B61]">Overall Personality Score</h3>
                  <p className="text-[#6B86B4]">Based on {result.traitBreakdown.length} personality traits</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#032B61]">{overallScore}%</div>
                <Badge 
                  variant="secondary" 
                  className={`${overallScore >= 75 ? 'bg-green-100 text-green-800' : overallScore >= 60 ? 'bg-[#C6902A]/10 text-[#C6902A]' : 'bg-red-100 text-red-800'}`}
                >
                  {result.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61]">Personality Traits Overview</CardTitle>
              <CardDescription className="text-[#6B86B4]">
                Visual representation of your personality profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" className="text-[#032B61] text-sm" />
                    <PolarRadiusAxis 
                      angle={0} 
                      domain={[0, 100]} 
                      tick={false}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#2E58A6"
                      fill="#2E58A6"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trait Scores */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#032B61]">Detailed Breakdown</h3>
            {result.traitBreakdown.map((trait) => {
              const score = parseInt(trait.description.match(/\d+/)?.[0] || '0');
              const Icon = getScoreIcon(score);
              return (
                <Card key={trait._id} className="shadow-md border-l-4 border-l-[#2E58A6]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${getScoreColor(score)}`} />
                        <div>
                          <h4 className="font-semibold text-[#032B61]">{trait.trait}</h4>
                          <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                            {score}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B86B4] leading-relaxed">
                      {trait.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-[#032B61] flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Overall Summary</span>
            </CardTitle>
            <CardDescription className="text-[#6B86B4]">
              A brief overview of your personality assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#032B61] leading-relaxed">
              {result.overallSummary}
            </p>
            <div className="mt-4 p-4 bg-[#F2E5D8] rounded-lg">
              <p className="text-sm text-[#6B86B4]">
                <strong className="text-[#032B61]">Test Status:</strong> {result.TestStatus}
              </p>
              <p className="text-sm text-[#6B86B4] mt-1">
                <strong className="text-[#032B61]">Survey ID:</strong> {result.surveyId}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}