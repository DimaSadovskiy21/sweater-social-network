import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderWrapper = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
  background: "var(--white)",
});

export const LogoWrapper = styled(Link)({
  display: "flex",
  gap: "5px",
  textDecoration: "none",
});

export const LogoTitle = styled("p")({
  fontFamily: "var(--sigmar)",
  fontSize: "var(--large-font)",
  fontWeight: "bold",
  color: "var(--dark-blue)",
});

export const MenuWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "40px",
});

export const UserAvatar = styled("img")({
  width: "46px",
  height: "46px",
  borderRadius: "50%",
});

export const NoAvatarWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  background: "var(--blue)",
});

