import { useEffect, useState } from "react";
import { getCoinsList } from "./api/endpoints";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useStore } from "./store";
import CurrencyCard from "./components/CurrencyCard";
import CoinDetails from "./components/CoinDetails";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoinData } from "./types";
import { formatPrice } from "./utils";

function App() {
  const { coinsList, setCoinsList } = useStore((state) => state);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const coinsList = await getCoinsList();
      setCoinsList(coinsList);
    };

    fetchData();
  }, []);

  const handleClick = (coin: CoinData) => {
    setSelectedCoin(coin);
  };

  const handleCloseDialog = () => {
    setSelectedCoin(null);
  };

  return (
    <>
      <div className="bg-background h-screen w-screen">
        <div className="h-full w-full flex justify-center">
          <Card className="bg-gray-100 max-w-7xl p-10 rounded-xl neumorphic my-10">
            <h1 className="text-secondary text-center font-bold text-2xl animate-fade-in-down">
              List of top 10 crypto currencies using{" "}
              <a
                href="https://www.coingecko.com"
                target="_blank"
                className="text-primary"
              >
                CoinGecko
              </a>
            </h1>
            <div className="flex justify-center flex-wrap gap-5 my-5 animate-fade-in-up">
              {coinsList?.map((coin, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleClick(coin)}
                >
                  <CurrencyCard coin={coin} />
                </div>
              ))}

              {selectedCoin && (
                <Dialog open={!!selectedCoin} onOpenChange={handleCloseDialog}>
                  <DialogContent className="w-full !rounded-xl max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="flex gap-2 text-3xl items-center animate-fade-in-down">
                        <img
                          src={selectedCoin?.image}
                          alt={selectedCoin?.name}
                          className="size-8"
                        />{" "}
                        {selectedCoin.name}
                        <span className="text-gray-500 font-light">
                          ({selectedCoin?.symbol?.toUpperCase()})
                        </span>
                      </DialogTitle>
                      <div className="grid gap-4 py-4 animate-fade-in-down">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="col-span-1">Market Cap:</span>
                          <span className="col-span-3">
                            ${formatPrice(selectedCoin?.market_cap.toString())}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="col-span-1">Volume:</span>
                          <span className="col-span-3">
                            $
                            {formatPrice(selectedCoin?.total_volume.toString())}
                          </span>
                        </div>
                      </div>
                    </DialogHeader>
                    <CoinDetails coin={selectedCoin} />
                    <DialogFooter>
                      <Button
                        type="button"
                        className="text-white"
                        onClick={handleCloseDialog}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
