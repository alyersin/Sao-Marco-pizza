"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { FaTrash, FaSignOutAlt, FaLock } from "react-icons/fa";

export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFirstName("Ersin");
        setLastName("Ali");
        setPhone("0732906480");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleDeleteAccount = () => {
    alert("Stergerea contului nu este implementata.");
  };

  const handleUpdateProfile = () => {
    alert("Actualizarea profilului nu este implementata.");
  };

  const handleChangePassword = () => {
    alert("Schimbarea parolei nu este implementata.");
  };

  return (
    <Box
      bg="black"
      color="white"
      p={8}
      maxW="800px"
      mx="auto"
      mt={10}
      borderRadius="md"
    >
      <Heading fontSize="lg" mb={6}>
        Cont personal | Date personale
      </Heading>

      <HStack spacing={4} justifyContent="space-between" mb={4}>
        <ChakraLink
          as={NextLink}
          href="/profile"
          color="#FFD100"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          DATE PERSONALE
        </ChakraLink>
        <Divider orientation="vertical" h="20px" bg="#FFD100" />
        <ChakraLink
          as={NextLink}
          href="/adrese-de-livrare"
          color="gray.500"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          ADRESE DE LIVRARE
        </ChakraLink>
        <Divider orientation="vertical" h="20px" bg="#FFD100" />
        <ChakraLink
          as={NextLink}
          href="/istoricComenzi"
          color="gray.500"
          fontWeight="bold"
          fontSize="lg"
          textDecoration="none"
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>

      <Divider borderColor="#FFD100" mb={6} />

      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
          />
        </HStack>
        <Input
          placeholder="Email"
          value={user?.email || ""}
          isDisabled
          bg="gray.600"
          color="white"
          border="none"
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          bg="gray.600"
          color="white"
          border="none"
        />

        <HStack>
          <Input
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
          />
          <Input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
          />
        </HStack>

        <Button
          leftIcon={<FaLock />}
          onClick={handleChangePassword}
          bg="gray.600"
          color="white"
          border="none"
          fontWeight="bold"
          _hover={{ bg: "gray.700" }}
          w="full"
        >
          MODIFICA PAROLA
        </Button>

        <Button
          rightIcon={<Icon as={FaSignOutAlt} />}
          onClick={handleUpdateProfile}
          bg="gray.400"
          color="black"
          fontWeight="bold"
          _hover={{ bg: "gray.500" }}
          alignSelf="flex-end"
        >
          MODIFICA DATELE
        </Button>
      </VStack>

      <Divider borderColor="gray.700" mt={6} mb={4} />

      <HStack justifyContent="space-between">
        <Button
          leftIcon={<FaSignOutAlt />}
          onClick={handleLogout}
          bg="black"
          color="#FFD100"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
        >
          Log out
        </Button>
        <Button
          leftIcon={<FaTrash />}
          onClick={handleDeleteAccount}
          bg="black"
          color="#FFD100"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
        >
          Sterge cont
        </Button>
      </HStack>
    </Box>
  );
}
