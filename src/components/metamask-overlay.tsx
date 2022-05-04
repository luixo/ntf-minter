import React from "react";
import { Button, Card, Spinner as BSSpinner } from "react-bootstrap";
import { styled } from "../styles";
import { useMetamask } from "../hooks/use-metamask";
import { Credentials, Network } from "../types";
import { NETWORK_NAMES } from "../constants";

declare global {
  interface Window {
    ethereum?: import("ethers").providers.ExternalProvider;
  }
}

const Overlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
});

const Text = styled(Card.Subtitle, {
  whiteSpace: "pre-wrap",
});

const Spinner = styled(BSSpinner, {
  display: "block",
});

const CardBody = styled(Card.Body, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const VALID_NETWORKS = [Network.Ropsten];

type Props = {
  onCredentialsChange: (credentials: Credentials) => void;
};

const getError = (
  explicitError?: string,
  address?: string,
  network?: Network
): string | undefined => {
  if (explicitError) {
    return explicitError;
  }
  if (!address) {
    return "There is no address in Metamask";
  }
  if (!network) {
    return "There is no network in Metamask";
  }
  if (!VALID_NETWORKS.includes(network)) {
    return `Only following chains are supported: ${VALID_NETWORKS.map(
      (network) => NETWORK_NAMES[network]
    ).join(", ")}\nYour chain is ${NETWORK_NAMES[network] || `id ${network}`}`;
  }
};

export const MetamaskOverlay: React.FC<Props> = ({ onCredentialsChange }) => {
  const { explicitError, address, network, connect, loading, didConnect } =
    useMetamask();
  const error = getError(explicitError, address, network);

  React.useEffect(() => {
    if (address && network && !error) {
      onCredentialsChange({ address, network });
    }
  }, [onCredentialsChange, address, network, error]);

  if (address && !error) {
    return null;
  }

  return (
    <Overlay>
      <Card>
        <CardBody className="text-center">
          <Card.Title className="mb-2">
            Metamask is {loading ? "loading" : "not connected"}
          </Card.Title>
          {loading ? (
            <Spinner animation="border" className="mb-2" />
          ) : error ? (
            <Text className="mb-2">⚠️ {error} ⚠️</Text>
          ) : (
            <Text className="text-muted mb-2">
              Please connect metamask before creating your NFT
            </Text>
          )}
          <Button onClick={connect} disabled={loading}>
            {!didConnect ? `Connect metamask` : `Reconnect metamask`}
          </Button>
        </CardBody>
      </Card>
    </Overlay>
  );
};
