'use client';
import { MainLayout } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Brain, Clock, Loader2, Play, Search, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiClient } from "@/lib/auth/apiClient";

interface Test {
  surveyId: string;
  name: string;
  description: string;
  duration?: string;
  level?: string;
  recommended?: boolean;
}

interface ApiResponse {
  status: boolean;
  error: boolean;
  data: Test[];
  message?: string;
}

export default function TestsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use POST method as per your route definition
        const response = await apiClient(`${process.env.NEXT_PUBLIC_API_URL}/api/users/fetch-tests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        if (result.status && !result.error && result.data) {
          setTests(result.data);
        } else {
          throw new Error(result.message || 'Invalid response from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching tests');
        console.error('Error fetching tests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Filter logic
  const filteredTests = tests.filter(test => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (test.description && test.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = filterLevel === 'all' || test.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const recommendedTests = filteredTests.filter(test => test.recommended);
  const allTests = filteredTests;

  // Get unique levels from tests for filter dropdown
  const uniqueLevels = Array.from(new Set(tests.map(t => t.level).filter(Boolean)));

  // Reusable card component
  const TestCard = ({ test }: { test: Test }) => (
    <Card className="shadow-lg hover:shadow-xl transition cursor-pointer border-0 h-full flex flex-col">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-[#032B61] text-lg mb-2">{test.name}</CardTitle>
            <CardDescription className="text-[#6B86B4] line-clamp-2">
              {test.description || 'No description available'}
            </CardDescription>
          </div>
          {test.recommended && (
            <Badge className="bg-[#C6902A] text-white shrink-0 whitespace-nowrap">
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 mt-auto">
        <div className="flex justify-between text-sm text-[#6B86B4]">
          <div className="flex items-center space-x-1">
            <Brain className="h-4 w-4" />
            <span>{test.level || 'Not specified'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{test.duration || 'N/A'}</span>
          </div>
        </div>

        <Button 
          className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white"
          onClick={() => router.push(`/test?id=${test.surveyId}`)}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Test
        </Button>
      </CardContent>
    </Card>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#2E58A6] mx-auto" />
          <p className="text-[#6B86B4]">Loading tests...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-[#032B61]">Error Loading Tests</h3>
                <p className="text-[#6B86B4] mt-2">{error}</p>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-[#2E58A6] hover:bg-[#032B61]"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No tests state
  if (tests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Brain className="h-12 w-12 text-[#6B86B4] mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-[#032B61]">No Tests Available</h3>
                <p className="text-[#6B86B4] mt-2">There are currently no tests available. Please check back later.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="space-y-6 p-6 bg-[#F2E5D8]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#032B61]">Available Assessments</h1>
        <p className="text-[#6B86B4] mt-1">
          Choose a psychological test to begin your wellness journey
        </p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-md border-0 ">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B86B4]" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#6B86B4] focus:border-[#2E58A6]"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="border border-[#6B86B4] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2E58A6] w-full md:w-auto"
              >
                <option value="all">All Levels</option>
                {uniqueLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
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
                <TestCard key={test.surveyId} test={test} />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12">
                <p className="text-center text-[#6B86B4]">
                  {searchTerm || filterLevel !== 'all' 
                    ? 'No recommended tests match your search criteria'
                    : 'No recommended tests available at the moment'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTests.map((test) => (
                <TestCard key={test.surveyId} test={test} />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12">
                <p className="text-center text-[#6B86B4]">
                  No tests match your search criteria. Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
    </MainLayout>
  );
}