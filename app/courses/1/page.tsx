'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Download, FileText, PlayCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// Mock single course data (in real app you'd fetch this by ID)
const mockCourse = {
  id: 1,
  title: "Psychological Wellness 101",
  description: "A foundational course to understand and improve mental wellbeing.",
  instructor: "Dr. Jane Doe",
  duration: "6 weeks",
  lessons: [
    { id: 1, title: "Introduction to Mental Health", duration: "10 min" },
    { id: 2, title: "Managing Stress Effectively", duration: "15 min" },
    { id: 3, title: "Sleep and Recovery", duration: "20 min" },
  ],
  resources: [
    { id: 1, name: "Course Handbook (PDF)" },
    { id: 2, name: "Supplementary Readings" },
  ],
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="outline"
          className="flex items-center space-x-1 border-[#032B61] bg-[#2E58A6] text-[#ffffff] hover:bg-[#032B61] hover:text-white"
          onClick={() => router.push('/courses')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Header */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-[#032B61]">{mockCourse.title}</CardTitle>
            <CardDescription className="text-[#6B86B4]">{mockCourse.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-[#6B86B4]">
            <span>Instructor: {mockCourse.instructor}</span>
            <span>Duration: {mockCourse.duration}</span>
          </CardContent>
        </Card>

        {/* Video Placeholder */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-0">
            <div className="bg-black h-[32rem] rounded-lg flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-white opacity-70" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs for course content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-[#F2E5D8]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="lessons" className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="resources"
              className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]"
            >
              <span>Resources</span>
              
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="shadow-md border-0">
              <CardContent className="p-6 space-y-3">
                <p>
                  This course introduces the foundations of psychological wellness and
                  provides practical strategies to improve mental health and resilience.
                </p>
                <p>
                  By the end of this course, you will have a clearer understanding of your
                  wellbeing and actionable tools for everyday life.
                </p>
                <Button className="bg-[#2E58A6] hover:bg-[#032B61] text-white">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons">
            <div className="space-y-3">
              {mockCourse.lessons.map((lesson) => (
                <Card key={lesson.id} className="shadow-sm border-0 hover:bg-[#6B86B4]/80 transition">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-[#2E58A6]" />
                      <span className="text-[#032B61]">{lesson.title}</span>
                    </div>
                    <span className="text-sm text-[#6B86B4]">{lesson.duration}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-3">
              {mockCourse.resources.map((res) => (
                <Card key={res.id} className="shadow-sm border-0">
                  <CardContent className="p-4 flex items-center  space-x-3">
                    <FileText className="h-5 w-5 text-[#2E58A6]" />
                    <span className="text-[#032B61]">{res.name}</span>

                    <button 
                      
                      onClick={() => alert("Download clicked")} // replace with real logic
                      className="p-1 rounded hover:bg-gray-100 ml-auto"
                    >
                      <Download className="h-4 w-4 text-[#032B61]" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
