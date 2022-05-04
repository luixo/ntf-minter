export const shortenHash = (hash: string): string =>
  `${hash.slice(0, 8)}...${hash.slice(-6)}`;
