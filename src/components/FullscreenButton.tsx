import { Button } from "@/components/ui/button";

interface FullscreenButtonProps {
  toggleFullscreen: () => void;
}

export function FullscreenButton({ toggleFullscreen }: FullscreenButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={toggleFullscreen}
      className="hover:bg-transparent hover:text-gray-700 p-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1"
      >
        <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
      </svg>
      Fullscreen
    </Button>
  );
}
