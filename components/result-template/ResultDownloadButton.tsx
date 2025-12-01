import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ResultDownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#C6902A] hover:bg-[#C6902A]/80 text-white"
    >
      <Download className="h-4 w-4 mr-2" />
      Download Report (PDF)
    </Button>
  );
}
