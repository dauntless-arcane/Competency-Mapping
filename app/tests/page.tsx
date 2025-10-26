'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Clock, Play, Search, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_URL = process.env.SERVER_API;

// Interface for type safety
interface TestItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  recommended: boolean;
}

const mockTests = [
  {
    id: 1,
    title: "Psychological Wellness",
    description: "Assess your overall mental wellbeing.",
    duration: "10 min",
    level: "Beginner",
    recommended: true,
  },
  {
    id: 2,
    title: "Stress & Anxiety",
    description: "Understand your stress and anxiety levels.",
    duration: "8 min",
    level: "Intermediate",
    recommended: true,
  },
  {
    id: 3,
    title: "Sleep Quality",
    description: "Evaluate your sleep habits and patterns.",
    duration: "7 min",
    level: "Beginner",
    recommended: false,
  },
  {
    id: 4,
    title: "Emotional Resilience",
    description: "Measure how well you adapt to challenges.",
    duration: "12 min",
    level: "Advanced",
    recommended: false,
  },
];

export default function TestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  // 🔄 Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/fetch-tests`); // your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TestItem[] = await response.json();
        setTests(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load tests');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);
  //  Filter logic
  const filteredTests = mockTests.filter(test => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || test.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const recommendedTests = filteredTests.filter(test => test.recommended);
  const allTests = filteredTests;

  //  Reusable card component
  const TestCard = ({ test }: { test: typeof mockTests[0] }) => (
    <Card
      className="shadow-lg hover:shadow-xl transition cursor-pointer border-0"
      
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-[#032B61] text-lg">{test.title}</CardTitle>
            <CardDescription className="text-[#6B86B4] line-clamp-2">
              {test.description}
            </CardDescription>
          </div>
          {test.recommended && (
            <Badge className="bg-[#C6902A] text-white ml-2">
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-[#6B86B4]">
          <div className="flex items-center space-x-1">
            <Brain className="h-4 w-4" />
            <span>{test.level}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{test.duration}</span>
          </div>
        </div>

        <Button className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white"
        onClick={() => router.push('/test')}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Test
        </Button>
      </CardContent>
    </Card>
  );

  // Loading and error states
  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-[#6B86B4] mt-10">Loading tests...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 mt-10">Error: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#032B61]">Available Assessments</h1>
          <p className="text-[#6B86B4] mt-1">
            Choose a psychological test to begin your wellness journey
          </p>
        </div>

        {/* Search Bar */}
        <Card className="shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B86B4]" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#6B86B4] focus:border-[#2E58A6]"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="border border-[#6B86B4] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2E58A6]"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-[#F2E5D8]">
            <TabsTrigger
              value="recommended"
              className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]"
            >
              Recommended ({recommendedTests.length})
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-[#032B61]"
            >
              All Tests ({allTests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            {recommendedTests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            ) : (
              <p className="text-center text-[#6B86B4]">No recommended tests found</p>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
