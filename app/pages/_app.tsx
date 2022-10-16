// React Imports
import { FC, PropsWithChildren, useState } from "react";
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
import { SnackbarProvider } from "notistack";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { colorPrimary } from "../styles/colors";

// Components
import Navbar from "../components/Navbar";
import Login from "../components/Login";

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
  const [onLogin, setOnLogin] = useState(false);

  return (
    <div
      css={{
        position: "relative",
        padding: isSizeSmall ? "1rem 3rem 5rem" : "6rem 12rem 10rem",
        backgroundColor: colorPrimary,
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <Login open={onLogin} closeLogin={() => setOnLogin(false)} />
        <Navbar onLoginClick={() => setOnLogin(!onLogin)} />
        {props.children}
      </SnackbarProvider>
    </div>
  );
};

export default App;
