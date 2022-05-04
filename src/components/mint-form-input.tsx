import React from "react";
import { Form } from "react-bootstrap";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { styled } from "../styles";

const Group = styled(Form.Group, {
  position: "relative",
  marginBottom: "1rem",
});

type Props = {
  registerReturn: UseFormRegisterReturn;
  id: string;
  name: string;
  placeholder: string;
  error?: FieldError;
  showTooltip: boolean;
  touched?: boolean;
  onFocus: React.FocusEventHandler;
};

export const MintFormInput: React.FC<Props> = ({
  registerReturn,
  id,
  name,
  placeholder,
  error,
  showTooltip,
  touched,
  onFocus,
}) => {
  return (
    <Group>
      <Form.Label htmlFor={id}>{name}</Form.Label>
      <Form.Control
        id={id}
        placeholder={placeholder}
        {...registerReturn}
        onFocus={onFocus}
        isInvalid={touched ? Boolean(error) : false}
      />
      {error && showTooltip && (
        <Form.Control.Feedback type="invalid" tooltip>
          {error.message}
        </Form.Control.Feedback>
      )}
    </Group>
  );
};
