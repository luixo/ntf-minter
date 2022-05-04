import React from "react";
import { Button, Card, Form as BSForm } from "react-bootstrap";
import { SubmitErrorHandler, UseFormReturn } from "react-hook-form";
import { NETWORK_NAMES } from "../constants";
import { styled } from "../styles";
import { NFTMetadata, Credentials } from "../types";
import { shortenHash } from "../utils";
import { MintFormInput } from "./mint-form-input";

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const Form = styled(BSForm, {
  position: "relative",
});

type Props = {
  form: UseFormReturn<NFTMetadata>;
  credentials?: Credentials;
  onSubmit: (result: { data: NFTMetadata; credentials: Credentials }) => void;
  disabled: boolean;
};

export const MintForm: React.FC<Props> = ({
  credentials,
  onSubmit,
  disabled,
  form: {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  },
}) => {
  const [focusDisabled, setFocusDisabled] = React.useState(true);
  const [showTooltips, setShowTooltips] = React.useState(false);

  React.useEffect(() => {
    if (focusDisabled) {
      setFocusDisabled(false);
    }
  }, [focusDisabled]);
  const onSubmitFail: SubmitErrorHandler<NFTMetadata> =
    React.useCallback(() => {
      setShowTooltips(true);
      setFocusDisabled(true);
    }, []);
  const onFocus = React.useCallback(() => {
    if (!focusDisabled) {
      setShowTooltips(false);
    }
  }, [setShowTooltips, focusDisabled]);

  const submitHandler = React.useCallback(
    (values: NFTMetadata) => {
      if (!credentials) {
        return;
      }
      onSubmit({ data: values, credentials });
    },
    [onSubmit, credentials]
  );

  return (
    <Card>
      <Card.Body>
        {credentials && (
          <Card.Title className="mb-4">{`Connected address: ${shortenHash(
            credentials.address
          )} on ${NETWORK_NAMES[credentials.network]}`}</Card.Title>
        )}
        <Form noValidate onSubmit={handleSubmit(submitHandler, onSubmitFail)}>
          <fieldset disabled={!credentials || disabled}>
            <MintFormInput
              registerReturn={register("name", {
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 symbols",
                },
              })}
              id="name"
              name="👀 Name"
              placeholder="Like, really cool NFT"
              error={errors.name}
              showTooltip={showTooltips}
              touched={touchedFields.name}
              onFocus={onFocus}
            />
            <MintFormInput
              registerReturn={register("description", {
                minLength: {
                  value: 3,
                  message: "Description should be at least 3 symbols",
                },
              })}
              id="description"
              name="🗒️ Description"
              placeholder="Let cryptopunks eat the dust!"
              error={errors.description}
              showTooltip={showTooltips}
              touched={touchedFields.description}
              onFocus={onFocus}
            />
            <MintFormInput
              registerReturn={register("imageUrl", {
                pattern: {
                  value: URL_REGEX,
                  message: "Url should be valid",
                },
              })}
              id="imageUrl"
              name="🕸️ Url"
              placeholder="http://ipfs.com/my-nft"
              error={errors.imageUrl}
              showTooltip={showTooltips}
              touched={touchedFields.imageUrl}
              onFocus={onFocus}
            />
            <Button type="submit">Mint NFT</Button>
          </fieldset>
        </Form>
      </Card.Body>
    </Card>
  );
};
