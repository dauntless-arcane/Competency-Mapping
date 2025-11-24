import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface Props {
  score: number;
  level: string;
  traitCount: number;
}

export function ResultOverallScore({ score, level, traitCount }: Props) {
  const badgeClass =
    score >= 75
      ? "bg-green-100 text-green-800"
      : score >= 60
      ? "bg-[#C6902A]/10 text-[#C6902A]"
      : "bg-red-100 text-red-800";

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#2E58A6]/10 rounded-full">
              <TrendingUp className="h-8 w-8 text-[#2E58A6]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#032B61]">
                Overall Score
              </h3>
              <p className="text-[#6B86B4]">
                Based on {traitCount} personality traits
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold text-[#032B61]">{score}</div>
            <Badge className={badgeClass}>{level}</Badge>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
