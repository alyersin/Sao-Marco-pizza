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
import "../../app/globals.css";

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
        <VStack className="borderGreen" align="stretch" spacing={0}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={3}
          >
            <Icon
              className="borderGreen"
              as={BsGridFill}
              boxSize={8}
              color="red.500"
              onClick={onOpen}
              cursor="pointer"
            />

            <Box>
              <Link href="/">
                <Image
                  className="borderGreen"
                  src="../assets/sao-marco-pizza.svg"
                  alt="Logo"
                  height="94px"
                  objectFit="contain"
                />
              </Link>
            </Box>

            <HStack className="borderGreen" spacing={2} position="relative">
              <Link href="/cos">
                <Box position="relative" cursor="pointer">
                  <Icon as={FaShoppingCart} boxSize={8} color="#E3051B" />
                  <Box
                    position="absolute"
                    top="-5px"
                    right="-6px"
                    width="22px"
                    height="22px"
                    bg="#E3E3E3"
                    color="black"
                    borderRadius="full"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                  >
                    {cart.length}
                  </Box>
                </Box>
              </Link>
            </HStack>
          </Flex>

          {/* NAV MENU (MOBILE) */}
          <Box
            className="borderGreen"
            bg="black"
            py={{ base: 4, md: 2 }}
            px={4}
            overflow="hidden"
          >
            <Swiper
              className="borderGreen"
              spaceBetween={16}
              slidesPerView={2.5}
              freeMode={true}
              grabCursor={true}
              centeredSlides={false}
              style={{ padding: "0 6px", width: "100%", letterSpacing: "-1px" }}
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
                <SwiperSlide
                  className="borderRed"
                  key={item.href}
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Link href={item.href}>
                    <Text
                      fontWeight="bold"
                      fontFamily="'Mongoose', sans-serif"
                      color="white"
                      _hover={{ color: "#FFD100" }}
                      textAlign="center"
                    >
                      {item.label}
                    </Text>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
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

          <Link href="/cos">
            <HStack
              className="borderRed"
              spacing={2}
              paddingRight={{ base: 2, lg: 12 }}
              position="relative"
              cursor="pointer"
            >
              <Box position="relative">
                <Icon as={FaShoppingCart} color="#E3051B" boxSize={8} />
                <Box
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  width="20px"
                  height="20px"
                  bg="#E3E3E3"
                  color="black"
                  borderRadius="full"
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  {cart.length}
                </Box>
              </Box>
              <Text color="white" fontWeight="bold">
                {totalAmount} lei
              </Text>
            </HStack>
          </Link>
        </Box>
      )}

      <LoginRegister isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
