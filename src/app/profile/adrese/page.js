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

export default function Adrese() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const toggleAddressForm = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  return (
    <Box bg="black" color="white" p={6} borderRadius="md">
      <Heading size="md" mb={4}>
        Cont personal | Date personale
      </Heading>

      <HStack spacing={8} mb={4}>
        <Heading
          size="sm"
          color="gray.300"
          borderBottom="2px solid"
          borderColor="yellow.400"
        >
          DATE PERSONALE
        </Heading>
        <Heading size="sm" color="yellow.400">
          ADRESE DE LIVRARE
        </Heading>
        <Heading size="sm" color="gray.300">
          ISTORIC COMENZI
        </Heading>
      </HStack>

      <Heading size="sm" mb={4}>
        {isAddingAddress ? "ADAUGA ADRESA" : "Adauga adrese de livrare."}
      </Heading>

      <Collapse in={isAddingAddress} animateOpacity>
        <Box bg="gray.800" p={6} borderRadius="md" mb={4}>
          <VStack spacing={4}>
            <HStack spacing={4} width="full">
              <Input placeholder="CONSTANTA" bg="gray.700" color="white" />
              <Input placeholder="Pescarilor" bg="gray.700" color="white" />
            </HStack>
            <HStack spacing={4} width="full">
              <Input
                placeholder="Numarul strazii"
                bg="gray.700"
                color="white"
              />
              <Input placeholder="Bloc" bg="gray.700" color="white" />
            </HStack>
            <Input placeholder="Repere" bg="gray.700" color="white" />
            <Button
              colorScheme="gray"
              bg="gray.600"
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
        rightIcon={<ChevronRightIcon />}
        _hover={{ bg: "gray.500" }}
        onClick={toggleAddressForm}
      >
        {isAddingAddress ? "ANULEAZA" : "ADAUGA ADRESA"}
      </Button>
    </Box>
  );
}
