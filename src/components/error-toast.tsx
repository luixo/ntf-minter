import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Mutation, UseMutationResult } from "react-query";
import { NFTMetadata, Credentials } from "../types";

type Props = {
  mutation: UseMutationResult<
    string,
    unknown,
    { data: NFTMetadata; credentials: Credentials }
  >;
};

const getError = (error: unknown): string => {
  if (!error) {
    return "";
  }
  if ((error as Error).message) {
    return (error as Error).message;
  }
  return String(error);
};

export const ErrorToast: React.FC<Props> = ({ mutation }) => {
  const resetMutation = React.useCallback(() => mutation.reset(), [mutation]);

  return (
    <ToastContainer position="top-end" className="m-2">
      <Toast show={mutation.isError} onClose={resetMutation} bg="warning">
        <Toast.Header>
          <strong className="me-auto">❌ Error while minting NFT ❌</strong>
        </Toast.Header>

        <Toast.Body>{getError(mutation.error)}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
