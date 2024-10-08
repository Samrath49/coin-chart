interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  background?: string;
}

export const CustomTooltip = ({
  active,
  payload,
  background,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`px-3 py-1 rounded-[0.25rem] text-white text-base ${background}`}
      >
        <p className="text-sm font-semibold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};
