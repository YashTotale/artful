// React Imports
import { FC } from "react";

// Style Imports
import { useTheme, useMediaQuery } from "@mui/material";
import { text, textMedium, textRegular, textSmall } from "../styles/text";
import { listItem, listItemInline } from "../styles/list";
import { btn, btnAccent, btnLink } from "../styles/button";
import { colorGrey, colorPrimary } from "../styles/colors";

const Header: FC = () => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <header
      css={{
        position: "relative",
        padding: isSizeSmall ? "1rem 3rem 5rem" : "6rem 12rem 10rem",
        backgroundColor: colorPrimary,
      }}
    >
      <Navbar isSizeSmall={isSizeSmall} />
      <div className="header__body">
        <div className="grid grid--1x2 grid--centered grid-gap--small">
          <div className="value-proposition">
            <h1 className="value-proposition__title">
              Fastest & secure platform to invest in crypto
            </h1>
            <p className="value-proposition__text text text--small text--regular">
              Buy and sell cryptocurrencies, trusted by 10M wallets with over
              $30 billion in transactions.
            </p>
            <button className="value-proposition__button btn btn--flex btn--accent">
              <span className="text--standart text--medium">Try for FREE</span>
              <div className="chiron-icon-container">
                <img src="images/chevron-right.svg" alt="Right Icon" />
              </div>
            </button>
          </div>
          <img
            src="images/btc-illustration.svg"
            alt="Bitcoin illustration"
            className="btc-illustration"
            data-rellax-horizontal-speed="-2"
            data-rellax-vertical-scroll-axis="x"
          />
        </div>
      </div>
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

interface NavbarProps {
  isSizeSmall: boolean;
}

const Navbar: FC<NavbarProps> = ({ isSizeSmall: isSizeMedium }) => {
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
