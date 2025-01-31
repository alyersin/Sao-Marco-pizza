"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Image,
  Input,
  Collapse,
  VStack,
  HStack,
} from "@chakra-ui/react";
import "../../app/globals.css";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function AdreseDeLivrare() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleAddressForm = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      className="borderBlue"
      display="flex"
      flexDirection={"column"}
      alignItems="left"
      justifyContent={"left"}
      alignContent={"left"}
      textAlign={"left"}
      bg="#232323"
      gap={14}
      color="white"
      mt={10}
      mb={{ base: 4, md: 6 }}
      borderRadius="md"
    >
      <Box>
        <Text
          className="borderRed"
          fontSize={"1.3rem"}
          width={"fit-content"}
          mb={6}
        >
          Adauga adrese de livrare.
        </Text>

        <Collapse in={isCollapsed} animateOpacity>
          <Box bg="black" px={10} py={9} borderRadius="md">
            <Text fontSize={"1.2rem"} width="fit-content" mb={12}>
              ADAUGA ADRESA
            </Text>
            <VStack
              className="borderRed"
              alignItems="flex-start"
              // width="full"
              spacing={4}
            >
              <HStack className="borderBlue" spacing={20} width="full">
                <Input
                  placeholder="Cauta localitatea"
                  sx={{ "::placeholder": { color: "#B3B3B3" } }}
                  bg="#707070"
                  color="white"
                  height="50px"
                />
                <Input
                  placeholder="Strada"
                  sx={{ "::placeholder": { color: "#B3B3B3" } }}
                  bg="#707070"
                  color="white"
                  height="50px"
                />
              </HStack>
              <HStack className="borderBlue" spacing={20} width="full">
                <Input
                  placeholder="Numarul strazii"
                  sx={{ "::placeholder": { color: "#B3B3B3" } }}
                  bg="#707070"
                  color="white"
                  height="50px"
                />
                <Input
                  placeholder="Detalii (Bloc, Scara, Etaj, Apartament)"
                  sx={{ "::placeholder": { color: "#B3B3B3" } }}
                  bg="#707070"
                  color="white"
                  height="50px"
                />
              </HStack>
              <VStack className="borderBlue" spacing={3} width="auto" mb={2}>
                <Input
                  placeholder="Repere"
                  sx={{ "::placeholder": { color: "#B3B3B3" } }}
                  bg="#707070"
                  height="50px"
                  color="white"
                  width={"392px"}
                />

                <Link
                  href="#"
                  _hover={{ textDecoration: "none" }}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="#999999"
                  color="#FFFFFF"
                  borderRadius="5px"
                  mt={{ base: 8, md: 0 }}
                  height="54px"
                  width="100%"
                  onClick={() => alert("Adresa salvata!")}
                >
                  <Box
                    display="flex"
                    textAlign="left"
                    alignItems="center"
                    pl={{ base: 5, md: 5 }}
                    fontSize={{ base: "1rem", md: "inherit" }}
                    fontWeight="bold"
                  >
                    SALVEAZA ADRESA
                  </Box>
                  <Image
                    src="../assets/arrow-right.svg"
                    alt="arrow"
                    height="100%"
                    borderRadius="5px"
                  />
                </Link>
              </VStack>
            </VStack>
          </Box>
        </Collapse>
      </Box>

      <Link
        href="#"
        _hover={{ textDecoration: "none" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="#999999"
        color="#FFFFFF"
        borderRadius="5px"
        mt={{ base: 8, md: 0 }}
        height="54px"
        width="32%"
        onClick={toggleAddressForm}
      >
        <Box
          display="flex"
          textAlign="left"
          alignItems="center"
          pl={{ base: 5, md: 5 }}
          fontSize={{ base: "1rem", md: "inherit" }}
          fontWeight="bold"
        >
          {isCollapsed ? "ANULEAZA" : "ADAUGA ADRESA"}
        </Box>
        <Image
          src="../assets/arrow-right.svg"
          alt="arrow"
          height="100%"
          borderRadius="5px"
        />
      </Link>
    </Box>
  );
}
