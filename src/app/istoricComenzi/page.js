"use client";

import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  VStack,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function page() {
  const orders = [
    {
      id: "12345",
      date: "2025-01-11",
      status: "Livrat",
      total: "120.50 lei",
    },
    {
      id: "67890",
      date: "2025-01-05",
      status: "În procesare",
      total: "85.00 lei",
    },
  ];

  return (
    <Box
      bg="black"
      color="white"
      p={{ base: 4, md: 8 }}
      maxW="800px"
      mx="auto"
      mt={{ base: 4, md: 10 }}
      borderRadius="md"
    >
      <Heading fontSize={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>
        Cont personal | Istoric comenzi
      </Heading>

      {/* Tabs */}
      <HStack
        spacing={{ base: 2, md: 4 }}
        justifyContent="space-between"
        mb={{ base: 4, md: 6 }}
        flexWrap="wrap"
      >
        <ChakraLink
          as={NextLink}
          href="/profile"
          color="gray.500"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
          textDecoration="none"
        >
          DATE PERSONALE
        </ChakraLink>
        <Divider
          orientation="vertical"
          h={{ base: "10px", md: "20px" }}
          bg="#FFD100"
          display={{ base: "none", md: "block" }}
        />
        <ChakraLink
          as={NextLink}
          href="/adrese-de-livrare"
          color="gray.500"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
          textDecoration="none"
        >
          ADRESE DE LIVRARE
        </ChakraLink>
        <Divider
          orientation="vertical"
          h={{ base: "10px", md: "20px" }}
          bg="#FFD100"
          display={{ base: "none", md: "block" }}
        />
        <ChakraLink
          as={NextLink}
          href="/istoricComenzi"
          color="#FFD100"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
          textDecoration="none"
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>

      <Divider borderColor="#FFD100" mb={{ base: 4, md: 6 }} />

      {/* Order Details */}
      <VStack spacing={4} align="stretch">
        <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 2, md: 4 }}>
          Poti sa vezi factura sau detaliile de comanda la fiecare din comenzile
          tale.
        </Text>

        <Box overflowX="auto">
          <Table variant="unstyled" colorScheme="whiteAlpha" size="sm">
            <Thead>
              <Tr>
                <Th fontWeight="bold" color="#FFD100">
                  Comanda ID
                </Th>
                <Th fontWeight="bold" color="#FFD100">
                  Data
                </Th>
                <Th fontWeight="bold" color="#FFD100">
                  Starea comenzii
                </Th>
                <Th fontWeight="bold" color="#FFD100">
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.status}</Td>
                  <Td>{order.total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}
