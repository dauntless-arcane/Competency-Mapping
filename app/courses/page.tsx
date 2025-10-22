'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCourses } from '@/lib/mock-data';
import { BookOpen, Clock, Play, Search, Star, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterDuration, setFilterDuration] = useState('all');
  const params = useParams();
  const router = useRouter();
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesDuration = filterDuration === 'all' || 
                           (filterDuration === 'short' && parseInt(course.duration) <= 4) ||
                           (filterDuration === 'medium' && parseInt(course.duration) > 4 && parseInt(course.duration) <= 8) ||
                           (filterDuration === 'long' && parseInt(course.duration) > 8);
    
    return matchesSearch && matchesLevel && matchesDuration;
  });

  const recommendedCourses = filteredCourses.filter(course => course.recommended);
  const enrolledCourses = filteredCourses.filter(course => course.progress > 0);
  const availableCourses = filteredCourses.filter(course => course.progress === 0);

  const CourseCard = ({ course, showProgress = true }: { course: typeof mockCourses[0], showProgress?: boolean }) => (
    <Card className="shadow-lg hover:shadow-xl transition-shadow border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-[#032B61] text-lg mb-2">{course.title}</CardTitle>
            <CardDescription className="text-[#6B86B4] line-clamp-2">
              {course.description}
            </CardDescription>
          </div>
          {course.recommended && (
            <Badge className="bg-[#C6902A] text-white ml-2">
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-[#6B86B4]">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <Badge 
          variant="secondary" 
          className={`w-fit ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-[#C6902A]/10 text-[#C6902A]' :
            'bg-red-100 text-red-800'
          }`}
        >
          {course.level}
        </Badge>

        {showProgress && course.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B86B4]">Progress</span>
              <span className="text-[#032B61] font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        <Button 
          onClick={() => router.push(`/courses/${course.id}`)}
          className={`w-full ${
            course.progress > 0 
              ? 'bg-[#2E58A6] hover:bg-[#032B61]' 
              : 'bg-[#032B61] hover:bg-[#2E58A6]'
          } text-white`}
        >
          {course.progress > 0 ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </>
          ) : (
            <>
              <BookOpen className="h-4 w-4 mr-2" />
              Enroll Now
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#032B61]">My Learning</h1>
          <p className="text-[#6B86B4] mt-1">Discover courses tailored to enhance your psychological wellness</p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B86B4]" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#6B86B4] focus:border-[#2E58A6]"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDuration} onValueChange={setFilterDuration}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="short">Short (≤4 weeks)</SelectItem>
                    <SelectItem value="medium">Medium (5-8 weeks)</SelectItem>
                    <SelectItem value="long">Long (8+ weeks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Tabs */}
        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#F2E5D8]">
            <TabsTrigger value="enrolled" className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]">
              My Courses ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]">
              Recommended ({recommendedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]">
              Browse All ({availableCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-4">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-[#6B86B4] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#032B61] mb-2">No Enrolled Courses</h3>
                  <p className="text-[#6B86B4] mb-4">Start your learning journey by enrolling in a course</p>
                  <Button className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-4">
            <Card className="shadow-md border-l-4 border-l-[#C6902A] bg-[#C6902A]/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-[#C6902A]" />
                  <span className="text-[#032B61] font-medium">
                    These courses are personalized based on your assessment results
                  </span>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress={false} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}