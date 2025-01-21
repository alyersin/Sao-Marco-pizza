"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import pizza from "../../pizza.json";
import Card from "../../components/Card/Card";

export default function page() {
  return (
    <Box className="borderRed" maxW="1280px" mx="auto" px={{ base: 4, md: 8 }}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4, lg: 4 }}
        spacingY={8}
        spacingX={{ base: 4, md: 6 }}
        pt={{ base: 4, md: 6 }}
        pb={{ base: 12, md: 28 }}
        textAlign="center"
      >
        {pizza.map((item) => (
          <Card
            key={item.id}
            item={item}
            width="244px"
            height="580px"
            p={6}
            m={"auto"}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
