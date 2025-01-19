"use client";
import { Box, Image } from "@chakra-ui/react";
import "../app/globals.css";
import RandomItems from "@/components/RandomItems/RandomItems";

export default function Home() {
  return (
    <Box mx="auto">
      <Box
        height={{ base: "220px", md: "500px", lg: "886px" }}
        overflow="hidden"
        mb={{ base: 0, md: 12 }}
      >
        <Image
          src="../assets/main-page.jpg"
          alt="Logo"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      <RandomItems />
    </Box>
  );
}
