import React from "react";
import type { ExternalProvider } from "@ethersproject/providers";
import type EventEmitter from "events";
import MetaMaskOnboarding from "@metamask/onboarding";

import { Network } from "../types";

export type EthereumController = Required<ExternalProvider> & EventEmitter;

const getController = (): EthereumController | undefined => {
  if (typeof window === "undefined") {
    return;
  }
  if (window.ethereum && window.ethereum.isMetaMask) {
    return window.ethereum as EthereumController;
  }
};

export const controller = getController();

const useMetamaskEffect = (
  callback: (controller: EthereumController) => void,
  deps: unknown[]
) => {
  React.useEffect(() => {
    if (!controller) {
      return;
    }
    callback(controller);
  }, deps);
};

const useMetamaskSubscription = <T>(
  eventName: string,
  handler: (arg: T) => void,
  deps: unknown[]
) => {
  useMetamaskEffect((controller) => {
    controller.on(eventName, handler);
    return () => {
      // Who does create an event emitter without "off" function?
      // controller.off(eventName, handler);
    };
  }, deps);
};

const getAddresses = (
  controller: EthereumController,
  silent: boolean
): Promise<string[]> => {
  return controller.request({
    method: silent ? "eth_accounts" : "eth_requestAccounts",
  });
};

const getChain = (controller: EthereumController): Promise<Network> => {
  return controller.request({
    method: "eth_chainId",
  });
};

export const useMetamask = () => {
  const [address, setAddress] = React.useState<string>();
  const [network, setNetwork] = React.useState<Network>();
  const [loading, setLoading] = React.useState(false);
  const [didConnect, setDidConnect] = React.useState(false);
  const [explicitError, setExplicitError] = React.useState<string>();
  const [onboarding] = React.useState(() =>
    typeof window === "undefined" ? null : new MetaMaskOnboarding()
  );

  const fetchAddresses = React.useCallback(
    async (controller: EthereumController, silent: boolean) => {
      try {
        setLoading(true);
        const addresses = await getAddresses(controller, silent);
        if (addresses.length === 0) {
          return;
        }
        setAddress(addresses[0]);
        setNetwork(await getChain(controller));
        if (onboarding) {
          onboarding.stopOnboarding();
        }
        setExplicitError(undefined);
      } catch (e: any) {
        if (!silent) {
          setExplicitError(
            e.message || "There was a problem getting metamask address"
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [setAddress, setNetwork, setLoading, setDidConnect, onboarding]
  );

  useMetamaskEffect(
    (controller) => void fetchAddresses(controller, true),
    [fetchAddresses]
  );

  useMetamaskSubscription<string[]>(
    "accountsChanged",
    ([address]) => setAddress(address),
    [setAddress]
  );

  useMetamaskSubscription<Network>("chainChanged", setNetwork, [setNetwork]);

  const connect = React.useCallback(() => {
    if (!controller) {
      if (onboarding) {
        onboarding.startOnboarding();
      }
    } else {
      setDidConnect(true);
      void fetchAddresses(controller, false);
    }
  }, [fetchAddresses, onboarding, setDidConnect]);

  return {
    address,
    network,
    explicitError,
    loading,
    connect,
    didConnect,
  };
};
