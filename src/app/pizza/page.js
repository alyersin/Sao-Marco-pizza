"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import pizza from "../../pizza.json";
import Card from "../../components/Card/Card";
import "../../app/globals.css";

export default function page() {
  return (
    <Box className="borderRed" maxW="1280px" mx="auto">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacingY={6}
        px={24}
        paddingTop={6}
        paddingBottom={28}
        textAlign="center"
      >
        {pizza.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
