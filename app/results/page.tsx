'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockScores } from '@/lib/mock-data';
import { AlertCircle, CheckCircle, Download, Target, TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

export default function ResultsPage() {
  const chartData = mockScores.map(score => ({
    category: score.category,
    value: score.value,
    fullMark: 100
  }));

  const overallScore = Math.round(mockScores.reduce((sum, score) => sum + score.value, 0) / mockScores.length);

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

  const getScoreDescription = (category: string, score: number) => {
    const descriptions = {
      'Focus': {
        high: 'Excellent concentration abilities. You can maintain attention for extended periods.',
        medium: 'Good focus with room for improvement. Consider mindfulness exercises.',
        low: 'Focus challenges detected. Meditation and attention training recommended.'
      },
      'Memory': {
        high: 'Outstanding memory retention and recall abilities.',
        medium: 'Solid memory skills. Memory techniques could enhance performance.',
        low: 'Memory improvement needed. Consider memory palace and repetition techniques.'
      },
      'Motivation': {
        high: 'Highly motivated and goal-oriented. Excellent drive to succeed.',
        medium: 'Good motivation levels. Setting clearer goals might help.',
        low: 'Low motivation detected. Goal-setting and reward systems recommended.'
      },
      'Creativity': {
        high: 'Exceptional creative thinking and innovation abilities.',
        medium: 'Creative potential present. Explore more artistic and divergent thinking.',
        low: 'Creative skills need development. Try brainstorming and creative exercises.'
      },
      'Problem Solving': {
        high: 'Excellent analytical and problem-solving capabilities.',
        medium: 'Good problem-solving skills. Practice with complex scenarios.',
        low: 'Problem-solving skills need enhancement. Logical thinking exercises recommended.'
      }
    };

    const level = score >= 75 ? 'high' : score >= 60 ? 'medium' : 'low';
    return descriptions[category as keyof typeof descriptions]?.[level] || 'Assessment complete.';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-[#032B61]">Assessment Results</h1>
            <p className="text-[#6B86B4] mt-1">Your psychological wellness profile</p>
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
                  <h3 className="text-2xl font-bold text-[#032B61]">Overall Wellness Score</h3>
                  <p className="text-[#6B86B4]">Based on your assessment responses</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#032B61]">{overallScore}%</div>
                <Badge 
                  variant="secondary" 
                  className={`${overallScore >= 75 ? 'bg-green-100 text-green-800' : overallScore >= 60 ? 'bg-[#C6902A]/10 text-[#C6902A]' : 'bg-red-100 text-red-800'}`}
                >
                  {overallScore >= 75 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61]">Skill Areas Overview</CardTitle>
              <CardDescription className="text-[#6B86B4]">
                Visual representation of your strengths and areas for improvement
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
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#032B61]">Detailed Breakdown</h3>
            {mockScores.map((score) => {
              const Icon = getScoreIcon(score.value);
              return (
                <Card key={score.category} className="shadow-md border-l-4 border-l-[#2E58A6]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${getScoreColor(score.value)}`} />
                        <div>
                          <h4 className="font-semibold text-[#032B61]">{score.category}</h4>
                          <div className={`text-lg font-bold ${getScoreColor(score.value)}`}>
                            {score.value}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B86B4] leading-relaxed">
                      {getScoreDescription(score.category, score.value)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-[#032B61] flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Personalized Recommendations</span>
            </CardTitle>
            <CardDescription className="text-[#6B86B4]">
              Based on your assessment results, we recommend the following courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockScores
                .filter(score => score.value < 75)
                .slice(0, 2)
                .map((score) => (
                  <div key={score.category} className="p-4 bg-[#F2E5D8] rounded-lg">
                    <h4 className="font-semibold text-[#032B61] mb-2">
                      Improve Your {score.category}
                    </h4>
                    <p className="text-sm text-[#6B86B4] mb-3">
                      Enhance your {score.category.toLowerCase()} skills with targeted exercises and techniques.
                    </p>
                    <Button size="sm" className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
                      View Courses
                    </Button>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}