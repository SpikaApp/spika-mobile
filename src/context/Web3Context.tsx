import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Web3Client } from "../core/web3";
import type { RootState } from "../store";

type Web3ContextProps = {
  children: React.ReactNode;
};

interface IWeb3Context {
  web3: Web3Client;
}

export const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);

export const Web3Provider = ({ children }: Web3ContextProps) => {
  const network = useSelector((state: RootState) => state.networkRegistry.current);
  const [web3, setWeb3] = useState<Web3Client>(new Web3Client(network.nodeUrl));

  useEffect(() => {
    setWeb3(new Web3Client(network.nodeUrl));
  }, [network]);

  return (
    <Web3Context.Provider
      value={{
        web3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
