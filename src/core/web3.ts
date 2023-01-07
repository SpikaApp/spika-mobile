import * as aptos from "aptos";

export const aptosDerivePath = (i: number): string => {
  return `m/44'/637'/${i}'/0'/0'`;
};

export const coinStore = (type: string): string => {
  return `0x1::coin::CoinStore<${type}>`;
};

export class Web3Client {
  readonly client: aptos.AptosClient;

  constructor(nodeUrl: string) {
    this.client = new aptos.AptosClient(nodeUrl);
  }

  getAccount = (index: number, mnemonic: string): aptos.AptosAccount => {
    return aptos.AptosAccount.fromDerivePath(aptosDerivePath(index), mnemonic);
  };

  getBalance = async (address: string, type: string): Promise<string | undefined> => {
    const result: CoinStore = await this.client.getAccountResource(address, coinStore(type));
    return result.data.coin?.value;
  };

  simulateTransaction = async (
    account: aptos.AptosAccount,
    payload: aptos.TxnBuilderTypes.TransactionPayloadEntryFunction,
    maxGasAmount: string,
    gasUnitPrice: string
  ): Promise<aptos.Types.UserTransaction | undefined> => {
    const transaction = await this.client.generateRawTransaction(account.address(), payload, {
      maxGasAmount: BigInt(maxGasAmount),
      gasUnitPrice: BigInt(gasUnitPrice),
    });
    const bcsTxn = aptos.AptosClient.generateBCSSimulation(account, transaction);
    return (await this.client.submitBCSSimulation(bcsTxn))[0];
  };

  submitTransaction = async (
    account: aptos.AptosAccount,
    payload: aptos.TxnBuilderTypes.TransactionPayloadEntryFunction,
    maxGasAmount: string,
    gasUnitPrice: string
  ): Promise<aptos.Types.Transaction> => {
    return await this.client.generateSignSubmitWaitForTransaction(account, payload, {
      maxGasAmount: BigInt(maxGasAmount),
      gasUnitPrice: BigInt(gasUnitPrice),
    });
  };
}
