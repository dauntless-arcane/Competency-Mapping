"use client";

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
  score: string; // numeric string from backend
}

interface RiasecResultProps {
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

// Color palette for RIASEC
const RIASEC_COLORS: Record<string, string> = {
  Realistic: "#4B5DFF",
  Investigative: "#2DD4BF",
  Artistic: "#FF8B3D",
  Social: "#34D399",
  Enterprising: "#F43F5E",
  Conventional: "#A78BFA",
};

// Descriptions (clean, textbook-accurate)
const RIASEC_DESCRIPTIONS: Record<string, string> = {
  Realistic:
    "Individuals with a Realistic (R) personality type are typically skilled in mechanical or athletic jobs. Appropriate college majors often include Agriculture, Health Assistant, Computers, Construction, Mechanic/Machinist, Engineering, and Food and Hospitality. These choices align well with related career pathways such as Natural Resources, Health Services, Industrial and Engineering Technology, and Arts and Communication.",
  Investigative:
    "Investigative types enjoy thinking, analyzing, researching, and solving abstract problems. They value logic and intellectual exploration.",
  Artistic:
    "Artistic types prefer creative expression. They enjoy design, writing, visual arts, performing, and unstructured environments.",
  Social:
    "Social types enjoy helping, teaching, counseling, and supporting others. They thrive in collaborative and service-oriented roles.",
  Enterprising:
    "Enterprising types enjoy leading, persuading, influencing, and managing. They are ambitious, energetic, and comfortable taking risks.",
  Conventional:
    "Conventional types enjoy structure, organization, data, and detail-oriented work. They excel in planning, administration, and systems.",
};

export default function RiasecResult({ result }: RiasecResultProps) {
  
  // Prepare chart data
  const chartData = result.traitBreakdown.map((t) => {
    const score = parseInt(t.score);

    return {
      category: t.trait,
      value: score,
      fullMark: 100,
      color: RIASEC_COLORS[t.trait] ?? "#2E58A6",
    };
  });

  const overallScore = Math.round(
    chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <ResultHeader
        name={`${result.name} — RIASEC Report`}
        date={result.dateAttempted}
      />

      {/* OVERALL SCORE */}
      <ResultOverallScore
        score={overallScore}
        level={result.level}
        traitCount={result.traitBreakdown.length}
      />

      {/* RADAR + TRAIT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RADAR */}
        <ResultSection>
          <ResultRadarChart data={chartData} maxValue={8} />
        </ResultSection>

        {/* TRAITS */}
        <ResultSection>
          <ResultTraitCards
            traits={result.traitBreakdown.map((t) => ({
              ...t,
              score: parseInt(t.score),
              description: RIASEC_DESCRIPTIONS[t.trait] ?? t.description,
            }))}
          />
        </ResultSection>

      </div>

    </div>
  );
}
