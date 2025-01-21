"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import burgerAndWraps from "../../burgerAndWraps.json";
import Card from "../../components/Card/Card";

export default function page() {
  return (
    <Box className="borderRed" maxW="1280px" mx="auto" px={{ base: 4, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4, lg: 4 }}
        spacingY={6}
        spacingX={{ base: 4, md: 6 }}
        pt={{ base: 4, md: 6 }}
        pb={{ base: 12, md: 28 }}
        textAlign="center"
      >
        {burgerAndWraps.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
