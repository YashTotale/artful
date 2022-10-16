// React Imports
import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { AppProps as DefaultAppProps } from "next/app";

// MUI Imports
import { Container, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

// Components
import Header from "../components/Header";

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
        <Header />
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </CacheProvider>
  );
};

const Page: FC<PropsWithChildren> = (props) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        marginTop: theme.spacing(2),
      }}
    >
      {props.children}
    </Container>
  );
};

export default App;
