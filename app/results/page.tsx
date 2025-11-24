'use client';

import { MainLayout } from "@/components/layout/main-layout";
import OceanTestResult from "@/components/result-models/OceanTest-Result";
import {
  ResultHeader,
  ResultOverallScore,
  ResultRadarChart,
  ResultSection,
  ResultSummary,
  ResultTraitCards
} from "@/components/result-template";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


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
  const attemptId = params.get("id");

  const [result, setResult] = useState<FullResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch result
  useEffect(() => {
    if (!attemptId) {
      setError("No attempt ID provided");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/result/testuser/${attemptId}`,
          { method: "POST", headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data: ApiResponse = await response.json();

        if (data.Status && !data.Error) setResult(data.Result);
        else throw new Error(data.Msg || "Invalid server response");

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [attemptId]);

  // Loading UI
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-[#032B61] animate-pulse text-xl">Loading your results...</p>
        </div>
      </MainLayout>
    );
  }

  // Error UI
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

  // Chart Data Format
  const chartData = result.traitBreakdown.map(t => {
    const score = parseInt(t.description.match(/\d+/)?.[0] || "0");
    return { category: t.trait, value: score, fullMark: 100 };
  });

  const overallScore = Math.round(
    chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length
  );

  if (result.surveyId === "E9B927B") {
  return (
    <MainLayout>
      <OceanTestResult result={result} />
    </MainLayout>
  );
}
  return (
    <MainLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <ResultHeader
          name={result.name}
          date={result.dateAttempted}
          onDownload={() => console.log("Download PDF")}
        />

        {/* OVERALL SCORE */}
        <ResultOverallScore
          score={overallScore}
          level={result.level}
          traitCount={result.traitBreakdown.length}
        />

        {/* ROW (CHART + TRAIT CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CHART */}
          <ResultSection>
            <ResultRadarChart data={chartData} />
          </ResultSection>

          {/* TRAITS */}
          <ResultSection>
            <ResultTraitCards traits={result.traitBreakdown} />
          </ResultSection>
        </div>

        {/* SUMMARY */}
        <ResultSection>
          <ResultSummary
            summary={result.overallSummary}
            status={result.TestStatus}
            surveyId={result.surveyId}
          />
        </ResultSection>

      </div>
    </MainLayout>
  );
}
