import { Card } from "./ui/card";
import { formatPrice } from "@/utils";
import { CoinData } from "@/types";

const CurrencyCard = ({ coin }: { coin: CoinData }) => {
  return (
    <div className="bg-background flex justify-center items-center">
      <Card className="flex flex-col min-w-80 p-5 rounded-xl user-select-none neumorphic-inner">
        <div className="flex items-center gap-2 mb-2">
          <img src={coin?.image} alt={coin?.name} className="size-6" />
          <h1 className="text-secondary font-bold text-xl">
            {coin?.name}{" "}
            <span className="text-gray-500 font-light">
              ({coin?.symbol?.toUpperCase()})
            </span>
          </h1>
        </div>

        <p className="text-primary font-bold text-xl">
          <span className="text-gray-600">Price: </span> $
          {formatPrice(coin?.current_price?.toString())}
        </p>

        <p className="text-gray-600 font-light">
          <span>Market Cap: </span>$
          {formatPrice(coin?.market_cap ? coin?.market_cap?.toString() : "0")}
        </p>
        <p className="text-gray-600 font-light">
          <span>Total Supply: </span>{" "}
          {formatPrice(
            coin?.total_supply ? coin?.total_supply?.toString() : "0"
          )}{" "}
          {coin?.symbol?.toUpperCase()}
        </p>
      </Card>
    </div>
  );
};

export default CurrencyCard;
