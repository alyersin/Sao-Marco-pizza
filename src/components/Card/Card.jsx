import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function Card({ item }) {
  const handleAddToCart = (size) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, { ...item, size }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // alert(`Added ${item.name} (${size.label}) to the cart!`);
  };

  return (
    <Box
      bg="black"
      color="white"
      borderRadius="md"
      overflow="hidden"
      width="250px"
      shadow="lg"
      p={4}
      mx="auto"
    >
      <Image src={item.image} alt={item.name} width="100%" borderRadius="md" />
      <VStack align="center" spacing={2} p={4}>
        <Text fontWeight="bold" fontSize="lg">
          {item.name}
        </Text>
        <Text fontSize="xs" align="center" color="gray.400" noOfLines={3}>
          {item.description}
        </Text>
      </VStack>
      <VStack spacing={2}>
        {item.sizes.map((size, index) => (
          <HStack
            key={index}
            justify="space-between"
            bg="gray.800"
            p={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            cursor="pointer"
            width="100%"
            onClick={() => handleAddToCart(size)}
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
      </VStack>
    </Box>
  );
}
