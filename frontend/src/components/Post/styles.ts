import styled from "styled-components";

import { Delete, Edit } from "assets/vectors";

import { IPostWrapperProps } from "./types";

export const PostWrapper = styled("div")<IPostWrapperProps>(
  ({ isLoading }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    width: "100%",
    background: isLoading ? "var(--dark-blue)" : "var(--blue)",
    borderRadius: "5px",
    color: "var(--white)",
    marginBottom: "20px",
    padding: "10px",
    pointerEvents: isLoading ? "none" : "auto",
  })
);

export const ButtonsWrapper = styled("div")({
  display: "flex",
  alignSelf: "flex-end",
  gap: "10px",
});

export const DeletePostStyled = styled(Delete)({
  cursor: "pointer",
});

export const EditPostStyled = styled(Edit)({
  cursor: "pointer",
});

export const EditPostField = styled("textarea")({
  height: "150px",
  padding: "5px",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
  outline: "none",
  fontFamily: "var(--delaGothicOne)",
  fontSize: "var(--small-font)",
  resize: "none",
});

export const InfoPostWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
