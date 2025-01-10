"use client";

import { Box, Link, Image, HStack, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import BlackBar from "./BlackBar";
import "../../app/globals.css";

export default function Header() {
  return (
    <Box display="flex" flexDirection="column">
      <BlackBar />

      <Box bg="#828282">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          maxWidth="1280px"
          px={8}
          mx="auto"
        >
          <Box width={{ base: "150px", md: "150px" }} height="auto">
            <Link href="/">
              <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width="100%"
                height="106px"
                objectFit="cover"
              />
            </Link>
          </Box>

          <HStack
            spacing={4}
            divider={<Box height="20px" width="1px" bg="black" />}
          >
            <Link href="/pizza" fontWeight="bold" _hover={{ color: "white" }}>
              PIZZA
            </Link>
            <Link href="/paste" fontWeight="bold" _hover={{ color: "white" }}>
              PASTE
            </Link>
            <Link href="/salate" fontWeight="bold" _hover={{ color: "white" }}>
              SALATE
            </Link>
            <Link
              href="/sandwichuri"
              fontWeight="bold"
              _hover={{ color: "white" }}
            >
              SANDWICHURI
            </Link>
            <Link
              href="/deserturi"
              fontWeight="bold"
              _hover={{ color: "white" }}
            >
              DESERTURI
            </Link>
            <Link href="/bauturi" fontWeight="bold" _hover={{ color: "white" }}>
              BAUTURI
            </Link>

            <Link href="/extra" fontWeight="bold" _hover={{ color: "white" }}>
              EXTRA
            </Link>
          </HStack>

          <HStack spacing={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="25px"
              height="25px"
              bg="white"
              color="red.500"
              borderRadius="full"
              fontWeight="bold"
            >
              0
            </Box>
            <HStack spacing={1}>
              <Icon as={FaShoppingCart} color="red.500" boxSize={6} />
              <Text fontWeight="bold" fontSize="sm" color="white">
                0.00 lei
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
