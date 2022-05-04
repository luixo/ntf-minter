import React from "react";
import { styled } from "../styles";

const Wrapper = styled("footer", {
  display: "flex",
  flex: 1,
  padding: "2rem 0",
  justifyContent: "center",
  alignItems: "center",
});

const Link = styled("a", {
  padding: "0 4px",
  display: "contents",
});

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      Developed by{" "}
      <Link target="_blank" href="https://t.me/luixo">
        @luixo
      </Link>{" "}
      as an example case
    </Wrapper>
  );
};
