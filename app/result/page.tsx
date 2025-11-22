'use client';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Filter, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {apiClient} from "@/lib/auth/apiClient";
interface Results {
  resultId: string;
  name: string;
  level?: string;
  dateAttempted: string;
}

interface ApiResponse {
  Status: boolean;
  Error: boolean;
  Count: number;
  Data: Results[];
  message?: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('all');
  const [tests, setTests] = useState<Results[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient(`${process.env.NEXT_PUBLIC_API_URL}/api/users/result/testuser/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const result: ApiResponse = await response.json();
        if (result.Status && !result.Error && result.Data) setTests(result.Data);
        else throw new Error(result.message || 'Invalid response from server');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tests');
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const filteredTests = tests.filter(test => {
  const matchesLevel = filterLevel === 'all' || test.level === filterLevel;
  const matchesName = filterName === 'all' || test.name === filterName;
  const matchesDate = !filterDate || new Date(test.dateAttempted).toDateString() === new Date(filterDate).toDateString();
  return matchesLevel && matchesName && matchesDate;
});

  const uniqueLevels = Array.from(new Set(tests.map((t) => t.level).filter(Boolean)));

  const TestCard = ({ result }: { result: Results }) => (
  <Card className="flex flex-col md:flex-row justify-between items-start md:items-center 
                   p-5 shadow-sm hover:shadow-md transition rounded-2xl border-0 bg-white">
    <div className="flex-1 min-w-0">
      <CardTitle className="text-[#032B61] text-lg mb-1">{result.name}</CardTitle>
      <CardDescription className="text-[#6B86B4] text-sm">
        Attempted on {new Date(result.dateAttempted).toLocaleDateString()}
      </CardDescription>
    </div>

    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center text-sm text-[#032B61]">
      <div className="flex flex-col items-end">
        <span className="font-semibold text-[#2E58A6]">Score</span>
        <span className="text-lg font-bold">{0}%</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="font-semibold text-[#2E58A6]">Level</span>
        <span className="text-lg font-bold">{result.level || 'N/A'}</span>
      </div>
      {/* Show More button */}
      <Button
        className="bg-[#2E58A6] hover:bg-[#032B61] text-white"
        onClick={() => router.push(`/results?id=${result.resultId}`)}
      >
        Show More
      </Button>
    </div>
  </Card>
);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2E58A6]" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full border-red-200 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-[#032B61] font-semibold mb-2">Error Loading Results</p>
          <p className="text-[#6B86B4] mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );

  return (
    <MainLayout>
      <div className="space-y-6 p-6 bg-[#F2E5D8] min-h-screen">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-[#032B61]">Your Results</h1>
          <p className="text-[#6B86B4] mt-1">
            View all your available results from the assessments you've taken.
          </p>
        </div>

        {/* Main Layout: Filter + Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Filter Panel */}
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <Card className="shadow-md border-0 sticky top-6">
              <CardHeader className="flex flex-row items-center gap-2">
                <Filter className="h-5 w-5 text-[#032B61]" />
                <CardTitle className="text-[#032B61]">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Filter */}
                <div>
                    <label className="block text-sm font-medium text-[#6B86B4] mb-1">
                    Date
                    </label>
                    <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border border-[#6B86B4] rounded-md px-3 py-2 w-full text-sm 
                                focus:outline-none focus:border-[#2E58A6]"
                    />
                </div>

                {/* Level Filter */}
                <div>
                    <label className="block text-sm font-medium text-[#6B86B4] mb-1">
                    Level
                    </label>
                    <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="border border-[#6B86B4] rounded-md px-3 py-2 w-full text-sm 
                                focus:outline-none focus:border-[#2E58A6]"
                    >
                    <option value="all">All Levels</option>
                    {uniqueLevels.map((level) => (
                        <option key={level} value={level}>
                        {level}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Name Filter */}
                <div>
                    <label className="block text-sm font-medium text-[#6B86B4] mb-1">
                    Test Name
                    </label>
                    <select
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="border border-[#6B86B4] rounded-md px-3 py-2 w-full text-sm 
                                focus:outline-none focus:border-[#2E58A6]"
                    >
                    <option value="all">All Tests</option>
                    {Array.from(new Set(tests.map((t) => t.name))).map((name) => (
                        <option key={name} value={name}>
                        {name}
                        </option>
                    ))}
                    </select>
                </div>
                </CardContent>
            </Card>
          </aside>

          {/* Right: Result Cards */}
          <div className="flex-1 space-y-4">
            {filteredTests.length > 0 ? (
              filteredTests.map((result) => <TestCard key={result.resultId} result={result} />)
            ) : (
              <Card className="p-8 text-center text-[#6B86B4] shadow-sm">
                No results match your filter.
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}