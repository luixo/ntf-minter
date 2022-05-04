import React from "react";
import { NFTMetadata } from "../types";

export const usePinata = () => {
  const pinMetadata = React.useCallback(async (metadata: NFTMetadata) => {
    const response = await window.fetch("api/pin", {
      method: "POST",
      body: JSON.stringify(metadata),
    });
    const json: { ipfsUrl: string } = await response.json();
    return json.ipfsUrl;
  }, []);
  return {
    pinMetadata,
  };
};
