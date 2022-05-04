This is an example of NFT Minter built on [Next.js](https://nextjs.org/).

## Pre-requisites

To get API handler working you need to provide API keys for [Pinata Cloud](https://www.pinata.cloud/) to be able to upload NFT metadata to IPFS.

```
PINATA_KEY=abcd1234abcd1234abcd
PINATA_SECRET=abcd1234abcd1234abcdabcd1234abcd1234abcdabcd1234abcd1234abcd1234
```

### Local development

On local machine the easiest way would be to create a `.env.local` file (git-ignored) with the variables.

## Getting Started

Run next.js server as usual:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.
