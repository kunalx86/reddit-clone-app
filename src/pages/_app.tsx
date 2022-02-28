import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/Layout";
import { AuthProvider } from "../providers/authProvider";
import { AxiosProvider } from "../providers/axiosProvider";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps}>
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
  );
}

export default MyApp;
