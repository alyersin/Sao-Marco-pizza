import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Mongoose', sans-serif",
    body: "Arial, sans-serif",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  },
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
