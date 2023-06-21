import styled from "styled-components";

export const PageWrapper = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "20px",
  background: "var(--white)",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
});

export const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});
