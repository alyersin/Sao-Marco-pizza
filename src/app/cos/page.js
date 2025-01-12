"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Image,
  Divider,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaTrash, FaMinus, FaPlus, FaPizzaSlice } from "react-icons/fa";
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

  const updateCartQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(
      1,
      updatedCart[index].quantity + quantity
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.size.price) * item.quantity,
        0
      )
      .toFixed(2);
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

      <Box bg="gray.900" p={4} borderRadius="md" shadow="md" mb={6}>
        <Text fontWeight="bold" fontSize="lg" mb={4}>
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
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack>
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="50px"
                  borderRadius="md"
                />
                <VStack align="start" spacing={0} ml={3}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="sm">{item.size.label}</Text>
                </VStack>
              </HStack>
              <HStack spacing={4}>
                <HStack spacing={1}>
                  <Button
                    size="xs"
                    bg="gray.700"
                    onClick={() => updateCartQuantity(index, -1)}
                  >
                    <Icon as={FaMinus} />
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button
                    size="xs"
                    bg="gray.700"
                    onClick={() => updateCartQuantity(index, 1)}
                  >
                    <Icon as={FaPlus} />
                  </Button>
                </HStack>
                <Text>{(item.size.price * item.quantity).toFixed(2)} lei</Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Icon as={FaTrash} />
                </Button>
              </HStack>
            </Box>
          ))
        )}
      </Box>

      <Box
        bg="black"
        color="yellow.400"
        p={4}
        textAlign="center"
        fontWeight="bold"
        borderRadius="md"
        shadow="md"
        mb={6}
      >
        <HStack justify="center" spacing={4}>
          <Text>La 3 pizza marimea L beneficiezi de promotia</Text>
          <Text fontSize="2xl">3+1 Gratis.</Text>
          <Icon as={FaPizzaSlice} boxSize={6} />
        </HStack>
      </Box>

      <Flex mt={6} gap={8} flexDirection={{ base: "column", lg: "row" }}>
        <VStack flex="1" p={6} spacing={6} align="stretch">
          <Divider borderColor="gray.600" />
          <Box>
            <Text fontWeight="bold" mb={2}>
              Sub-total:
            </Text>
            <Text>{calculateTotal()} lei</Text>
          </Box>
        </VStack>

        <VStack flex="1" p={6} spacing={6} align="stretch">
          <Button
            rightIcon={<ChevronRightIcon />}
            colorScheme="yellow"
            variant="solid"
            onClick={handleCheckout}
          >
            TRIMITE COMANDA
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
}
