import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Surface, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import { getAptosAccount } from "../../../core/web3";
import type { RootStackScreenProps } from "../../../Routes";
import { getRouteParams } from "../../../core/navigation";
import { addAccount } from "../../../store/slices/account";
import { baseline } from "../../../theme";

import { styles } from "./styles";

type PasswordStrengthIncludes = "lowercase" | "uppercase" | "symbol" | "number";
type PasswordStrengthColorCode = "error" | "warning" | "success";

interface PasswordStatus {
  id: number;
  value: string;
  length: string;
  contains: Array<PasswordStrengthIncludes>;
  colorCode: PasswordStrengthColorCode;
}

export const InitAccount = ({ navigation }: RootStackScreenProps<"InitAccount">) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPasswor] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password !== "") {
      const strength = passwordStrength(password);
      const result: PasswordStatus = {
        id: strength.id,
        value: strength.value,
        length: strength.value,
        contains: strength.contains,
        colorCode: getPasswordStrengthStatus(strength.id),
      };
      setPasswordStatus(result);
    } else {
      setPasswordStatus(undefined);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword !== "") {
      if (passwordStatus && passwordStatus.id > 1) {
        if (password === confirmPassword) {
          setPasswordValidated(true);
          setPasswordError(false);
        } else {
          setPasswordValidated(false);
          setPasswordError(true);
        }
      } else {
        setPasswordValidated(false);
        setPasswordError(true);
      }
    } else {
      setPasswordValidated(false);
      setPasswordError(true);
    }
  }, [confirmPassword, password, passwordStatus]);

  const getPasswordStrengthStatus = (id: number): PasswordStrengthColorCode => {
    switch (id) {
      case 0: // Too weak
        return "error";
      case 1: // Weak
        return "warning";
      case 2: // Medium
        return "success";
      case 3: // Strong
        return "success";
      default:
        return "error";
    }
  };

  const initAccount = () => {
    const { mnemonic } = getRouteParams(navigation) as ConfirmSeedScreenProps;
    const account = getAptosAccount(0, mnemonic);
    dispatch(
      addAccount({
        index: 0,
        name: "Account 1",
        data: {
          address: account.address().hex(),
          pubKey: account.pubKey().hex(),
          authKey: account.authKey().hex(),
        },
      })
    );
  };

  return (
    <View style={baseline.baseContainer}>
      <Surface style={[baseline.marginRegularBottom, styles.infoContainer]}>
        <Text variant="bodyMedium">
          Great we are almost done! Now, let's create strong password to keep your account safe.{" "}
          <Text variant="titleSmall">
            Please note, Spika wallet unable to help recover lost passwords. Handle it with care!
          </Text>
        </Text>
      </Surface>

      <View>
        <View style={styles.passwordContainer}>
          <TextInput
            mode="outlined"
            value={password}
            autoCapitalize="none"
            autoFocus={true}
            placeholder="Password"
            autoComplete="password-new"
            secureTextEntry={true}
            onChangeText={(input) => setPassword(input)}
            style={styles.passwordField}
          />
          <View style={styles.helperTextContainer}>
            {passwordStatus && (
              <HelperText type={passwordStatus.id < 2 ? "error" : "info"}>
                {passwordStatus.id <= 1 && `${passwordStatus.value} password`}
              </HelperText>
            )}
          </View>
          <TextInput
            mode="outlined"
            value={confirmPassword}
            autoCapitalize="none"
            autoFocus={false}
            placeholder="Confirm password"
            style={styles.passwordField}
            autoComplete="password-new"
            onChangeText={(input) => setConfirmPasswor(input)}
            secureTextEntry={true}
          />
          <View style={styles.helperTextContainer}>
            {password !== "" &&
              password.length === confirmPassword.length &&
              passwordStatus &&
              passwordStatus.id > 1 && (
                <HelperText type={passwordError ? "error" : "info"}>
                  {passwordError && "Passwords do not match"}
                </HelperText>
              )}
          </View>
        </View>
      </View>
      <View style={[baseline.marginRegularTop, styles.buttonContainer]}>
        <Button mode="contained" disabled={passwordValidated ? false : true} onPress={initAccount}>
          Create Account
        </Button>
      </View>
    </View>
  );
};
