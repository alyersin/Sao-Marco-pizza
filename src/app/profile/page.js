"use client";

import {
  Box,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import DatePersonale from "@/components/Profile/DatePersonale";
import AdreseDeLivrare from "@/components/Profile/AdreseDeLivrare";
import IstoricComenzi from "@/components/Profile/IstoricComenzi";

export default function Page() {
  const [activeItem, setActiveItem] = useState("Date personale");

  const renderContent = () => {
    switch (activeItem) {
      case "Date personale":
        return <DatePersonale />;
      case "Adrese de livrare":
        return <AdreseDeLivrare />;
      case "Istoric comenzi":
        return <IstoricComenzi />;
      default:
        return null;
    }
  };

  return (
    <Box
      bg="#232323"
      color="white"
      px={{ base: 4, md: 10 }}
      pt={{ base: 4, md: 9 }}
      pb={{ base: 4, md: 6 }}
      maxW="1024px"
      mx="auto"
      mt={{ base: 0, md: 20 }}
      mb={{ base: 4, md: 20 }}
      borderRadius="md"
    >
      <Text
        display={{ base: "none", md: "flex" }}
        fontSize={{ base: "md", md: "16px" }}
        mb={{ base: 4, md: 9 }}
      >
        Cont personal | {activeItem}
      </Text>
      {/* NAVIGATION DESKTOP */}
      <HStack
        display={{ base: "none", md: "flex" }}
        spacing={{ base: 2, md: 4 }}
        justifyContent="space-around"
        mb={{ base: 4, md: 6 }}
        mt={{ base: 4, md: 8 }}
        flexWrap="wrap"
      >
        <ChakraLink
          onClick={() => setActiveItem("Date personale")}
          color={activeItem === "Date personale" ? "#FFD100" : "white"}
          fontSize={{ base: "sm", md: "xl" }}
          cursor="pointer"
          _hover={{ textDecoration: "none" }}
        >
          DATE PERSONALE
        </ChakraLink>

        <ChakraLink
          onClick={() => setActiveItem("Adrese de livrare")}
          color={activeItem === "Adrese de livrare" ? "#FFD100" : "white"}
          fontSize={{ base: "sm", md: "xl" }}
          cursor="pointer"
          _hover={{ textDecoration: "none" }}
        >
          ADRESE DE LIVRARE
        </ChakraLink>

        <ChakraLink
          onClick={() => setActiveItem("Istoric comenzi")}
          color={activeItem === "Istoric comenzi" ? "#FFD100" : "white"}
          fontSize={{ base: "sm", md: "xl" }}
          cursor="pointer"
          _hover={{ textDecoration: "none" }}
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>
      {/* NAVIGATION MOBILE */}
      <Box
        display={{ base: "flex", md: "none" }}
        width={"full"}
        mt={{ base: 2, md: 0 }}
      >
        <Menu matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon boxSize={8} />}
            width="full"
            height={"50px"}
            bg="#707070"
            color="white"
            _hover={{ bg: "#606060" }}
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {activeItem}
          </MenuButton>
          <MenuList width="full" bg="#707070" border="none">
            <MenuItem
              onClick={() => setActiveItem("Date personale")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Date personale
            </MenuItem>
            <MenuItem
              onClick={() => setActiveItem("Adrese de livrare")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Adrese de livrare
            </MenuItem>
            <MenuItem
              onClick={() => setActiveItem("Istoric comenzi")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Istoric comenzi
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Divider
        display={{ base: "none", md: "flex" }}
        borderColor="#FFD100"
        borderWidth="1px"
        mb={{ base: 4, md: 0 }}
      />
      {/* RENDER CONTENT */}
      {renderContent()}
    </Box>
  );
}
