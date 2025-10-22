'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Score, Course } from '@/lib/mock-data';
import { Brain, BookOpen, TrendingUp, Bell, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface DashboardCardsProps {
  user: User;
  scores: Score[];
  courses: Course[];
}

export function DashboardCards({ user, scores, courses }: DashboardCardsProps) {
  const overallScore = Math.round(scores.reduce((sum, score) => sum + score.value, 0) / scores.length);
  const recommendedCourses = courses.filter(course => course.recommended);
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Upcoming Test Reminder */}
      <Card className="border-l-4 border-l-[#C6902A] shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#C6902A]/10 rounded-full">
              <Brain className="h-5 w-5 text-[#C6902A]" />
            </div>
            <div>
              <CardTitle className="text-[#032B61] text-lg">Assessment Due</CardTitle>
              <CardDescription className="text-[#6B86B4]">Monthly psychological evaluation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-[#C6902A]" />
            <span className="text-sm text-[#6B86B4]">Next assessment: Tomorrow</span>
          </div>
          <Link href="/test">
            <Button className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white">
              Take Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-l-4 border-l-[#2E58A6] shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#2E58A6]/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-[#2E58A6]" />
            </div>
            <div>
              <CardTitle className="text-[#032B61] text-lg">Overall Progress</CardTitle>
              <CardDescription className="text-[#6B86B4]">Your psychological wellness score</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#032B61] mb-1">{overallScore}%</div>
            <Progress value={overallScore} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {scores.slice(0, 4).map((score) => (
              <div key={score.category} className="text-center">
                <div className="text-sm text-[#6B86B4]">{score.category}</div>
                <div className="text-lg font-semibold text-[#032B61]">{score.value}%</div>
              </div>
            ))}
          </div>
          <Link href="/results">
            <Button variant="outline" className="w-full border-[#2E58A6] text-[#2E58A6] hover:bg-[#2E58A6] hover:text-white">
              View Detailed Results
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Next Recommended Course */}
      <Card className="border-l-4 border-l-[#032B61] shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#032B61]/10 rounded-full">
              <BookOpen className="h-5 w-5 text-[#032B61]" />
            </div>
            <div>
              <CardTitle className="text-[#032B61] text-lg">Recommended Course</CardTitle>
              <CardDescription className="text-[#6B86B4]">Based on your assessment</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendedCourses.length > 0 ? (
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-[#032B61] text-sm">{recommendedCourses[0].title}</h4>
                <p className="text-xs text-[#6B86B4] mt-1">{recommendedCourses[0].description}</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-[#F2E5D8] text-[#032B61]">
                  {recommendedCourses[0].level}
                </Badge>
                <span className="text-xs text-[#6B86B4]">{recommendedCourses[0].duration}</span>
              </div>
              <Link href="/courses">
                <Button className="w-full bg-[#032B61] hover:bg-[#2E58A6] text-white">
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center text-[#6B86B4] py-4">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">All recommendations completed!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Courses */}
      {inProgressCourses.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#032B61] flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Continue Learning</span>
            </CardTitle>
            <CardDescription className="text-[#6B86B4]">Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="p-4 bg-white rounded-lg border border-[#6B86B4]/20">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-[#032B61] text-sm">{course.title}</h4>
                      <p className="text-xs text-[#6B86B4] mt-1">{course.instructor}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#6B86B4]">Progress</span>
                        <span className="text-[#032B61] font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                    <Button size="sm" className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {inProgressCourses.length > 3 && (
              <div className="mt-4 text-center">
                <Link href="/courses">
                  <Button variant="outline" className="border-[#2E58A6] text-[#2E58A6] hover:bg-[#2E58A6] hover:text-white">
                    View All Courses
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}