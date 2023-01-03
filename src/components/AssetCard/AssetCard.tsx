import { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { getCoinMarket } from "../../core/api";
import { getBalance } from "../../core/web3";
import { parseError } from "../../core/error";
import { stringToValue } from "../../core/values";
import { theme } from "../../theme";

import { styles } from "./styles";

type AssetCardProps = {
  address: string;
  asset: Coin;
  currency: Currency;
};

export const AssetCard = ({ address, asset, currency }: AssetCardProps) => {
  const [balance, setBalance] = useState<string>("0");
  const [value, setValue] = useState<string>("-");
  const [change, setChange] = useState<string>("-");
  const [trend, setTrend] = useState<Trend>("neutral");

  useEffect(() => {
    const getAssetBalance = async () => {
      try {
        const result = await getBalance(address, asset.type);
        if (result) {
          setBalance(stringToValue(asset, result));
        }
      } catch (e) {
        const error = parseError(e, `Failed to update ${asset.data.symbol} balance`);
        console.debug(error.defaultResponse);
        console.debug(error.message);
      }
    };

    const getAssetMarket = async () => {
      try {
        const result = await getCoinMarket(asset, currency);
        const roundedChange = Number(result.price_change_24h.toFixed(2));
        const _price = result.current_price;
        const _value = Number(_price * Number(balance)).toFixed(2);
        setValue(_value === "0.00" ? "-" : _value);
        setChange(roundedChange.toString());
        if (roundedChange > 0.011) {
          setTrend("green");
        } else if (roundedChange < -0.011) {
          setTrend("red");
        } else {
          setTrend("neutral");
        }
      } catch (e) {
        setChange("-");
        setValue("-");
        const error = parseError(e, `Failed to update ${asset.data.symbol} price`);
        console.debug(error.defaultResponse);
        console.debug(error.message);
      }
    };
    getAssetBalance();
    getAssetMarket();
    const updateBalance = window.setInterval(() => {
      getAssetBalance();
      getAssetMarket();
    }, 30000);
    return () => window.clearInterval(updateBalance);
  }, [address, asset, currency, balance]);

  const getTrendColor = () => {
    switch (trend) {
      case "green":
        return theme.colors.trend.green;
      case "red":
        return theme.colors.trend.red;
      default:
        return theme.colors.trend.neutral;
    }
  };

  return (
    <Card mode="contained" style={styles.container}>
      <Card.Content style={styles.wrapper}>
        <View style={styles.asset}>
          <View style={styles.iconContainer}>
            <Avatar.Image source={{ uri: asset.data.logo }} size={40} style={styles.assetIcon} />
          </View>
          <View style={styles.assetInfo}>
            <Text numberOfLines={1} variant={"titleMedium"}>
              {asset.data.name}
            </Text>
            <Text numberOfLines={1} variant={"titleMedium"}>
              {balance} {asset.data.symbol}
            </Text>
          </View>
          <View style={styles.marketInfo}>
            <View style={styles.marketValues}>
              <Text numberOfLines={1} variant={"titleMedium"}>
                {value !== "-" && value}
              </Text>
              <Text numberOfLines={1} variant={"titleMedium"} style={{ color: getTrendColor() }}>
                {value !== "-" && change}
              </Text>
            </View>
            <View style={styles.marketValueSymbol}>
              <Text numberOfLines={1} variant={"titleMedium"}>
                {value !== "-" && "$"}
              </Text>
              <Text numberOfLines={1} variant={"titleMedium"} style={{ color: getTrendColor() }}>
                {value !== "-" && "%"}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
