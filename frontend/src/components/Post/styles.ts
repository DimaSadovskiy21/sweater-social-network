import styled from "styled-components";

import { Delete, Edit } from "assets/vectors";

export const PostWrapper = styled("div")({
  height: "200px",
  background: "var(--blue)",
  borderRadius: "5px",
  color: "var(--white)",
});

export const DeletePostStyled = styled(Delete)({
  cursor: "pointer",
});

export const EditPostStyled = styled(Edit)({
  cursor: "pointer",
});
