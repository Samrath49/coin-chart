import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { useMemo } from "react";
import { CustomTooltip } from "./CustomTooltip";
import { PriceEntry, PriceEntryType } from "@/types";

interface CoinChart {
  data: PriceEntry[] | null;
}

export function Chart({ data }: CoinChart) {
  console.log(data);
  const transformedData = useMemo(() => {
    if (!data?.length) return [];

    return (data as PriceEntryType[]).map(([timestamp, price]) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(),
      price,
    }));
  }, [data]);

  const priceMetrics = useMemo(() => {
    if (!transformedData.length) {
      return {
        currentPrice: 0,
        maxPrice: 0,
        minPrice: 0,
        yDomain: [0, 100], // Default domain when no data is available
      };
    }

    const currentPrice = transformedData[transformedData.length - 1].price;
    const maxPrice = Math.max(...transformedData.map((d) => d.price));
    const minPrice = Math.min(...transformedData.map((d) => d.price));
    const priceRange = maxPrice - minPrice;

    return {
      currentPrice,
      maxPrice,
      minPrice,
      yDomain: [minPrice - priceRange * 0.05, maxPrice + priceRange * 0.05],
    };
  }, [transformedData]);

  if (!transformedData.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No price data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="1" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
            opacity={1}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            dx={-10}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={priceMetrics.yDomain}
          />
          <Tooltip content={<CustomTooltip background="bg-gray-900" />} />
          {/* <ReferenceLine
            y={priceMetrics.maxPrice}
            stroke="#E2E8F0"
            strokeDasharray="3 3"
          /> */}
          <Line
            type="monotone"
            dataKey="price"
            unit="M"
            strokeLinecap="round"
            strokeWidth={1.5}
            stroke="#6366F1"
            dot={false}
            legendType="none"
            activeDot={{
              r: 4,
              fill: "#6366F1",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={""}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
