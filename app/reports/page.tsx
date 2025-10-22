'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockReports } from '@/lib/mock-data';
import { Download, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ReportsPage() {
  const chartData = mockReports.map(report => ({
    month: report.month,
    Focus: report.focus,
    Memory: report.memory,
    Motivation: report.motivation,
    Creativity: report.creativity,
    'Problem Solving': report.problemSolving,
    Overall: report.overallScore
  }));

  const latestReport = mockReports[mockReports.length - 1];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-[#032B61]">Progress Reports</h1>
            <p className="text-[#6B86B4] mt-1">Track your psychological wellness journey over time</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-[#2E58A6] text-[#2E58A6] hover:bg-[#2E58A6] hover:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Progress Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-[#032B61] flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Progress Over Time</span>
            </CardTitle>
            <CardDescription className="text-[#6B86B4]">
              Track your improvement across all skill categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B86B4"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B86B4"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Overall" 
                    stroke="#032B61" 
                    strokeWidth={3}
                    dot={{ fill: '#032B61', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Focus" 
                    stroke="#2E58A6" 
                    strokeWidth={2}
                    dot={{ fill: '#2E58A6', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Memory" 
                    stroke="#6B86B4" 
                    strokeWidth={2}
                    dot={{ fill: '#6B86B4', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Motivation" 
                    stroke="#C6902A" 
                    strokeWidth={2}
                    dot={{ fill: '#C6902A', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Report Summary */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61]">Latest Assessment</CardTitle>
              <CardDescription className="text-[#6B86B4]">
                {latestReport.month} • Most recent results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#F2E5D8] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#032B61] font-medium">Overall Score</span>
                  <span className="text-2xl font-bold text-[#032B61]">{latestReport.overallScore}%</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-[#2E58A6] text-white"
                >
                  +{latestReport.overallScore - mockReports[mockReports.length - 2].overallScore} from last month
                </Badge>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Focus', value: latestReport.focus },
                  { name: 'Memory', value: latestReport.memory },
                  { name: 'Motivation', value: latestReport.motivation },
                  { name: 'Creativity', value: latestReport.creativity },
                  { name: 'Problem Solving', value: latestReport.problemSolving }
                ].map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-[#6B86B4] text-sm">{skill.name}</span>
                    <span className="text-[#032B61] font-semibold">{skill.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report History */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61] flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Report History</span>
              </CardTitle>
              <CardDescription className="text-[#6B86B4]">
                All your past assessments and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReports.slice().reverse().map((report, index) => (
                  <div key={report.month} className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F2E5D8]/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#2E58A6]/10 rounded-full">
                        <BarChart3 className="h-4 w-4 text-[#2E58A6]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#032B61] text-sm">{report.month}</h4>
                        <p className="text-xs text-[#6B86B4]">Overall: {report.overallScore}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {index === 0 && (
                        <Badge variant="secondary" className="bg-[#C6902A]/10 text-[#C6902A] text-xs">
                          Latest
                        </Badge>
                      )}
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-[#032B61]">Key Insights</CardTitle>
            <CardDescription className="text-[#6B86B4]">
              AI-powered analysis of your progress patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">Strongest Growth</span>
                </div>
                <p className="text-sm text-green-700">
                  Your motivation has improved by 7% over the past 2 months, showing excellent progress in goal achievement.
                </p>
              </div>
              <div className="p-4 bg-[#C6902A]/5 border border-[#C6902A]/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-[#C6902A]" />
                  <span className="font-semibold text-[#C6902A]">Consistency</span>
                </div>
                <p className="text-sm text-[#C6902A]">
                  You've maintained steady improvement across all areas, with particular strength in focus and problem-solving.
                </p>
              </div>
              <div className="p-4 bg-[#2E58A6]/5 border border-[#2E58A6]/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-[#2E58A6]" />
                  <span className="font-semibold text-[#2E58A6]">Next Focus</span>
                </div>
                <p className="text-sm text-[#2E58A6]">
                  Consider focusing on memory enhancement techniques to accelerate your overall wellness score growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}