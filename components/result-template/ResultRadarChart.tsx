import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

interface RadarData {
  category: string;
  value: number;
  fullMark?: number;
}

interface ResultRadarChartProps {
  data: RadarData[];
  maxValue: number;  // <-- IMPORTANT
}

export function ResultRadarChart({ data, maxValue }: ResultRadarChartProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-[#032B61]">Personality Traits Overview</CardTitle>
        <CardDescription className="text-[#6B86B4]">
          Visual representation of your personality profile
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" className="text-[#032B61] text-sm" />

              {/* <-- Correct dynamic domain */}
              <PolarRadiusAxis angle={0} domain={[0, maxValue]} tick={false} />

              <Radar
                name="Score"
                dataKey="value"
                stroke="#2E58A6"
                fill="#2E58A6"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
