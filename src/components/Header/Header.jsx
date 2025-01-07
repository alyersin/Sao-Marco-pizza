import { Box, Link, Image } from "@chakra-ui/react";
import React from "react";
import BlackBar from "./BlackBar";
import "../../app/globals.css";

export default function Header() {
  return (
    <Box className="borderRed" display="flex" flexDirection="column">
      <BlackBar />

      <Box>
        <Box width={{ base: "170px", md: "340px" }} height="auto">
          <Link href="/">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width="100%"
              height="auto"
              objectFit="contain"
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
