"use client";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import "../app/globals.css";
import pizza from "../pizza.json";
import salate from "../salate.json";
import burgerAndWraps from "../burgerAndWraps.json";
import paste from "../paste.json";
import bauturi from "../bauturi.json";
import desert from "../desert.json";
import sandwich from "../sandwich.json";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomItems, setRandomItems] = useState([]);
  const [secondGrid, setSecondGrid] = useState([]);
  const [thirdGrid, setThirdGrid] = useState([]);

  const getRandItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const updateRandomItems = () => {
    const firstGrid = [
      getRandItem(pizza),
      getRandItem(salate),
      getRandItem(burgerAndWraps),
      getRandItem(paste),
    ];
    setRandomItems(firstGrid);

    const allItems = [
      ...pizza,
      ...salate,
      ...burgerAndWraps,
      ...paste,
      ...bauturi,
      ...desert,
      ...sandwich,
    ];

    const uniqueSecondGrid = new Set();
    while (uniqueSecondGrid.size < 8) {
      uniqueSecondGrid.add(getRandItem(allItems));
    }
    setSecondGrid(Array.from(uniqueSecondGrid));

    const uniqueThirdGrid = new Set();
    while (uniqueThirdGrid.size < 8) {
      uniqueThirdGrid.add(getRandItem(allItems));
    }
    setThirdGrid(Array.from(uniqueThirdGrid));
  };

  useEffect(() => {
    updateRandomItems();

    const intervalId = setInterval(() => {
      updateRandomItems();
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const isBtnDisabled = (item) => {
    return (
      bauturi.some((bautura) => bautura.id === item.id) ||
      desert.some((desertItem) => desertItem.id === item.id)
    );
  };

  return (
    <Box className="borderRed" mx="auto">
      <Box height="116px">
        <Heading textAlign="center" color="white" py={8}>
          Welcome to Pizza App!
        </Heading>
      </Box>

      {/* 1ST GRID */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} p={6}>
        {randomItems.map((item) => (
          <Card key={item.id} item={item} isDisabled={isBtnDisabled(item)} />
        ))}
      </SimpleGrid>

      {/* 2ND GRID */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} p={6}>
        {secondGrid.map((item) => (
          <Card key={item.id} item={item} isDisabled={isBtnDisabled(item)} />
        ))}
      </SimpleGrid>

      {/* 3RD GRID */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} p={6}>
        {thirdGrid.map((item) => (
          <Card key={item.id} item={item} isDisabled={isBtnDisabled(item)} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
