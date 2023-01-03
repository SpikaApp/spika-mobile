import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Divider, Surface, Text } from "react-native-paper";

import { License, PrivacyPolicy, TermsOfService } from "../../../assets/terms";
import { Checkbox } from "../../../components/Base/Checkbox";
import type { RootStackScreenProps } from "../../../Routes";
import { baseline } from "../../../theme/baseline";

import { styles } from "./styles";

type Rule = "tos" | "privacy";

export const Terms = ({ navigation }: RootStackScreenProps<"Terms">) => {
  const [checkedTermsOfService, setCheckedTermsOfService] = useState<boolean>(false);
  const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState<boolean>(false);

  const handleCheckboxPress = (rule: Rule) => {
    switch (rule) {
      case "tos":
        setCheckedTermsOfService((prev) => {
          return !prev;
        });
        break;
      case "privacy":
        setCheckedPrivacyPolicy((prev) => {
          return !prev;
        });
        break;
    }
  };

  return (
    <View style={baseline.baseContainer}>
      <View style={styles.cardContainer}>
        <Card>
          <Card.Content style={styles.cardContent}>
            <ScrollView style={styles.scrollView}>
              <Text variant="titleSmall" style={styles.termsSectionTitle}>
                {"\n"}1. TERMS OF SERVICE{"\n"}
              </Text>
              <Text variant="bodySmall">{TermsOfService + "\n\n"}</Text>
              <Text variant="titleSmall" style={styles.termsSectionTitle}>
                2. PRIVACY POLICY{"\n"}
              </Text>
              <Text variant="bodySmall">{PrivacyPolicy.overview + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p1h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p1b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p2h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p2b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p3h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p3b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p4h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p4b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p5h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p5b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p6h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p6b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p7h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p7b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p8h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p8b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p9h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p9b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p10h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p10b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p11h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p11b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p12h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p12b + "\n"}</Text>
              <Text variant="titleSmall">{PrivacyPolicy.p13h}</Text>
              <Text variant="bodySmall">{PrivacyPolicy.p13b + "\n\n"}</Text>
              <Text variant="titleSmall" style={styles.termsSectionTitle}>
                3. LICENSE{"\n"}
              </Text>
              <Text variant="titleSmall">{License.title}</Text>
              <Text variant="bodySmall">{License.body}</Text>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.actionContainer}>
        <Surface style={[baseline.checkboxListContainer, baseline.marginExtendedVertical]}>
          <View style={baseline.checkboxItemContainer}>
            <Checkbox
              checked={checkedTermsOfService}
              onPress={() => handleCheckboxPress("tos")}
              position="flex-start"
              size="medium"
              text="I accept the Terms of Service"
            />
          </View>
          <Divider style={baseline.checkboxDividerLeft} />
          <View style={baseline.checkboxItemContainer}>
            <Checkbox
              checked={checkedPrivacyPolicy}
              onPress={() => handleCheckboxPress("privacy")}
              position="flex-start"
              size="medium"
              text="I accept the Privacy Policy"
            />
          </View>
        </Surface>
        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("GenerateSeed", { displayName: "Your Recovery Phrase" })}
            disabled={checkedTermsOfService && checkedPrivacyPolicy ? false : true}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};
