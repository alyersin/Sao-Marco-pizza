"use client";

import React, { useState, useEffect } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
      onClick={scrollToTop}
      cursor="pointer"
      display={isVisible ? "flex" : "none"}
      justifyContent="center"
      alignItems="center"
      width="50px"
      height="50px"
      bg="black"
      color="white"
      borderRadius="md"
      shadow="md"
      _hover={{ bg: "gray.700" }}
    >
      <Icon as={FaArrowUp} boxSize={6} />
    </Box>
  );
}
