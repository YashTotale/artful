// React Imports
import { FC } from "react";

// Style Imports
import { useTheme, useMediaQuery } from "@mui/material";
import { text, textMedium, textRegular, textSmall } from "../styles/text";
import { listItem, listItemInline } from "../styles/list";
import { btn, btnAccent, btnLink } from "../styles/button";
import { colorGrey } from "../styles/colors";

const Navbar: FC = () => {
  const theme = useTheme();
  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));

  const liStyle = {
    ...listItem,
    ...listItemInline,
    ...text,
    ...textSmall,
    ...textRegular,
  };

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: isSizeMedium ? "3.1rem" : "5.1rem",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="images/logo.png"
          alt="Artful Logo"
          css={{
            height: 40,
            marginRight: "8px",
          }}
        />
        <span css={{ ...text, ...textMedium }}>Artful</span>
      </div>
      <nav
        css={{
          display: isSizeMedium ? "none" : "flex",
          alignItems: "center",
        }}
      >
        <ul>
          <li css={liStyle}>Marketplace</li>
        </ul>
        <button
          css={{ ...btn, ...btnLink, ...text, ...textSmall, ...textMedium }}
        >
          Login
        </button>
        <span
          css={{
            height: "2.4rem",
            width: "1px",
            backgroundColor: colorGrey[6],
            margin: "0 2.4rem",
          }}
        ></span>
        <button css={{ ...btn, ...btnAccent, ...textSmall, ...textMedium }}>
          Register
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
