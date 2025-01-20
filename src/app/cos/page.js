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
  Heading,
  Stack,
} from "@chakra-ui/react";

import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FaTrash, FaMinus, FaPlus, FaPizzaSlice } from "react-icons/fa";
import { auth } from "../../lib/firebase";
import { useMediaQuery } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";

export default function Cos() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAltaAdresa, setShowAltaAdresa] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 992px)");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [showInputs, setShowInputs] = useState(false);

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
      alert("Checkout process initiated");
    } else {
      alert("You need to log in to checkout");
    }
  };

  const handleDeliveryOptionChange = (value) => {
    setDeliveryOption(value);
    if (value === "2") {
      setShowInputs(true);
    } else {
      setShowInputs(false);
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
    <Box maxW="1280px" mx="auto">
      <Box
        // className="BorderBlue"
        mx={{ base: 0, md: 12 }}
        my={{ base: 0, md: "80px" }}
        bg="#232323"
        color="white"
        px={{ base: 2, md: 4 }}
        py={{ base: 2, md: 3 }}
      >
        <Text
          fontWeight="bold"
          fontSize={{ base: "3xl", md: "2.5rem" }}
          textAlign="center"
          m={{ base: 4, md: 6 }}
        >
          COS CUMPARATURI
        </Text>

        <Divider borderColor="gray.400" />

        <Box
          // className="borderBlue"
          borderRadius="md"
          // height={{ base: "286px", md: "auto" }}
          mx={{ base: 2, md: 0 }}
          mb={{ base: 10, md: 6 }}
          pt={{ base: 0, md: 0 }}
        >
          {cart.map((item, index) => (
            <Box
              // className="borderRed"
              key={index}
              pt={{ base: 8, md: 10 }}
              pb={{ base: 5, md: 5 }}
              borderRadius="md"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
              justifyContent="space-between"
              gap={6}
              height={{ base: "100%", md: "auto" }}
              boxShadow="md"
              color="white"
            >
              {/* IMAGE NAME SIZE */}
              <HStack
                // className="borderBlue"
                spacing={{ base: 0, md: 8 }}
                alignItems="center"
                mb={{ base: 4, md: 0 }}
              >
                {/* DELETE ICON MOBILE */}
                <Link
                  display={{ base: "flex", md: "none" }}
                  onClick={() => handleRemoveItem(index)}
                  cursor="pointer"
                  alignSelf={{ base: "flex-start", md: "center" }}
                >
                  <Image
                    position="absolute"
                    src="../assets/delete.png"
                    alt="Delete"
                    boxSize="22px"
                    filter="contrast(0) invert(1)"
                  />
                </Link>

                <Image
                  className="borderBlue"
                  src={item.image}
                  alt={item.name}
                  p={0}
                  boxSize={{ base: "150px", md: "180px" }}
                  borderRadius="md"
                />
                <Flex
                  className="borderRed"
                  flexDirection={{ base: "column", md: "column" }}
                  gap={{ base: 12, md: 6 }}
                  align="start"
                  width="100%"
                  mx="auto"
                  spacing={10}
                >
                  <VStack align="start" spacing={0}>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "lg", md: "3xl" }}
                    >
                      {item.name}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Marime: {item.size.label}
                    </Text>
                  </VStack>

                  {/* ADAUGA BUTTONS */}
                  <Box
                    className="borderBlue"
                    display={{ base: "flex", md: "flex" }}
                    gap={{ base: 0, md: 16 }}
                  >
                    <Box
                      className="borderGreen"
                      display={{ base: "none", md: "flex" }}
                      flexDirection={{ base: "row", md: "row" }}
                      gap={{ base: 2, md: 3 }}
                      align="center"
                    >
                      <Button
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgColor="#999999"
                        color="white"
                        fontSize="0.95rem"
                        w="100%"
                        h="40px"
                        pl={4}
                        pr={0}
                        borderRadius="md"
                        variant="solid"
                        _hover={{ bg: "gray.600" }}
                      >
                        <Text fontWeight="bold">ADAUGA TOPPING</Text>

                        <Box
                          w="80px"
                          h="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          borderTopRightRadius="md"
                          borderBottomRightRadius="md"
                        >
                          <Image
                            src="../assets/arrow-right.svg"
                            alt="arrow"
                            boxSize="43px"
                            borderRadius="md"
                          />
                        </Box>
                      </Button>

                      <Button
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgColor="#999999"
                        color="white"
                        fontSize="0.95rem"
                        w="100%"
                        h="40px"
                        pl={4}
                        pr={0}
                        borderRadius="md"
                        variant="solid"
                        _hover={{ bg: "gray.600" }}
                      >
                        <Text fontWeight="bold">ADAUGA SOS</Text>

                        <Box
                          w="44px"
                          h="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          borderTopRightRadius="md"
                          borderBottomRightRadius="md"
                        >
                          <Image
                            src="../assets/arrow-right.svg"
                            alt="arrow"
                            boxSize="43px"
                            borderRadius="md"
                          />
                        </Box>
                      </Button>
                    </Box>

                    {/* QUANTITY PRICE */}
                    <HStack
                      className="borderGreen"
                      mx={{ base: "auto", md: 0 }}
                      mr={{ base: "16px", md: 0 }}
                      spacing={2}
                      align="center"
                    >
                      <HStack
                        className="borderRed"
                        bgColor="#707070"
                        borderRadius="md"
                        width={{ base: "auto", md: "140px" }}
                        height="100%"
                        spacing={2}
                        color="#B3B3B3"
                      >
                        {/* BUTON */}
                        <Button
                          size={{ base: "sm", md: "lg" }}
                          bg="inherit"
                          onClick={() => updateCartQuantity(index, -1)}
                          _hover={{ bg: "gray.600" }}
                        >
                          <Icon color="#B3B3B3" as={FaMinus} />
                        </Button>
                        <Text fontWeight="bold" fontSize="lg">
                          {item.quantity}
                        </Text>

                        {/* BUTON */}
                        <Button
                          size={{ base: "sm", md: "lg" }}
                          bg="inherit"
                          onClick={() => updateCartQuantity(index, 1)}
                          _hover={{ bg: "gray.600" }}
                        >
                          <Icon color="#B3B3B3" as={FaPlus} />
                        </Button>
                      </HStack>
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "1.7rem", md: "1.9rem" }}
                      >
                        {(
                          parseFloat(item.size.price) * (item.quantity || 1)
                        ).toFixed(2)}{" "}
                        <Text
                          as="span"
                          fontWeight="normal"
                          fontSize={{ base: "xs", md: "xl" }}
                        >
                          lei
                        </Text>
                      </Text>
                    </HStack>
                    {/* DELETE ICON */}
                    <Link
                      display={{ base: "none", md: "flex" }}
                      onClick={() => handleRemoveItem(index)}
                      cursor="pointer"
                      alignSelf={{ base: "flex-start", md: "center" }}
                    >
                      <Image
                        src="../assets/delete.png"
                        alt="Delete"
                        boxSize="30px"
                        filter="contrast(0) invert(1)"
                      />
                    </Link>
                  </Box>
                </Flex>
              </HStack>

              {/* ADAUGA BUTTONS MOBILE*/}
              <Box
                className="borderRed"
                display={{ base: "flex", md: "none" }}
                flexDirection={{ base: "row", md: "row" }}
                gap={{ base: 4, md: 3 }}
                pb={{ base: 0, md: 0 }}
                // pt={6}
                align="center"
              >
                <Button
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="#999999"
                  color="white"
                  fontSize="0.95rem"
                  w="100%"
                  h="40px"
                  pl={4}
                  pr={0}
                  borderRadius="md"
                  variant="solid"
                  _hover={{ bg: "gray.600" }}
                >
                  <Text fontWeight="bold">ADAUGA TOPPING</Text>

                  <Box
                    w="60px"
                    h="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderTopRightRadius="md"
                    borderBottomRightRadius="md"
                  >
                    <Image
                      src="../assets/arrow-right.svg"
                      alt="arrow"
                      boxSize="43px"
                      borderRadius="md"
                    />
                  </Box>
                </Button>

                <Button
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="#999999"
                  color="white"
                  fontSize="0.95rem"
                  w="100%"
                  h="40px"
                  pl={4}
                  pr={0}
                  borderRadius="md"
                  variant="solid"
                  _hover={{ bg: "gray.600" }}
                >
                  <Text fontWeight="bold">ADAUGA SOS</Text>

                  <Box
                    w="40px"
                    h="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderTopRightRadius="md"
                    borderBottomRightRadius="md"
                  >
                    <Image
                      src="../assets/arrow-right.svg"
                      alt="arrow"
                      boxSize="43px"
                      borderRadius="md"
                    />
                  </Box>
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* PROMO */}
        <Box
          // className="borderRed"
          bg="black"
          color="white"
          py={{ base: 5, md: "17px" }}
          px={5}
          mx={{ base: 2, md: 0 }}
          mt={{ base: 0, md: 10 }}
          fontSize="1.6rem"
        >
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={12}
            gap={{ base: 2, md: 0 }}
          >
            <Text fontSize={{ base: "lg", md: "1.8rem" }} textAlign="center">
              La 3 pizza marimea L beneficiezi de promotia
            </Text>
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight={"bold"}
              color={{ base: "#ff6633", md: "white" }}
            >
              3+1 Gratis.
            </Text>
            <Image
              src="../assets/pizza-box.svg"
              alt="Pizza"
              boxSize={{ base: "0", md: "28" }}
            />
          </Box>
        </Box>

        {/* CONTINUA DE AICI  */}
        {/* CONTINUA DE AICI  */}
        {/* CONTINUA DE AICI  */}
        {/* CONTINUA DE AICI  */}

        {/* PUNCTE */}
        <Flex
          mt={0}
          mx={{ base: 2, md: 0 }}
          // mb={14}
          // gap={8}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Flex
            className="borderRed"
            flexDirection={{ base: "column", lg: "column" }}
            flex={{ base: 0, md: 1 }}
            mx={{ base: 0, md: 0 }}
            spacing={6}
            align="stretch"
          >
            <Box
              className="borderBlue"
              height={{ base: "200px", md: "232px" }}
              borderBottom="2px solid gray"
              borderRight={{ base: "none", lg: "2px solid gray" }}
            >
              <Box
                mb="40px"
                pt={2}
                pb={{ base: 0, md: 40 }}
                pl={{ base: 0, md: 10 }}
                height={{ base: "auto", md: "100%" }}
              >
                <Text fontSize={{ base: "1.6rem", md: "1.7rem" }} mb={5}>
                  Foloseste punctele:
                </Text>
                <Text fontSize="16px" color="#B3B3B3" mb={4}>
                  * Aceasta functie momentan este indisponibila.
                </Text>
              </Box>
            </Box>

            {/* TOTAL VALOARE MOBILE*/}

            <Flex
              className="borderRed"
              display={{ base: "flex", md: "none" }}
              flexDirection="column"
              height="228px"
              borderBottom="2px solid gray"
              gap={3}
              padding={{ base: "10px 0", md: "10px 36px" }}
            >
              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.3rem", md: "1.2rem" }}>
                  Sub-total:
                </Text>
                <Text fontSize="lg">{calculateTotal()} lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.3rem", md: "1.2rem" }}>
                  Voucher:
                </Text>
                <Text fontSize="lg">0.00 lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.3rem", md: "1.2rem" }}>
                  Garantia SGR:
                </Text>
                <Text fontSize="lg">0 lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"} mt={3}>
                <Text fontWeight={"bold"} fontSize="1.7rem" color="#ff6633">
                  Total 1 produs
                </Text>
                <Text fontWeight={"bold"} fontSize="1.6rem" color="#ff6633">
                  {calculateTotal()} lei
                </Text>
              </HStack>
            </Flex>

            {/* VOUCHER */}
            <VStack
              className="borderGreen"
              borderRight={{ base: "none", md: "2px solid gray" }}
              height="100%"
              py={10}
              pl={{ base: 0, md: 12 }}
              pr={{ base: 0, md: 10 }}
              spacing={{ base: 6, md: 7 }}
              alignItems="left"
            >
              <VStack align="start" spacing={{ base: 6, md: 4 }}>
                <Text fontSize={{ base: "1.7rem", md: "1.6rem" }}>
                  Ai un voucher?
                </Text>
                <Text fontSize={{ base: "1rem", md: "16px" }}>
                  In cazul in care detii un voucher de reducere il poti
                  introduce in campul de mai jos. Se va aplica la totalul
                  comenzii.
                </Text>
              </VStack>

              <HStack spacing={2}>
                <Input
                  placeholder="Voucher"
                  bg="#707070"
                  color="white"
                  border="none"
                  height={{ base: "46px", md: "50px" }}
                  width={{ base: "auto", md: "auto" }}
                  sx={{
                    "::placeholder": {
                      color: "#B3B3B3",
                    },
                  }}
                />

                <Link
                  href="/"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="#999999"
                  color="#FFFFFF"
                  borderRadius="5px"
                  height={{ base: "46px", md: "50px" }}
                >
                  <Box
                    // className="borderRed"
                    display="flex"
                    textAlign="left"
                    alignItems="center"
                    pl={{ base: 12, md: 12 }}
                    variant="solid"
                    height={{ base: "46px", md: "50px" }}
                    fontSize={{ base: "0.8rem", md: "inherit" }}
                  >
                    APLICA
                  </Box>
                  <Image
                    className="borderBlue"
                    src="../assets/arrow-right.svg"
                    alt="arrow"
                    height={"100%"}
                    borderRadius="5px"
                  />
                </Link>
              </HStack>

              {/* METODA DE PLATA */}

              <Flex
                flexDirection="column"
                gap={{ base: 1, md: 3 }}
                mt={{ base: 8, md: 8 }}
              >
                <Text fontSize={{ base: "1.7rem", md: "1.6rem" }}>
                  Metoda de plata:
                </Text>
                <RadioGroup defaultValue="1">
                  <VStack align="start" spacing={{ base: 6, md: 5 }}>
                    <Radio
                      value="1"
                      sx={{
                        boxSize: "21px",
                        borderColor: "#ff6633",
                        borderWidth: "2px",
                        color: "transparent",
                        _checked: {
                          bg: "#ff6633",
                          borderColor: "#ff6633",
                        },
                        _focus: {
                          boxShadow: "none",
                        },
                      }}
                    >
                      Cash la livrare
                    </Radio>
                    <Radio
                      value="2"
                      sx={{
                        boxSize: "21px",
                        borderColor: "#ff6633",
                        borderWidth: "2px",
                        color: "transparent",
                        _checked: {
                          bg: "#ff6633",
                          borderColor: "#ff6633",
                        },
                        _focus: {
                          boxShadow: "none",
                        },
                      }}
                    >
                      Plata cu cardul la livrare
                    </Radio>
                    <Radio
                      value="3"
                      sx={{
                        boxSize: "21px",
                        borderColor: "#ff6633",
                        borderWidth: "2px",
                        color: "transparent",
                        _checked: {
                          bg: "#ff6633",
                          borderColor: "#ff6633",
                        },
                        _focus: {
                          boxShadow: "none",
                        },
                      }}
                    >
                      Plata online cu cardul
                    </Radio>
                  </VStack>
                </RadioGroup>
                <Text
                  fontSize={{ base: "16px", md: "16px" }}
                  mt={{ base: 3, md: 1 }}
                  color="#B3B3B3"
                >
                  * La metoda de plata cu cardul nu se percepe nici un comision
                  in plus indiferent de banca de care apartineti. Acceptam: Visa
                  si Mastercard.
                </Text>
                <Image
                  src="../assets/payment-methods.png"
                  alt="Credit card"
                  bgColor="white"
                  mt={{ base: 5, md: 3 }}
                ></Image>
              </Flex>
            </VStack>
          </Flex>

          {/* TOTAL VALOARE BIG SCREEN */}
          <VStack
            className="borderGreen"
            borderTop={{ base: "2px solid gray", md: "none" }}
            flex="1"
            align="stretch"
          >
            <Flex
              className="borderRed"
              display={{ base: "none", md: "flex" }}
              flexDirection="column"
              height={{ base: "228px", md: "232px" }}
              borderBottom="2px solid gray"
              gap={3}
              padding="10px 36px"
            >
              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.2rem", md: "1.4rem" }}>
                  Sub-total:
                </Text>
                <Text fontSize="lg">{calculateTotal()} lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.2rem", md: "1.4rem" }}>
                  Voucher:
                </Text>
                <Text fontSize="lg">0.00 lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text fontSize={{ base: "1.2rem", md: "1.4rem" }}>
                  Garantia SGR:
                </Text>
                <Text fontSize="lg">0 lei</Text>
              </HStack>

              <HStack justifyContent={"space-between"} mt={3}>
                <Text
                  fontWeight={"bold"}
                  fontSize={{ base: "1.4rem", md: "1.8rem" }}
                  color="#ff6633"
                >
                  Total 1 produs
                </Text>
                <Text fontWeight={"bold"} fontSize="1.6rem" color="#ff6633">
                  {calculateTotal()} lei
                </Text>
              </HStack>
            </Flex>

            {/* DATE LIVRARE */}

            <VStack
              className="borderBlue"
              align="left"
              py={{ base: "32px", md: "32px" }}
              pl={{ base: "0", md: "44px" }}
              pr={{ base: "0", md: "60px" }}
              spacing={{ base: 5, md: 5 }}
            >
              <Text fontSize={{ base: "1.7rem", md: "1.6rem" }}>
                Date de livrare:
              </Text>
              <Text fontSize={{ base: "16px", md: "16px" }} color="#B3B3B3">
                * Comanda minima pentru orasul Constanta este de 40 de lei iar
                pentru zonele rezidentiale si comunele limitrofe este de 100 de
                lei
              </Text>

              <RadioGroup
                onChange={(value) => {
                  setDeliveryOption(value);
                }}
                value={deliveryOption}
              >
                <Stack
                  direction="column"
                  pb={{ base: 2, md: 1 }}
                  spacing={{ base: 4, md: 6 }}
                >
                  <Radio
                    value="1"
                    onChange={() => setShowAltaAdresa(true)}
                    sx={{
                      boxSize: "21px",
                      bg: "#ff6633",
                      borderColor: "#ff6633",
                      borderWidth: "2px",
                      color: "transparent",
                      _checked: {
                        bg: "#ff6633",
                        borderColor: "#ff6633",
                      },
                      _focus: {
                        boxShadow: "none",
                      },
                    }}
                  >
                    Livrare la:
                  </Radio>

                  {showAltaAdresa && (
                    <Radio
                      pl={8}
                      value="account"
                      sx={{
                        boxSize: "21px",
                        borderColor: "#ff6633",
                        borderWidth: "2px",
                        color: "transparent",
                        _checked: {
                          bg: "#ff6633",
                          borderColor: "#ff6633",
                        },
                        _focus: {
                          boxShadow: "none",
                        },
                      }}
                    >
                      CONSTANTA, Pescarilor, 30, Bloc BM11, Scara E, ap 53,
                      Elite Beach
                    </Radio>
                  )}

                  {showAltaAdresa && (
                    <Radio
                      pl={8}
                      value="2"
                      sx={{
                        boxSize: "21px",
                        borderColor: "#ff6633",
                        borderWidth: "2px",
                        color: "transparent",
                        _checked: {
                          bg: "#ff6633",
                          borderColor: "#ff6633",
                        },
                        _focus: {
                          boxShadow: "none",
                        },
                      }}
                    >
                      Alta adresa
                    </Radio>
                  )}
                </Stack>
              </RadioGroup>

              {deliveryOption === "2" && (
                <VStack
                  mt={4}
                  mb={{ base: 0, md: 0 }}
                  spacing={{ base: "16px", md: "20px" }}
                >
                  <Input
                    placeholder="Cauta localitatea"
                    bg="#707070"
                    color="white"
                    height={{ base: "50px", md: "56px" }}
                    border="none"
                    sx={{
                      "::placeholder": {
                        color: "#B3B3B3",
                      },
                    }}
                  />
                  <Input
                    placeholder="Strada"
                    bg="#707070"
                    color="white"
                    height={{ base: "50px", md: "56px" }}
                    border="none"
                    sx={{
                      "::placeholder": {
                        color: "#B3B3B3",
                      },
                    }}
                  />
                  <Input
                    placeholder="Numarul strazii"
                    bg="#707070"
                    color="white"
                    height={{ base: "50px", md: "56px" }}
                    border="none"
                    sx={{
                      "::placeholder": {
                        color: "#B3B3B3",
                      },
                    }}
                  />
                  <Input
                    placeholder="Detalii (Bloc, Scara, Etaj, Apartament)"
                    bg="#707070"
                    color="white"
                    height={{ base: "50px", md: "56px" }}
                    border="none"
                    sx={{
                      "::placeholder": {
                        color: "#B3B3B3",
                      },
                    }}
                  />
                  <Input
                    placeholder="Repere"
                    bg="#707070"
                    color="white"
                    height={{ base: "50px", md: "56px" }}
                    border="none"
                    sx={{
                      "::placeholder": {
                        color: "#B3B3B3",
                      },
                    }}
                  />
                </VStack>
              )}

              <Textarea
                placeholder="Mesaj"
                height={{ base: "150px", md: "160px" }}
                bg="#707070"
                color="white"
                border="none"
                mb={{ base: 12, md: 14 }}
                sx={{
                  "::placeholder": {
                    color: "#B3B3B3",
                  },
                }}
              />
            </VStack>
          </VStack>
        </Flex>

        <Divider />

        <Stack
          className="borderRed"
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
          spacing={{ base: 5, md: 0 }}
          mt={10}
          mb={{ base: 4, md: 8 }}
          align="center"
        >
          <Link
            className="borderBlue"
            href="/"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgColor="#999999"
            color="#FFFFFF"
            borderRadius="5px"
            height={{ base: "50px", md: "54px" }}
            width={{ base: "410px", md: "410px" }}
          >
            <Image
              // className="borderRed"
              src="../assets/arrow-left.svg"
              alt="arrow"
              height={"100%"}
              borderRadius="5px"
              onClick={handleCheckout}
            />
            <Box
              className="borderBlue"
              display="flex"
              width={{ base: "auto", md: "auto" }}
              variant="solid"
              fontSize={{ base: "20px", md: "1rem" }}
              pr={{ base: 4, md: 4 }}
            >
              INAPOI
            </Box>
          </Link>

          <Link
            href="/"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgColor="#999999"
            color="#FFFFFF"
            borderRadius="5px"
            height={{ base: "50px", md: "54px" }}
            width={{ base: "410px", md: "410px" }}
          >
            <Box
              className="borderBlue"
              display="flex"
              width={{ base: "auto", md: "auto" }}
              variant="solid"
              fontSize={{ base: "20px", md: "1rem" }}
              pl={{ base: 4, md: 4 }}
            >
              TRIMITE COMANDA
            </Box>
            <Image
              className="borderRed"
              src="../assets/thumb-right.svg"
              alt="arrow"
              height={"100%"}
              borderRadius="5px"
              onClick={handleCheckout}
            />
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
