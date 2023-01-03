interface AccountState {
  public: Array<SpikaAccount>;
  master: EncryptedObject | null;
  current: number | null;
  latest: number | null;
}

interface SpikaAccount {
  index: number;
  name: string;
  data: PublicAccount;
}

interface PublicAccount {
  address: string;
  pubKey: string;
  authKey?: string;
}
