import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Layout from "../components/Layout";

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
