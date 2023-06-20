import styled from "styled-components";

export const MessageWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  border: "3px solid var(--gray)",
  borderRadius: "5px",
  background: "white",
  color: "var(--blue)",
  whiteSpace: "nowrap",
  "@media (max-width: 1070px)": {
    whiteSpace: "normal",
  },
});
