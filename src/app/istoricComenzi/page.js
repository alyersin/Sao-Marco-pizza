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
      p={8}
      maxW="800px"
      mx="auto"
      mt={10}
      borderRadius="md"
    >
      <Heading fontSize="lg" mb={6}>
        Cont personal | Istoric comenzi
      </Heading>

      {/* Tabs */}
      <HStack spacing={4} justifyContent="space-between" mb={4}>
        <ChakraLink
          as={NextLink}
          href="/profile"
          color="gray.500"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          DATE PERSONALE
        </ChakraLink>
        <Divider orientation="vertical" h="20px" bg="#FFD100" />
        <ChakraLink
          as={NextLink}
          href="/adrese-de-livrare"
          color="gray.500"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          ADRESE DE LIVRARE
        </ChakraLink>
        <Divider orientation="vertical" h="20px" bg="#FFD100" />
        <ChakraLink
          as={NextLink}
          href="/istoricComenzi"
          color="#FFD100"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>

      <Divider borderColor="#FFD100" mb={6} />

      {/* Order Details */}
      <VStack spacing={4} align="stretch">
        <Text fontSize="md" mb={4}>
          Poti sa vezi factura sau detaliile de comanda la fiecare din comenzile
          tale.
        </Text>

        <Table variant="unstyled" colorScheme="whiteAlpha">
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
      </VStack>
    </Box>
  );
}
