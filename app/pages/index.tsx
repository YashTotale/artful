// React Imports
import { FC } from "react";

// Style Imports
import { useMediaQuery, useTheme } from "@mui/material";
import {
  h1,
  text,
  textMedium,
  textRegular,
  textSmall,
  textStandard,
} from "../styles/text";
import { btn, btnAccent, btnFlex } from "../styles/button";
import { colorWhite } from "../styles/colors";
import { grid, grid1x2, gridCentered, gridGapSmall } from "../styles/layout";

const Home: FC = () => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
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
              Artful is a decentralized physical art marketplace that empowers
              the creator economy.
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
      {!isSizeSmall && (
        <>
          <img
            css={{
              width: "50%",
              position: "absolute",
              bottom: "0",
              right: "50%",
              zIndex: "0",
              pointerEvents: "none",
            }}
            src="images/background-item-1.svg"
            alt=""
          />
          <img
            css={{
              width: "50%",
              position: "absolute",
              bottom: "10%",
              right: "5%",
              pointerEvents: "none",
            }}
            src="images/background-item-2.svg"
            alt=""
          />
        </>
      )}
    </>
  );
};

export default Home;
