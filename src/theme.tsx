import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const fonts = {
  heading: "Source Sans Pro",
  body: "Source Sans Pro",
  mono: `'Menlo', monospace`,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  color: {
    primaryDark: "1F1D36",
    primaryLight: "whiteAlpha.900",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("primaryLight", "primaryDark")(props),
        color: mode("primaryDark", "primaryLight")(props),
        borderColor: mode("primaryDark", "primaryLight")(props),
      },
    }),
  },
  components: {
    Box: {
      baseStyle: (props) => ({
        bg: mode("whiteAlpha.900", "gray.800")(props),
        color: mode("black.900", "white.900")(props),
      }),
    },
    Flex: {
      baseStyle: (props) => ({
        bg: mode("whiteAlpha.900", "gray.800")(props),
        color: mode("black.900", "white.900")(props),
      }),
    },
    Button: {
      baseStyle: (props) => ({
        borderColor: mode("black.900", "white.900")(props),
        border: "1px",
        position: "inherit",
      }),
    },
    TextArea: {
      baseStyle: (props) => ({
        position: "inherit",
      }),
    },
  },
  config,
  fonts,
  breakpoints,
});

export default theme;
