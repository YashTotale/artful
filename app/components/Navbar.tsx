// React Imports
import { FC } from "react";

// Style Imports
import { useTheme, useMediaQuery } from "@mui/material";
import {
  text,
  textLarge,
  textMedium,
  textRegular,
  textSmall,
} from "../styles/text";
import { listItem, listItemInline } from "../styles/list";
import { btn, btnAccent, btnLink } from "../styles/button";
import { colorGrey } from "../styles/colors";
import Link from "next/link";

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: FC<NavbarProps> = (props) => {
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
      <Link href="/">
        <div
          css={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="images/logo.png"
            alt="Artful Logo"
            css={{
              height: 75,
              marginRight: "8px",
            }}
          />
          <span css={{ ...text, ...textLarge }}>Artful</span>
        </div>
      </Link>
      <nav
        css={{
          display: isSizeMedium ? "none" : "flex",
          alignItems: "center",
        }}
      >
        <ul>
          <Link href="/marketplace">
            <li css={liStyle}>Marketplace</li>
          </Link>
          <Link href="/add">
            <li css={liStyle}>Add Art</li>
          </Link>
        </ul>
        <span
          css={{
            height: "2.4rem",
            width: "1px",
            backgroundColor: colorGrey[6],
            margin: "0 2.4rem",
          }}
        ></span>
        <button
          css={{ ...btn, ...btnAccent, ...textSmall, ...textMedium }}
          onClick={props.onLoginClick}
        >
          Login
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
