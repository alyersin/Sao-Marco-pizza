"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Collapse,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function AdreseDeLivrare() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const toggleAddressForm = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  return (
    <Box
      bg="#232323"
      color="white"
      px={{ base: 4, md: 10 }}
      py={{ base: 4, md: 9 }}
      maxW="1024px"
      mx="auto"
      mt={{ base: 0, md: 20 }}
      mb={{ base: 4, md: 20 }}
      borderRadius="md"
    >
      <Heading size="sm" mb={4}>
        {isAddingAddress ? "ADAUGA ADRESA" : "Adauga adrese de livrare."}
      </Heading>

      <Collapse in={isAddingAddress} animateOpacity>
        <Box bg="black" p={6} borderRadius="md" mb={4}>
          <VStack spacing={4}>
            <HStack spacing={4} width="full">
              <Input
                placeholder="Cauta localitatea"
                sx={{ "::placeholder": { color: "#B3B3B3" } }}
                bg="#707070"
                color="white"
              />
              <Input
                placeholder="Strada"
                sx={{ "::placeholder": { color: "#B3B3B3" } }}
                bg="#707070"
                color="white"
              />
            </HStack>
            <HStack spacing={4} width="full">
              <Input
                placeholder="Numarul strazii"
                sx={{ "::placeholder": { color: "#B3B3B3" } }}
                bg="#707070"
                color="white"
              />
              <Input
                placeholder="Detalii (Bloc, Scara, Etaj, Apartament)"
                sx={{ "::placeholder": { color: "#B3B3B3" } }}
                bg="#707070"
                color="white"
              />
            </HStack>
            <Input
              placeholder="Repere"
              sx={{ "::placeholder": { color: "#B3B3B3" } }}
              bg="#707070"
              color="white"
            />
            <Button
              colorScheme="gray"
              bg="#707070"
              color="white"
              rightIcon={<ChevronRightIcon />}
              _hover={{ bg: "gray.500" }}
              onClick={() => alert("Adresa salvata!")}
            >
              SALVEAZA ADRESA
            </Button>
          </VStack>
        </Box>
      </Collapse>

      <Button
        colorScheme="gray"
        bg="gray.600"
        color="white"
        rightIcon={<ChevronRightIcon />}
        _hover={{ bg: "gray.500" }}
        onClick={toggleAddressForm}
      >
        {isAddingAddress ? "ANULEAZA" : "ADAUGA ADRESA"}
      </Button>
    </Box>
  );
}
