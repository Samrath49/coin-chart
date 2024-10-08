import { Button } from "@/components/ui/button";

interface TimeRangeSelectorProps {
  selectedRange: string;
  setSelectedRange: (range: string) => void;
}

export function TimeRangeSelector({
  selectedRange,
  setSelectedRange,
}: TimeRangeSelectorProps) {
  const timeRanges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  return (
    <div className="flex gap-2">
      {timeRanges.map((range) => (
        <Button
          key={range}
          variant={selectedRange === range ? "default" : "ghost"}
          onClick={() => setSelectedRange(range)}
          className={`px-4 !py-0 text-xs rounded-[0.5rem] ${
            selectedRange === range
              ? "bg-primary text-white"
              : "text-gray-500 border-gray-300"
          }`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
