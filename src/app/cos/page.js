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
  Link,
  Input,
  RadioGroup,
  Radio,
  Textarea,
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
    const updatedCart = storedCart.map((item) => ({
      ...item,
      size: {
        ...item.size,
        price: parseFloat(item.size.price) || 0,
      },
      quantity: item.quantity || 1,
    }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  const updateCartQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(
      1,
      (updatedCart[index].quantity || 1) + quantity
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
        (total, item) =>
          total + parseFloat(item.size.price) * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  return (
    <Box maxW="1280px" margin="80px auto" bg="#232323" color="white" p={8}>
      <Text fontWeight="bold" fontSize="3xl" textAlign="center" mb={6}>
        COS CUMPARATURI
      </Text>

      {/* Products Section */}
      <Box className="borderRed" p={4} borderRadius="md" mb={6}>
        <Text fontWeight="bold" fontSize="lg" mb={4}>
          Produse adaugate:
        </Text>
        {cart.length === 0 ? (
          <Text color="gray.400">Cosul tau este gol.</Text>
        ) : (
          cart.map((item, index) => (
            <Box
              className="borderGreen"
              key={index}
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
                  boxSize="120px"
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
                <Text>
                  {(parseFloat(item.size.price) * (item.quantity || 1)).toFixed(
                    2
                  )}{" "}
                  lei
                </Text>
                <Link onClick={() => handleRemoveItem(index)} cursor="pointer">
                  <Image
                    src="../assets/delete.png"
                    alt="Delete"
                    boxSize="30px"
                    filter="contrast(0) invert(1)"
                  />
                </Link>
              </HStack>
            </Box>
          ))
        )}
      </Box>

      {/* Promo Section */}
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

      {/* Form Section */}
      <Flex mt={6} gap={8} flexDirection={{ base: "column", lg: "row" }}>
        {/* Voucher and Payment Method */}
        <VStack flex="1" p={6} spacing={6} align="stretch">
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

          <Box>
            <Text fontWeight="bold" mb={2}>
              Metoda de plata:
            </Text>
            <RadioGroup defaultValue="1">
              <VStack align="start">
                <Radio value="1">Cash la livrare</Radio>
                <Radio value="2">Plata cu cardul la livrare</Radio>
                <Radio value="3">Plata online cu cardul</Radio>
              </VStack>
            </RadioGroup>
            <Text fontSize="xs" mt={4} color="gray.400">
              * La metoda de plata cu cardul nu se percepe nici un comision in
              plus indiferent de banca de care apartineti. Acceptam: Visa si
              Mastercard.
            </Text>
          </Box>
        </VStack>

        {/* Delivery Details and Order Summary */}
        <VStack flex="1" p={6} spacing={6} align="stretch">
          <Box>
            <Text fontWeight="bold" mb={2}>
              Date de livrare:
            </Text>
            <Radio value="1">Livrare la:</Radio>
            <Textarea
              placeholder="Mesaj"
              bg="gray.700"
              color="white"
              resize="none"
            />
          </Box>

          <Divider borderColor="gray.600" />

          <Box>
            <Text fontWeight="bold" mb={2}>
              Sub-total:
            </Text>
            <Text fontSize="lg">{calculateTotal()} lei</Text>
          </Box>

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
