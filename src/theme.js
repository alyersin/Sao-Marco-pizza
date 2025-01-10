import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundImage: "url('/assets/body-bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
        overflowX: "hidden",
        margin: "0",
        padding: "0",
      },
    },
  },
});

export default theme;
