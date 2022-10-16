// React Imports
import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { AppProps as DefaultAppProps } from "next/app";

// MUI Imports
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

// Components
import Navbar from "../components/Navbar";
import { colorPrimary } from "../styles/colors";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppProps extends DefaultAppProps {
  emotionCache?: EmotionCache;
}

const App: FC<AppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </CacheProvider>
  );
};

const Page: FC<PropsWithChildren> = (props) => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      css={{
        position: "relative",
        padding: isSizeSmall ? "1rem 3rem 5rem" : "6rem 12rem 10rem",
        backgroundColor: colorPrimary,
      }}
    >
      <Navbar />
      {props.children}
    </div>
  );
};

export default App;
