import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Chart } from "./Chart";
import { timeRanges } from "@/constants";
import { CoinData } from "@/types";
import { getCoinHistoricData } from "@/api/endpoints";
import { useStore } from "../store";
import { getDaysFromTimeRange } from "@/utils";

const CoinChart = ({ coin }: { coin: CoinData }) => {
  const {
    setCoinPrices,
    clearCoinPrices,
    timeRange,
    coinPrices,
    setTimeRange,
  } = useStore((state) => state);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const coinId = coin?.id?.toLowerCase();
      const days = getDaysFromTimeRange(timeRange);

      if (coinId) {
        clearCoinPrices();
        const historicData = await getCoinHistoricData(coinId, days);
        const { prices } = historicData;
        setCoinPrices(prices);
      }
    };

    fetchData();
  }, [timeRange, coin?.id, setCoinPrices, clearCoinPrices]);

  const toggleFullscreen = () => {
    const chartElement = document.getElementById("currency-card");

    if (!document.fullscreenElement) {
      if (chartElement?.requestFullscreen) {
        chartElement?.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-gray-700 p-0"
            onClick={toggleFullscreen}
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
          {/* <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-gray-700 p-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#6F7177"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Compare
          </Button> */}
        </div>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              onClick={() => setTimeRange(range)}
              className={`px-4 !py-0 text-xs rounded-[0.5rem] ${
                timeRange === range
                  ? "bg-primary text-white"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={`${
          isFullscreen ? "h-[calc(100vh-200px)] bg-white" : "h-[300px]"
        } w-full`}
      >
        <Chart data={coinPrices} />
      </div>
    </div>
  );
};

export default CoinChart;
