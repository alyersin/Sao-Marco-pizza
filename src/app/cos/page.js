"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  RadioGroup,
  Radio,
  Divider,
  Textarea,
  Flex,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaPizzaSlice, FaTrash } from "react-icons/fa";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Cos() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      alert("Checkout process initiated!");
    } else {
      alert("You need to log in to proceed to checkout!");
    }
  };

  return (
    <Box
      maxW="1280px"
      margin="80px auto"
      bg="#232323"
      color="white"
      p={8}
      shadow="lg"
    >
      <Text fontWeight="bold" fontSize="3xl" textAlign="center" mb={6}>
        COS CUMPARATURI
      </Text>

      <Box
        bg="black"
        color="yellow.400"
        p={4}
        textAlign="center"
        fontWeight="bold"
      >
        <HStack justify="center" spacing={4}>
          <Text>La 3 pizza marimea L beneficiezi de promotia</Text>
          <Text fontSize="2xl">3+1 Gratis.</Text>
          <Icon as={FaPizzaSlice} boxSize={6} />
        </HStack>
      </Box>

      <Flex mt={6} gap={8} flexDirection={{ base: "column", lg: "row" }}>
        {/* Left Section: Cart Items */}
        <VStack flex="1" p={6} spacing={6} align="stretch">
          <Box>
            <Text fontWeight="bold" mb={2}>
              Produse adaugate:
            </Text>
            {cart.length === 0 ? (
              <Text color="gray.400">Cosul tau este gol.</Text>
            ) : (
              cart.map((item, index) => (
                <Box
                  key={index}
                  bg="gray.800"
                  p={4}
                  borderRadius="md"
                  shadow="md"
                  mb={4}
                >
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{item.size.label}</Text>
                    <Text>{item.size.price} lei</Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleRemoveItem(index)}
                      leftIcon={<Icon as={FaTrash} />}
                    >
                      Sterge
                    </Button>
                  </HStack>
                </Box>
              ))
            )}
          </Box>
          <Divider borderColor="gray.600" />
          <Box>
            <Text fontWeight="bold" mb={2}>
              Foloseste punctele:
            </Text>
            <Text fontSize="sm" color="gray.400">
              Aceasta functie momentan este indisponibila.
            </Text>
          </Box>

          <Divider borderColor="gray.600" />

          <Box>
            <Text fontWeight="bold" mb={2}>
              Ai un voucher?
            </Text>
            <Text fontSize="sm" color="gray.400" mb={4}>
              In cazul in care detii un voucher de reducere il poti introduce in
              campul de mai jos. Se va aplica la totalul comenzii.
            </Text>
            <HStack spacing={2}>
              <Input placeholder="Voucher" bg="#707070" color="white" />
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="yellow"
                variant="solid"
              >
                APLICA
              </Button>
            </HStack>
          </Box>

          <Divider borderColor="gray.600" />

          <Box>
            <Text fontWeight="bold" mb={2}>
              Metoda de plata:
            </Text>
            <RadioGroup>
              <VStack align="start" spacing={3}>
                <Radio value="cash">Cash la livrare</Radio>
                <Radio value="card-on-delivery">
                  Plata cu cardul la livrare
                </Radio>
                <Radio value="online-card">Plata online cu cardul</Radio>
              </VStack>
            </RadioGroup>
            <Text fontSize="sm" color="gray.400" mt={4}>
              * La metoda de plata cu cardul nu se percepe nici un comision in
              plus indiferent de banca de care apartineti. Acceptam: Visa si
              Mastercard.
            </Text>
          </Box>
        </VStack>

        {/* Right Section: Summary and Payment */}
        <VStack flex="1" p={6} spacing={6} align="stretch">
          <Box>
            <Text fontWeight="bold" mb={2}>
              Sub-total:
            </Text>
            <Text fontSize="sm">
              {cart
                .reduce((total, item) => total + parseFloat(item.size.price), 0)
                .toFixed(2)}{" "}
              lei
            </Text>
            <Text fontWeight="bold" mt={2}>
              Voucher:
            </Text>
            <Text fontSize="sm">0.00 lei</Text>
            <Text fontWeight="bold" mt={2}>
              Garantia SGR:
            </Text>
            <Text fontSize="sm">0.00 lei</Text>
            <Divider borderColor="gray.600" my={4} />
            <Text fontWeight="bold" fontSize="lg" color="yellow.400">
              Total {cart.length} produse
            </Text>
            <Text fontWeight="bold" fontSize="2xl" color="yellow.400">
              {cart
                .reduce((total, item) => total + parseFloat(item.size.price), 0)
                .toFixed(2)}{" "}
              lei
            </Text>
          </Box>

          <Divider borderColor="gray.600" />

          <Box>
            <Text fontWeight="bold" mb={2}>
              Date de livrare:
            </Text>
            <Text fontSize="sm" color="gray.400" mb={2}>
              * Comanda minima pentru orasul Constanta este de 40 de lei iar
              pentru zonele rezidentiale si comunele limitrofe este de 100 de
              lei
            </Text>
            <RadioGroup>
              <Radio value="delivery">Livrare la</Radio>
            </RadioGroup>
            <Textarea
              placeholder="Mesaj"
              bg="#707070"
              color="white"
              mt={4}
              borderRadius="md"
            />
          </Box>
        </VStack>
      </Flex>

      <HStack justify="space-between" mt={6}>
        <Button
          leftIcon={<ChevronRightIcon />}
          colorScheme="gray"
          variant="solid"
        >
          INAPOI
        </Button>
        <Tooltip label="Login to checkout" isDisabled={isLoggedIn}>
          <Button
            rightIcon={<ChevronRightIcon />}
            colorScheme="yellow"
            variant="solid"
            onClick={handleCheckout}
            isDisabled={!isLoggedIn}
          >
            TRIMITE COMANDA
          </Button>
        </Tooltip>
      </HStack>
    </Box>
  );
}
