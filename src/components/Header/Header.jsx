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
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useMediaQuery } from "@chakra-ui/react";
import LoginRegister from "../LoginRegister/LoginRegister.jsx";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 992px)");

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
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="20px"
                  height="20px"
                  bg="white"
                  color="red.500"
                  borderRadius="full"
                  fontWeight="bold"
                >
                  0
                </Box>
              </Link>
              <Link href="/cos">
                <Icon as={FaShoppingCart} boxSize={5} color="white" />
              </Link>
            </HStack>
          </Flex>

          <Box
            className="borderGreen"
            bg="black"
            py={2}
            px={4}
            overflow="hidden"
          >
            <Swiper
              className="borderRed"
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
                  className="borderGreen"
                  key={item.href}
                  style={{ width: "auto" }}
                >
                  <Link href={item.href}>
                    <Text
                      fontWeight="bold"
                      color="white"
                      _hover={{ color: "#FFD100" }}
                      margin={"auto"}
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
            letterSpacing={-1}
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
                <Text fontWeight="bold" _hover={{ color: "#FFD100" }}>
                  {item.label}
                </Text>
              </Link>
            ))}
          </HStack>

          <HStack spacing={2} paddingRight={{ base: 2, lg: 12 }}>
            <Link href="/cos">
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
                0
              </Box>
            </Link>
            <Link href="/cos">
              <HStack spacing={1}>
                <Icon as={FaShoppingCart} color="red.500" boxSize={6} />
                <Text fontWeight="bold" fontSize="sm" color="white">
                  0.00 lei
                </Text>
              </HStack>
            </Link>
          </HStack>
        </Box>
      )}

      {/* Login Modal */}
      <LoginRegister isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
