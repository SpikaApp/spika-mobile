import type { AptosAccount } from "aptos";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { decrypt } from "../core/encryptor";
import { getPassword } from "../core/password";
import type { RootState } from "../store";

import { Web3Context } from "./Web3Context";

type AccountContextProps = {
  children: React.ReactNode;
};

interface IAccountContext {
  account: AptosAccount | undefined;
}

export const AccountContext = createContext<IAccountContext>({} as IAccountContext);

export const AccountProvider = ({ children }: AccountContextProps) => {
  const { web3 } = useContext(Web3Context);
  const onboardingCompleted = useSelector((state: RootState) => state.onboarding.onboardingCompleted);
  const secret = useSelector((state: RootState) => state.secret.data);
  const hdPath = useSelector((state: RootState) => state.accountRegistry.current.hdPath);

  const [account, setAccount] = useState<AptosAccount | undefined>(undefined);

  useEffect(() => {
    if (onboardingCompleted && secret) {
      (async () => {
        const password = await getPassword();
        if (password) {
          const mnemonic = await decrypt(secret, password);
          setAccount(web3.getAccount(hdPath, mnemonic));
        }
      })();
    }
  }, [onboardingCompleted, secret, hdPath, web3]);

  return (
    <AccountContext.Provider
      value={{
        account,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
