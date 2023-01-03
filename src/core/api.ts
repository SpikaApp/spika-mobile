import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

const apiClient = (api: API): AxiosInstance => {
  switch (api) {
    case "coingecko":
      return axios.create({
        baseURL: "https://api.coingecko.com/api/v3",
        timeout: 5000,
      });
  }
};

export const getCoinMarket = async (asset: Coin, currency: Currency): Promise<CoinMarketData> => {
  interface CoinsFetchConfig extends AxiosRequestConfig {
    params: CoinsFetchParams;
  }

  const client = apiClient("coingecko");

  const id = asset.data.coingecko_id;

  const config: CoinsFetchConfig = {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  };

  const { data }: AxiosResponse<CoinsFetchData, CoinsFetchParams> = await client.get(`/coins/${id}`, config);

  const result: CoinMarketData = {
    asset: { id: data.id, name: data.name, symbol: data.symbol, currency: currency },
    current_price: data.market_data.current_price[currency],
    price_change_1h: data.market_data.price_change_percentage_1h_in_currency[currency],
    price_change_24h: data.market_data.price_change_percentage_24h_in_currency[currency],
    price_change_7d: data.market_data.price_change_percentage_7d_in_currency[currency],
    price_change_30d: data.market_data.price_change_percentage_30d_in_currency[currency],
    price_change_1y: data.market_data.price_change_percentage_1y_in_currency[currency],
    market_cap: data.market_data.market_cap[currency],
    market_cap_change_24h: data.market_data.market_cap_change_percentage_24h,
  };
  return result;
};

export const getPriceHistory = async (asset: Coin, currency: Currency, days: Days): Promise<CoinPriceHistory> => {
  interface PriceHistoryFetchConfig extends AxiosRequestConfig {
    params: CoinsFetchMarketChartParams;
  }

  const client = apiClient("coingecko");

  const id = asset.data.coingecko_id;

  const config: PriceHistoryFetchConfig = {
    params: {
      vs_currency: currency,
      days: days,
      interval: days === "1" ? "hourly" : "daily",
    },
  };

  const coinMarketData = await getCoinMarket(asset, currency);

  const percentChange = (): number => {
    switch (days) {
      case "1":
        return coinMarketData.price_change_24h;
      case "7":
        return coinMarketData.price_change_7d;
      case "30":
        return coinMarketData.price_change_30d;
      case "365":
        return coinMarketData.price_change_1y;
    }
  };

  const { data }: AxiosResponse<CoinsFetchMarketChart, CoinsFetchMarketChartParams> = await client.get(
    `coins/${id}/market_chart?`,
    config
  );
  const result: CoinPriceHistory = {
    percent_change: percentChange(),
    prices: data.prices,
  };
  return result;
};
