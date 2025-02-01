"use client";

import { Box, HStack, Link, Text, Spinner, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaUser } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { auth } from "../../lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../LoginRegister/Login.jsx";
import Register from "../LoginRegister/Register.jsx";

export default function BlackBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const openLoginModal = () => {
    setDefaultTab("login");
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  useEffect(() => {
    const removeListener = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => removeListener();
  }, []);

  return (
    <Box id="blackBar" bg="#000" color="#828282" py={1} fontSize="15px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxW="1280px"
        margin="0 auto"
        px={10}
        py={0.5}
      >
        <HStack spacing={6} alignItems="center">
          <Text fontWeight="500" fontSize="0.9rem">
            Pizza Constanta
          </Text>

          <Box height="20px" width="1px" bg="#828282" />

          <Link
            href="../Contact"
            fontSize="0.9rem"
            _hover={{ textDecoration: "none" }}
          >
            Contact
          </Link>

          <HStack
            spacing={4}
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Link href="https://facebook.com" isExternal>
              <Icon as={FaFacebook} boxSize={5} />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <Icon as={FaInstagram} boxSize={5} />
            </Link>
          </HStack>
        </HStack>

        <HStack spacing={6} alignItems="center">
          <Link
            href="tel:0241555555"
            display="flex"
            flexDirection="row"
            spacing={2}
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
            <Text fontSize="0.9rem" mr={1}>
              Comenzi telefonice:
            </Text>
            <Text fontWeight="bold" fontSize="sm">
              0241 555 555
            </Text>
          </Link>

          {loading ? (
            <Spinner size="sm" color="blue.500" />
          ) : user ? (
            <HStack spacing={2} alignItems="center">
              <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
              <Link
                href="/profile"
                display="flex"
                alignItems="center"
                gap={4}
                cursor="pointer"
                _hover={{ textDecoration: "none" }}
              >
                <Text fontSize="sm" mr={2}>
                  Cont
                </Text>
                <Box
                  bg="#E3051B"
                  borderRadius="full"
                  width="30px"
                  height="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaUser} color="black" boxSize="20px" />
                </Box>
              </Link>
            </HStack>
          ) : (
            <>
              {/* REGISTER */}
              <HStack spacing={2} alignItems="center">
                <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
                <Link
                  onClick={openRegisterModal}
                  fontSize="0.9rem"
                  borderRadius="md"
                  display="inline-block"
                  cursor="pointer"
                  _hover={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </HStack>

              {/* LOGIN */}
              <HStack spacing={2} alignItems="center">
                <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
                <Link
                  onClick={openLoginModal}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  fontSize="0.9rem"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ textDecoration: "none" }}
                >
                  Login
                  <Box
                    bg="#E3051B"
                    borderRadius="full"
                    width="30px"
                    height="30px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml={2}
                  >
                    <Icon as={FaUser} color="black" boxSize="20px" />
                  </Box>
                </Link>
              </HStack>
            </>
          )}
        </HStack>
      </Box>

      {/* Login Modal */}
      <Login
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        defaultTab={defaultTab}
      />

      {/* Register Modal */}
      <Register isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </Box>
  );
}
