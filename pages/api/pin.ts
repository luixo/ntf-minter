import { NextApiRequest, NextApiResponse } from "next";
import { NFTMetadata } from "../../src/types";

// Probably should use validation library, but not now
const validateBody = (body: any): body is NFTMetadata => {
  return (
    typeof body === "object" &&
    body &&
    typeof body.name === "string" &&
    typeof body.description === "string" &&
    typeof body.imageUrl === "string"
  );
};

const safeParseBody = (body: string): NFTMetadata | undefined => {
  try {
    const result = JSON.parse(body);
    if (validateBody(result)) {
      return result;
    }
  } catch {
    return;
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ ipfsUrl: string } | { error: string }>
) => {
  const body = safeParseBody(req.body);
  if (!body) {
    return res.status(400).end();
  }
  const pinataKey = process.env.PINATA_KEY;
  const pinataSecret = process.env.PINATA_SECRET;
  if (!pinataKey || !pinataSecret) {
    return res.status(403).end();
  }
  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        body: JSON.stringify({
          pinataContent: body,
          pinataMetadata: {
            name: `NFT named "${body.name.slice(0, 20)}${
              body.name.length > 20 ? "..." : ""
            }"`,
          },
        }),
        headers: {
          pinata_api_key: pinataKey,
          pinata_secret_api_key: pinataSecret,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      return res.status(response.status).json({
        error: response.statusText,
      });
    }
    const json = await response.json();
    res.status(200).json({
      ipfsUrl: `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`,
    });
  } catch (e) {
    res.status(500).json({
      error: String(e),
    });
  }
};

export default handler;
