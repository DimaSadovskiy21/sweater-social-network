import styled from "styled-components";

export const UserInfoWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "30%",
  height: "100%",
  gap: "20px",
  padding: "20px",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
  background: "var(--white)",
});

export const UserAvatarWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Username = styled("p")({
  color: "var(--dark-blue)",
});

export const ActivityInfoWrapper = styled("div")({
  display: "flex",
  gap: "10px",
  fontSize: "var(--small-font)",
  color: "var(--dark-gray)"
})