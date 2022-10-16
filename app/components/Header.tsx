// React Imports
import { FC } from "react";

// Style Imports
import { useTheme, useMediaQuery } from "@mui/material";
import {
  h1,
  text,
  textMedium,
  textRegular,
  textSmall,
  textStandard,
} from "../styles/text";
import { listItem, listItemInline } from "../styles/list";
import { btn, btnAccent, btnFlex, btnLink } from "../styles/button";
import { colorGrey, colorPrimary, colorWhite } from "../styles/colors";
import { grid, grid1x2, gridCentered, gridGapSmall } from "../styles/layout";

const Header: FC = () => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <header
      css={{
        position: "relative",
        padding: isSizeSmall ? "1rem 3rem 5rem" : "6rem 12rem 10rem",
        backgroundColor: colorPrimary,
      }}
    >
      <Navbar isSizeMedium={isSizeMedium} />
      <Hero isSizeSmall={isSizeSmall} isSizeMedium={isSizeMedium} />
      <img
        className="background-item-1"
        src="images/background-item-1.svg"
        alt=""
      />
      <img
        className="background-item-2"
        src="images/background-item-2.svg"
        alt=""
      />
    </header>
  );
};

interface HeroProps {
  isSizeSmall: boolean;
  isSizeMedium: boolean;
}

const Hero: FC<HeroProps> = ({ isSizeSmall, isSizeMedium }) => {
  return (
    <div
      css={{
        textAlign: isSizeSmall ? "center" : "start",
      }}
    >
      <div
        css={
          isSizeSmall
            ? {}
            : { ...grid, ...grid1x2, ...gridCentered, ...gridGapSmall }
        }
      >
        <div>
          <h1
            css={{
              ...h1,
              marginBottom: "2rem",
            }}
          >
            Discover & Invest in Curated Art!
          </h1>
          <p
            css={{
              marginBottom: "3.2rem",
              ...text,
              ...textSmall,
              ...textRegular,
            }}
          >
            Artful is a decentralized physical art marketplace that empowers the
            creator economy.
          </p>
          <button
            css={{
              width: isSizeMedium ? undefined : "23rem",
              ...btn,
              ...btnFlex,
              ...btnAccent,
            }}
          >
            <span
              css={{
                ...textStandard,
                ...textMedium,
              }}
            >
              Try for FREE
            </span>
            <div
              css={{
                display: "inline-flex",
                width: "3.2rem",
                height: "3.2rem",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colorWhite,
                borderRadius: "100%",
                WebkitBorderRadius: "100%",
                MozBorderRadius: "100%",
                MsBorderRadius: "100%",
                OBorderRadius: "100%",
                marginLeft: "2.4rem",
              }}
            >
              <img src="images/chevron-right.svg" alt="Right Icon" />
            </div>
          </button>
        </div>
        <img
          src="images/art-museum.svg"
          alt="Art Museum"
          css={{
            display: isSizeSmall ? "none" : "block",
          }}
          data-rellax-horizontal-speed="-2"
          data-rellax-vertical-scroll-axis="x"
        />
      </div>
    </div>
  );
};

interface NavbarProps {
  isSizeMedium: boolean;
}

const Navbar: FC<NavbarProps> = ({ isSizeMedium }) => {
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
        <img src="images/logo.svg" alt="Artful brand logo" />
        <span css={{ ...text, ...textMedium }}>Artful</span>
      </div>
      <nav
        css={{
          display: isSizeMedium ? "none" : "flex",
          alignItems: "center",
        }}
      >
        <ul>
          <li css={liStyle}>Products</li>
          <li css={liStyle}>Features</li>
          <li css={liStyle}>About</li>
          <li css={liStyle}>Contact</li>
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

export default Header;
