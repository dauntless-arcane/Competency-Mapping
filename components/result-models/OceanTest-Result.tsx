'use client';

import {
  ResultHeader,
  ResultOverallScore,
  ResultRadarChart,
  ResultSection,
  ResultTraitCards
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
    "Openness to Experience (O) is the personality trait of seeking new experience and intellectual pursuits. High scores may day dream a lot. Low scorers may be very down to earth and practical.",
  Conscientiousness:
    "Conscientiousness (C) is the personality trait of being honest and hardworking. High scorers tend to follow rules and prefer clean homes. Low scorers may be messy and cheat others to get ahead.",
  Extraversion:
    "Extroversion (E) is the personality trait of seeking fulfillment from sources outside the self or in community. High scorers tend to be very social while low scorers prefer to work on their projects alone or with a few close friends.",
  Agreeableness:
    "Agreeableness (A) reflects much individuals adjust their behavior to suit others. High scorers are typically polite and like people. Low scorers tend to 'tell it like it is' and may be more competitive.",
  Neuroticism:
    "Neuroticism (N) is the personality trait of being emotionally reactive and vulnerable to stress. High scorers may be anxious, moody, or easily upset, while low scorers tend to be more emotionally stable and resilient.",
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
                score: parseInt(t.score)+"%",
                }))}
            />
        </ResultSection>


      </div>

      

    </div>
  );
}
