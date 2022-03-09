import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/Layout";
import { AuthProvider } from "../providers/authProvider";
import { AxiosProvider } from "../providers/axiosProvider";
import theme from "../theme";
import "./styles.css";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Reddit Clone</title>
      </Head>
      <ErrorBoundary fallback={<div>"Something went wrong"</div>}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Hydrate state={pageProps.dehydratedState}>
                <AxiosProvider>
                  <AuthProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AuthProvider>
                </AxiosProvider>
              </Hydrate>
            </QueryClientProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
