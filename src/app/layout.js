"use client";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import theme from "../theme";

import { CartProvider } from "@/context/CartContext";
import BlackBar from "@/components/Header/BlackBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pizza App</title>
      </head>
      <body
        suppressHydrationWarning
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <ChakraProvider theme={theme}>
          <CartProvider>
            <BlackBar />
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </CartProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
