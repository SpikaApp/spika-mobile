import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Surface, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

import { baseline } from "../../../theme";
import { copyTextToClipboard } from "../../../utils/clipboard";
import { sleep } from "../../../utils/sleep";

import { styles } from "./styles";

interface ReceiveDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
}

export const ReceiveDialog = ({ open, setOpen, address }: ReceiveDialogProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      resetCopyButton();
    }
  }, [copied]);

  const handleCopyToClipboard = () => {
    copyTextToClipboard(address);
    setCopied(true);
  };

  const resetCopyButton = async () => {
    await sleep(3000);
    setCopied(false);
  };

  return (
    <Dialog visible={open} dismissable={false}>
      <Dialog.Title style={styles.dialogTitle}>
        <Text variant="headlineMedium">Your Aptos Address</Text>
      </Dialog.Title>
      <Dialog.Content>
        <View style={[styles.contentContainer, baseline.marginExtendedBottom]}>
          <Surface style={styles.qrCodeContainer}>
            <QRCode value={address} enableLinearGradient={true} size={130} />
          </Surface>
        </View>
        <View>
          <View style={styles.addressContainer}>
            <Text variant="titleMedium" style={styles.addressText}>
              {address}
            </Text>
          </View>
        </View>
        <View style={[styles.copyButtonContainer, baseline.marginExtendedTop]}>
          <Button icon={copied ? "check" : "copy"} mode="outlined" onPress={handleCopyToClipboard}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setOpen(false)}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
