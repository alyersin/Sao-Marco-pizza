import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Tag,
  Icon,
  color,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import "../../app/globals.css";

export default function Card({ item }) {
  return (
    <Box
      bg="black"
      color="white"
      borderRadius="md"
      overflow="hidden"
      width="250px"
      shadow="lg"
      p={4}
      margin="auto"
      position="relative"
    >
      {/* Image Section */}
      <Box position="relative">
        <Image
          src={item.image}
          alt={item.name}
          width="100%"
          borderRadius="md"
        />
        <Icon
          viewBox="0 0 200 200"
          position="absolute"
          top={2}
          right={2}
          color="white"
          boxSize={6}
        >
          <path d="M100 10c50 0 90 40 90 90s-40 90-90 90-90-40-90-90 40-90 90-90z" />
        </Icon>
      </Box>

      {/* Content Section */}
      <VStack align="center" spacing={2} p={4}>
        <Text fontWeight="bold" fontSize="lg">
          {item.name}
        </Text>

        {item.type && (
          <Text
            fontWeight="bold"
            fontSize="sm"
            color={
              item.type === "Picant"
                ? "red.500"
                : item.type === "Nou"
                ? "yellow.400"
                : item.type === "De Post"
                ? "green.500"
                : "white"
            }
          >
            {item.type}
          </Text>
        )}

        <Text fontSize="xs" align="center" color="gray.400">
          {item.description}
        </Text>
      </VStack>

      {/* Sizes and Prices Section */}
      {item.sizes.map((size, index) => (
        <HStack
          key={index}
          justify="space-between"
          bg="gray.800"
          p={2}
          mt={2}
          borderRadius="md"
        >
          <Text fontSize="sm">{size.label}</Text>
          <HStack>
            <Text fontWeight="bold" fontSize="sm">
              {size.price}
            </Text>
            <Icon as={FaShoppingCart} color="yellow.400" />
          </HStack>
        </HStack>
      ))}

      {/* Button Section */}
      <Button
        mt={4}
        width="100%"
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
        leftIcon={<Icon as={FaShoppingCart} />}
      >
        {item.buttonLabel}
      </Button>
    </Box>
  );
}
