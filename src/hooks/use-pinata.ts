import { useMutation } from "react-query";
import { NFTMetadata } from "../types";

export const usePinata = () => {
  const pinJSONMutation = useMutation<string, unknown, NFTMetadata>(
    async (metadata) => {
      const response = await window.fetch("api/pin", {
        method: "POST",
        body: JSON.stringify(metadata),
      });
      const json: { ipfsUrl: string } = await response.json();
      return json.ipfsUrl;
    }
  );
  return {
    pinMetadata: pinJSONMutation.mutateAsync,
  };
};
