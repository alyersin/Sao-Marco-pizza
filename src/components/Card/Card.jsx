import React from "react";
import { Box, Image, Text, VStack, HStack, Icon } from "@chakra-ui/react";
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
      bg="#232323"
      color="white"
      borderRadius="md"
      overflow="hidden"
      width={{ base: "100%", md: "250px" }}
      shadow="lg"
      p={4}
      mx="auto"
    >
      <Box display="flex" justifyContent="center">
        <Image
          src={item.image}
          alt={item.name}
          width={{ base: "66%", md: "100%" }}
          borderRadius="md"
        />
      </Box>
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
            className="borderRed"
            key={index}
            justify="space-between"
            align="center"
            bgColor="#999999"
            pl={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            cursor="pointer"
            height="58px"
            width="100%"
            onClick={() => handleAddToCart(size)}
          >
            <Box>
              <Text fontSize="md" fontWeight="800" color="black">
                {size.label}
              </Text>
              {size.description && (
                <Text fontSize="xs" color="gray.500">
                  {size.description}
                </Text>
              )}
            </Box>
            <HStack spacing={2}>
              <Text fontWeight="bold" fontSize="2xl">
                {size.price}
              </Text>
            </HStack>
            <Image
              borderRadius="10px"
              src="../assets/thumb-right.svg"
              alt="arrow"
              boxSize="66px"
              ml="4px"
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

// maxW="440px"
//       width="100%"
