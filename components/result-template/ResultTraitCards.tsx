import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Target } from "lucide-react";

interface Trait {
  trait: string;
  description: string;
  score: number; // <- IMPORTANT
  _id: string;
}

export function ResultTraitCards({ traits }: { traits: Trait[] }) {
  
  const getColor = (score: number) =>
    score >= 35 ? "text-green-600" :
    score >= 25 ? "text-[#C6902A]" :
    "text-red-600";

  const getIcon = (score: number) =>
    score >= 75 ? CheckCircle :
    score >= 60 ? Target :
    AlertCircle;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#032B61]">Detailed Breakdown</h3>

      {traits.map((t) => {
        const score = t.score;           // <-- USE score directly
        const Icon = getIcon(score);

        return (
          <Card key={t._id} className="shadow-md border-l-4 border-l-[#2E58A6]">
            <CardContent className="p-4">
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${getColor(score)}`} />
                  <div>
                    <h4 className="font-semibold text-[#032B61]">{t.trait}</h4>
                    <div className={`text-lg font-bold ${getColor(score)}`}>
                      {score}%
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#6B86B4] leading-relaxed">
                {t.description}
              </p>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
