'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResultHeaderProps {
  name: string;
  date: string;
  onDownload?: () => void;
}

export function ResultHeader({ name, date, onDownload }: ResultHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-[#032B61]">{name}</h1>
        <p className="text-[#6B86B4] mt-1">
          Completed on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>
      </div>

      <Button
        className="bg-[#C6902A] hover:bg-[#C6902A]/80 text-white w-fit"
        onClick={onDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download Report (PDF)
      </Button>
    </div>
  );
}
