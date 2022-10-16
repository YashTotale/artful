import { colorAccent, colorAccentHover, colorWhite } from "./colors";

export const btn = {
  padding: "1.4rem 3.2rem",
  border: "0",
  outline: "none",
  borderRadius: "32px",
  WebkitBorderRadius: "32px",
  MozBorderRadius: "32px",
  MsBorderRadius: "32px",
  OBorderRadius: "32px",
  cursor: "pointer",
};

export const btnFlex = {
  display: "inline-flex",
  alignItems: "center",
};

export const btnAccent = {
  backgroundColor: colorAccent,
  color: colorWhite,
  "&:hover": {
    color: colorAccentHover,
  },
};

export const btnLink = {
  padding: "0",
  backgroundColor: "transparent",
  color: colorWhite,
  "&:hover": {
    color: colorAccentHover,
  },
};
