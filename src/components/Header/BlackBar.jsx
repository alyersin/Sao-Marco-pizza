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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaUser } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { auth } from "../../lib/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import LoginRegister from "../LoginRegister/LoginRegister.jsx";

export default function BlackBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = (tab = "login") => {
    setDefaultTab(tab);
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
        py={0.5}
      >
        <HStack spacing={6} alignItems="center">
          <Text fontWeight="500">Pizza Constanta</Text>

          <Box height="20px" width="1px" bg="#828282" />

          <Link
            href="/contact"
            fontSize="sm"
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
                <MenuItem
                  as={Link}
                  href="/profile"
                  _hover={{ textDecoration: "none" }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <HStack spacing={2} alignItems="center">
                <Icon as={ChevronRightIcon} color="#FFD100" boxSize={8} />
                <Link
                  onClick={() => openModal("register")}
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
                  onClick={() => openModal("login")}
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

      <LoginRegister
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultTab={defaultTab}
      />
    </Box>
  );
}
