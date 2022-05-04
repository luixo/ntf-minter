import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { styled } from "../styles";

const BodyWrapper = styled(Card.Body, {
  display: "flex",
  alignItems: "center",
});

const SpinnerWrapper = styled(Spinner, {
  marginRight: 8,
});

type Props = {
  isLoading: boolean;
  status?: string;
};

export const StatusSpinner: React.FC<Props> = ({ isLoading, status }) => {
  if (!isLoading || !status) {
    return null;
  }
  return (
    <Card>
      <BodyWrapper>
        <SpinnerWrapper animation="border" />
        {status}
      </BodyWrapper>
    </Card>
  );
};
