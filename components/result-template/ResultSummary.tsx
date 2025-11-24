import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface Props {
  summary: string;
  status: string;
  surveyId: string;
}

export function ResultSummary({ summary, status, surveyId }: Props) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-[#032B61] flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Overall Summary</span>
        </CardTitle>
        <CardDescription className="text-[#6B86B4]">
          A brief overview of your personality assessment
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-[#032B61] leading-relaxed">{summary}</p>

        <div className="mt-4 p-4 bg-[#F2E5D8] rounded-lg">
          <p className="text-sm text-[#6B86B4]">
            <strong className="text-[#032B61]">Test Status:</strong> {status}
          </p>
          <p className="text-sm text-[#6B86B4] mt-1">
            <strong className="text-[#032B61]">Survey ID:</strong> {surveyId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
