"use client";
import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import "../app/globals.css";
import menuItems from "../menuItems.json";
import Card from "../components/Card/Card";

export default function Home() {
  return (
    <Box className="borderRed" mx="auto">
      <Box height="886px">
        <Image
          src="../assets/main-page.jpg"
          alt="Logo"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} p={6}>
        {menuItems.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
