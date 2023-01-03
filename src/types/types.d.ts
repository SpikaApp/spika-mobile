declare module "*.png";

type API = "coingecko";

type Trend = "green" | "red" | "neutral";

type Days = "1" | "7" | "30" | "365";

interface ErrorResponse {
  error: unknown;
  message: string | unknown;
  defaultResponse: string;
}

interface MnemonicWord {
  index: number;
  value: string;
}

interface BaseScreenProps {
  displayName: string;
}

interface ConfirmSeedScreenProps extends BaseScreenProps {
  mnemonic: string;
}

interface AssetScreenProps extends BaseScreenProps {
  assetInfo: Coin;
}

interface Coin {
  type: string;
  data: CoinData;
}

interface CoinData {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  coingecko_id: string;
  balance?: string;
}

interface CoinMarketData {
  asset: {
    id: string;
    name: string;
    symbol: string;
    currency: Currency;
  };
  current_price: number;
  price_change_1h: number;
  price_change_24h: number;
  price_change_7d: number;
  price_change_30d: number;
  price_change_1y: number;
  market_cap: number;
  market_cap_change_24h: number;
}

interface CoinPriceHistory {
  percent_change: number;
  prices: number[][];
}

// Aptos CoinStore (0x1::coin::CoinStore)
interface CoinStore {
  type: string;
  data: {
    coin?: {
      value: string;
    };
    deposit_events?: {
      counter: string;
      guid: {
        id: {
          addr: string;
          creation_num: string;
        };
      };
    };
    frozen?: boolean;
    withdraw_events?: {
      counter: string;
      guid: {
        id: {
          addr: string;
          creation_num: string;
        };
      };
    };
  };
}
