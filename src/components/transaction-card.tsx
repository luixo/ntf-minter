import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { Network } from "../types";
import { shortenHash } from "../utils";

const NETWORK_SCANER_PREFIXES: Record<Network, string> = {
  [Network.Mainnet]: "https://etherscan.io/tx/",
  [Network.Ropsten]: "https://ropsten.etherscan.io/tx/",
  [Network.Rinkeby]: "https://rinkeby.etherscan.io/tx/",
  [Network.Goerli]: "https://goerli.etherscan.io/tx/",
  [Network.Kovan]: "https://kovan.etherscan.io/tx/",
};

type Props = {
  hash: string;
  network: Network;
};

export const TransactionCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          NFT mint transaction{" "}
          <Link href={`${NETWORK_SCANER_PREFIXES[props.network]}${props.hash}`}>
            {shortenHash(props.hash)}
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
