import { Button } from "@/components/ui/button";

export function NavigationButtons() {
  const buttons = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
  return (
    <div className="flex space-x-4 mb-4 text-sm text-gray-500">
      {buttons.map((button) => (
        <Button
          key={button}
          variant="ghost"
          className="hover:bg-transparent hover:text-gray-700 p-0"
        >
          {button}
        </Button>
      ))}
    </div>
  );
}
