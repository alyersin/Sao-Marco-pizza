"use client";

import {
  Box,
  Image,
  HStack,
  Text,
  Icon,
  VStack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useMediaQuery } from "@chakra-ui/react";
import LoginRegister from "../LoginRegister/LoginRegister.jsx";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 992px)");
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const total = storedCart.reduce(
      (sum, item) => sum + parseFloat(item.size.price),
      0
    );
    setTotalAmount(total.toFixed(2));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);

      const total = storedCart.reduce(
        (sum, item) => sum + parseFloat(item.size.price),
        0
      );
      setTotalAmount(total.toFixed(2));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Box
      position={isSmallScreen ? "static" : "sticky"}
      top="0"
      zIndex="2"
      bg="black"
      boxShadow="md"
    >
      {isSmallScreen ? (
        <VStack align="stretch" spacing={0}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={3}
          >
            <Icon
              as={BsGridFill}
              boxSize={6}
              color="red.500"
              onClick={onOpen}
              cursor="pointer"
            />

            <Box>
              <Link href="/">
                <Image
                  src="/assets/logo.jpg"
                  alt="Logo"
                  height="50px"
                  objectFit="contain"
                />
              </Link>
            </Box>

            <HStack spacing={2}>
              <Link href="/cos">
                <HStack>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="25px"
                    height="25px"
                    bg="white"
                    color="red.500"
                    borderRadius="full"
                    fontWeight="bold"
                  >
                    {cart.length}
                  </Box>
                  <Text color="white" fontWeight="bold">
                    {totalAmount} lei
                  </Text>
                </HStack>
              </Link>
              <Link href="/cos">
                <Icon as={FaShoppingCart} boxSize={5} color="white" />
              </Link>
            </HStack>
          </Flex>
        </VStack>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mx="auto"
          bg="#828282"
        >
          <Box width={{ base: "150px", md: "150px" }} height="auto">
            <Link href="/">
              <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width="100%"
                height="120px"
                objectFit="cover"
              />
            </Link>
          </Box>

          <HStack
            spacing={4}
            divider={<Box height="20px" width="1px" bg="black" />}
          >
            {[
              { href: "/pizza", label: "PIZZA" },
              { href: "/paste", label: "PASTE" },
              { href: "/salate", label: "SALATE" },
              { href: "/sandwichuri", label: "SANDWICHURI" },
              { href: "/deserturi", label: "DESERTURI" },
              { href: "/bauturi", label: "BAUTURI" },
              { href: "/burgerAndWraps", label: "BURGERI & WRAPS" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Text
                  fontWeight="bold"
                  fontFamily="'Mongoose', sans-serif"
                  _hover={{ color: "#FFD100" }}
                  letterSpacing="-1px"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </HStack>

          <HStack spacing={2} paddingRight={{ base: 2, lg: 12 }}>
            <Link href="/cos">
              <HStack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="25px"
                  height="25px"
                  bg="white"
                  color="red.500"
                  borderRadius="full"
                  fontWeight="bold"
                >
                  {cart.length}
                </Box>
                <Text color="white" fontWeight="bold">
                  {totalAmount} lei
                </Text>
              </HStack>
            </Link>
            <Link href="/cos">
              <Icon as={FaShoppingCart} color="red.500" boxSize={6} />
            </Link>
          </HStack>
        </Box>
      )}

      <LoginRegister isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
