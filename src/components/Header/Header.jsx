"use client";

import { Box, Link, Image, HStack, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../../app/globals.css";

export default function Header() {
  return (
    <Box
      position="sticky" // Makes the header sticky
      top="0" // Sticks it to the top of the viewport
      zIndex="1000" // Ensures it's above other elements
      bg="#828282" // Background color of the header
      boxShadow="md" // Optional: Adds a shadow for better visibility
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1280px"
        px={8}
        mx="auto"
      >
        {/* Logo */}
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

        {/* Navigation Links */}
        <HStack
          spacing={4}
          divider={<Box height="20px" width="1px" bg="black" />}
        >
          <Link href="/pizza" fontWeight="bold" _hover={{ color: "#FFD100" }}>
            PIZZA
          </Link>
          <Link href="/paste" fontWeight="bold" _hover={{ color: "#FFD100" }}>
            PASTE
          </Link>
          <Link href="/salate" fontWeight="bold" _hover={{ color: "#FFD100" }}>
            SALATE
          </Link>
          <Link
            href="/sandwichuri"
            fontWeight="bold"
            _hover={{ color: "#FFD100" }}
          >
            SANDWICHURI
          </Link>
          <Link
            href="/deserturi"
            fontWeight="bold"
            _hover={{ color: "#FFD100" }}
          >
            DESERTURI
          </Link>
          <Link href="/bauturi" fontWeight="bold" _hover={{ color: "#FFD100" }}>
            BAUTURI
          </Link>
          <Link
            href="/burgerAndWraps"
            fontWeight="bold"
            _hover={{ color: "#FFD100" }}
          >
            BURGERI & WRAPS
          </Link>
        </HStack>

        {/* Cart Section */}
        <HStack
          as={Link}
          href="/cos"
          spacing={2}
          _hover={{ textDecoration: "none" }}
        >
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
  );
}
