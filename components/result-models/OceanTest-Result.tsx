'use client';

import {
    ResultHeader,
    ResultOverallScore,
    ResultRadarChart,
    ResultSection,
    ResultSummary,
    ResultTraitCards,
} from "@/components/result-template";

interface Trait {
  trait: string;
  description: string;
  _id: string;
  score: string;
}

interface OceanResultProps {
  result: {
    name: string;
    dateAttempted: string;
    level: string;
    surveyId: string;
    overallSummary: string;
    TestStatus: string;
    traitBreakdown: Trait[];
  };
}

const OCEAN_COLORS: Record<string, string> = {
  Openness: "#4B5DFF",
  Conscientiousness: "#FFC043",
  Extraversion: "#FF4971",
  Agreeableness: "#34D399",
  Neuroticism: "#EF4444",
};

export default function OceanTestResult({ result }: OceanResultProps) {
  // Convert trait breakdown → chart format
  const chartData = result.traitBreakdown.map((t) => {
    const score = parseInt(t.score);

    return {
      category: t.trait,
      value: score,
      fullMark: 50,
      color: OCEAN_COLORS[t.trait] ?? "#2E58A6",
    };
  });

  const overallScore = Math.round(
    chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length
  );


  const CUSTOM_OCEAN_DESCRIPTIONS: Record<string, string> = {
  Openness:
    "You tend to be imaginative, curious, and open to exploring new ideas, experiences, and perspectives.",
  Conscientiousness:
    "You are organized, responsible, and dependable, with a strong sense of duty and self-discipline.",
  Extraversion:
    "You draw energy from social interaction and enjoy being expressive, outgoing, and enthusiastic.",
  Agreeableness:
    "You value harmony, empathy, and cooperation, often prioritizing others' needs and maintaining positive relationships.",
  Neuroticism:
    "You may experience emotional fluctuations, sensitivity to stress, or heightened emotional awareness.",
};

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <ResultHeader
        name={`${result.name} — OCEAN Report`}
        date={result.dateAttempted}
      />

      {/* OVERALL SCORE */}
      <ResultOverallScore
        score={overallScore}
        level={result.level}
        traitCount={result.traitBreakdown.length}
      />

      {/* RADAR CHART + TRAITS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RADAR CHART */}
        <ResultSection>
          <ResultRadarChart data={chartData} maxValue={60}/>
        </ResultSection>

        {/* TRAIT CARDS */}
        <ResultSection>
            <ResultTraitCards
                traits={result.traitBreakdown.map((t) => ({
                ...t,
                // override description with your custom text
                description: CUSTOM_OCEAN_DESCRIPTIONS[t.trait] ?? t.description,

                // force score to be numeric (needed for percent display)
                score: parseInt(t.score),
                }))}
            />
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
  );
}
