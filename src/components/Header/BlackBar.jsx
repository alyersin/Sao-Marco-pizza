"use client";

import {
  Box,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Spinner,
  Icon,
  Span,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaUser } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { auth } from "../../lib/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import LoginRegister from "../LoginRegister/LoginRegister.jsx";

export default function BlackBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = (register = false) => {
    setIsRegister(register);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box bg="#000" color="#828282" py={1} fontSize="15px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxW="1280px"
        margin="0 auto"
        px={10}
      >
        {/* Left Section: Logo, Contact, Social Media */}
        <HStack spacing={6} alignItems="center">
          {/* Pizza Constanta */}
          <Text fontWeight="500">Pizza Constanta</Text>

          {/* Vertical Line */}
          <Box height="20px" width="1px" bg="#828282" />

          {/* Contact Link */}
          <Link
            href="/contact"
            fontSize="sm"
            _hover={{ textDecoration: "none" }}
          >
            Contact
          </Link>

          {/* Social Media Icons */}
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

        {/* Right Section: Phone Number, Login/Register */}
        <HStack spacing={6} alignItems="center">
          <Link
            display="flex"
            flexDirection="row"
            spacing={2}
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
            {/* <Icon as={FaPhone} mr={1} /> */}
            <Text fontSize="sm" mr={1}>
              Comenzi telefonice:
            </Text>
            <Text fontWeight="bold" fontSize="sm">
              0241 555 555
            </Text>
          </Link>

          {loading ? (
            <Spinner size="sm" color="blue.500" />
          ) : user ? (
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="blue"
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  name={user.displayName || "User"}
                  src={user.photoURL || ""}
                />
              </MenuButton>
              <MenuList>
                <Text px={4} py={2} fontWeight="bold">
                  Hello, {user.displayName || user.email}
                </Text>
                <MenuItem href="/profile">Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <HStack spacing={2} alignItems="center">
                <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
                <Link
                  onClick={() => openModal(true)}
                  // _hover={{ bg: "#FFC107" }}
                  fontSize="sm"
                  fontWeight="bold"
                  borderRadius="md"
                  display="inline-block"
                  cursor="pointer"
                  _hover={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </HStack>

              <HStack spacing={2} alignItems="center">
                <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
                <Link
                  onClick={() => openModal(false)}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  fontSize="sm"
                  fontWeight="bold"
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

      {/* Include the Login/Register Modal */}
      <LoginRegister
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultTab={isRegister ? "register" : "login"}
      />
    </Box>
  );
}
