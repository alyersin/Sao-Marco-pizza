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
import "../../app/globals.css";

export default function Card({ item, isDisabled = false }) {
  return (
    <Box
      className="borderRed"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="black"
      color="white"
      borderRadius="md"
      overflow="hidden"
      width="250px"
      height="560px"
      shadow="lg"
      p={4}
      margin="auto"
      position="relative"
    >
      <Box position="relative" flexShrink={0} textAlign="center">
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

      <VStack align="center" spacing={2} p={4} flexGrow={1}>
        <Text fontWeight="bold" fontSize="lg">
          {item.name}
        </Text>

        {item.type && (
          <Text
            fontWeight="bold"
            fontSize="sm"
            color={
              item.type === "Picant"
                ? "#BD0000"
                : item.type === "Nou"
                ? "#FFD100"
                : item.type === "De Post"
                ? "#83D35F"
                : "white"
            }
          >
            {item.type}
          </Text>
        )}

        <Text fontSize="xs" align="center" color="gray.400" noOfLines={3}>
          {item.description}
        </Text>
      </VStack>

      <VStack spacing={2} flexShrink={0} py={2}>
        {item.sizes.map((size, index) => (
          <HStack
            as="a"
            href="/cart"
            key={index}
            justify="space-between"
            bg="gray.800"
            p={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            cursor="pointer"
            width="100%"
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

      <Button
        mt="auto"
        width="100%"
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
        leftIcon={<Icon as={FaShoppingCart} />}
        isDisabled={isDisabled}
      >
        {item.buttonLabel}
      </Button>
    </Box>
  );
}
