export type NFTMetadata = {
  name: string;
  imageUrl: string;
  description: string;
};

export type Credentials = {
  address: string;
  network: Network;
};

export enum Network {
  Mainnet = "0x1",
  Ropsten = "0x3",
  Rinkeby = "0x4",
  Goerli = "0x5",
  Kovan = "0x2a",
}
