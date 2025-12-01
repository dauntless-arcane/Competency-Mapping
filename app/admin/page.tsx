'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUser, mockScores, mockCourses, mockReports } from '@/lib/mock-data';
import { Users, BookOpen, TrendingUp, BarChart3, Plus, Eye } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  // Mock admin data
  const adminStats = {
    totalUsers: 1247,
    totalCourses: 45,
    activeAssessments: 89,
    avgCompletionRate: 78
  };

  const categoryAverages = mockScores.map(score => ({
    category: score.category,
    average: score.value + Math.random() * 10 - 5, // Add some variation
    students: Math.floor(Math.random() * 50) + 20
  }));

  const recentActivity = [
    { user: 'Alex Johnson', action: 'Completed Assessment', time: '2 hours ago', category: 'Focus' },
    { user: 'Sarah Wilson', action: 'Enrolled in Course', time: '4 hours ago', category: 'Memory' },
    { user: 'Michael Chen', action: 'Downloaded Report', time: '6 hours ago', category: 'Motivation' },
    { user: 'Emma Davis', action: 'Started Assessment', time: '8 hours ago', category: 'Creativity' },
    { user: 'James Rodriguez', action: 'Completed Course', time: '1 day ago', category: 'Problem Solving' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-[#032B61]">Admin Dashboard</h1>
            <p className="text-[#6B86B4] mt-1">Manage users, courses, and monitor platform analytics</p>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
            <Button variant="outline" className="border-[#2E58A6] text-[#2E58A6] hover:bg-[#2E58A6] hover:text-white">
              <Eye className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#2E58A6]/10 rounded-full">
                  <Users className="h-6 w-6 text-[#2E58A6]" />
                </div>
                <div>
                  <p className="text-[#6B86B4] text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-[#032B61]">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#032B61]/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-[#032B61]" />
                </div>
                <div>
                  <p className="text-[#6B86B4] text-sm font-medium">Total Courses</p>
                  <p className="text-2xl font-bold text-[#032B61]">{adminStats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#C6902A]/10 rounded-full">
                  <BarChart3 className="h-6 w-6 text-[#C6902A]" />
                </div>
                <div>
                  <p className="text-[#6B86B4] text-sm font-medium">Active Assessments</p>
                  <p className="text-2xl font-bold text-[#032B61]">{adminStats.activeAssessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-[#6B86B4] text-sm font-medium">Avg Completion Rate</p>
                  <p className="text-2xl font-bold text-[#032B61]">{adminStats.avgCompletionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61]">Category Performance</CardTitle>
              <CardDescription className="text-[#6B86B4]">
                Average scores across all users by skill category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryAverages}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="category" 
                      stroke="#6B86B4"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
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
                    <Bar 
                      dataKey="average" 
                      fill="#2E58A6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer> */}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#032B61]">Recent Activity</CardTitle>
              <CardDescription className="text-[#6B86B4]">
                Latest user actions and platform engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F2E5D8]/30 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-[#032B61] font-medium text-sm">{activity.user}</p>
                      <p className="text-[#6B86B4] text-xs">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="secondary" 
                        className="bg-[#2E58A6]/10 text-[#2E58A6] mb-1"
                      >
                        {activity.category}
                      </Badge>
                      <p className="text-[#6B86B4] text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-[#032B61]">Quick Actions</CardTitle>
            <CardDescription className="text-[#6B86B4]">
              Common administrative tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col border-[#2E58A6] text-[#2E58A6] hover:bg-[#2E58A6] hover:text-white"
              >
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col border-[#032B61] text-[#032B61] hover:bg-[#032B61] hover:text-white"
              >
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Course Library</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col border-[#C6902A] text-[#C6902A] hover:bg-[#C6902A] hover:text-white"
              >
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col border-[#6B86B4] text-[#6B86B4] hover:bg-[#6B86B4] hover:text-white"
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}