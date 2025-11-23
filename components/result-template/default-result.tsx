"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader, CardTitle
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Download, Target, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

export default function DefaultResult({ result }: { result: FullResult }) {
  
  const chartData = result.traitBreakdown.map(tr => {
    const score = parseInt(tr.description.match(/\d+/)?.[0] || "0");
    return {
      category: tr.trait,
      value: score,
      fullMark: 100
    };
  });

  const overallScore = Math.round(
    chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 60) return "text-[#C6902A]";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return CheckCircle;
    if (score >= 60) return Target;
    return AlertCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#032B61]">{result.name}</h1>
          <p className="text-[#6B86B4] mt-1">
            Completed on{" "}
            {new Date(result.dateAttempted).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Button className="bg-[#C6902A] hover:bg-[#C6902A]/80 text-white">
          <Download className="h-4 w-4 mr-2" />
          Download Report (PDF)
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#2E58A6]/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-[#2E58A6]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#032B61]">
                  Overall Personality Score
                </h3>
                <p className="text-[#6B86B4]">
                  Based on {result.traitBreakdown.length} personality traits
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-[#032B61]">{overallScore}%</div>
              <Badge
                variant="secondary"
                className={
                  overallScore >= 75
                    ? "bg-green-100 text-green-800"
                    : overallScore >= 60
                    ? "bg-[#C6902A]/10 text-[#C6902A]"
                    : "bg-red-100 text-red-800"
                }
              >
                {result.level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#032B61]">Personality Traits Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#2E58A6"
                    fill="#2E58A6"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#032B61]">Detailed Breakdown</h3>

          {result.traitBreakdown.map(tr => {
            const score = parseInt(tr.description.match(/\d+/)?.[0] || "0");
            const Icon = getScoreIcon(score);

            return (
              <Card key={tr._id} className="border-l-4 border-l-[#2E58A6]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${getScoreColor(score)}`} />
                      <div>
                        <h4 className="font-semibold text-[#032B61]">{tr.trait}</h4>
                        <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#6B86B4] mt-2">{tr.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#032B61] flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Overall Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#032B61]">{result.overallSummary}</p>
        </CardContent>
      </Card>
    </div>
  );
}
