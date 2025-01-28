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
  Link,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
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

  return (
    <Box
      className="borderRed"
      bg="#232323"
      color="white"
      px={{ base: 4, md: 10 }}
      py={{ base: 4, md: 9 }}
      maxW="1024px"
      mx="auto"
      mt={{ base: 4, md: 20 }}
      mb={{ base: 4, md: 20 }}
      borderRadius="md"
    >
      <Text fontSize={{ base: "md", md: "18px" }} mb={{ base: 4, md: 6 }}>
        Cont personal | Date personale
      </Text>

      <HStack
        spacing={{ base: 2, md: 4 }}
        justifyContent="space-between"
        mb={{ base: 4, md: 7 }}
        mt={{ base: 4, md: 8 }}
        flexWrap="wrap"
      >
        <ChakraLink
          as={NextLink}
          href="/profile"
          color="#FFD100"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          DATE PERSONALE
        </ChakraLink>
        <Divider
          orientation="vertical"
          h="20px"
          bg="#FFD100"
          display={{ base: "none", md: "block" }}
        />
        <ChakraLink
          as={NextLink}
          href="/adrese-de-livrare"
          color="gray.500"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          ADRESE DE LIVRARE
        </ChakraLink>
        <Divider
          orientation="vertical"
          h="20px"
          bg="#FFD100"
          display={{ base: "none", md: "block" }}
        />
        <ChakraLink
          as={NextLink}
          href="/istoricComenzi"
          color="gray.500"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>

      <Divider
        borderColor="#FFD100"
        borderWidth="1px"
        mb={{ base: 4, md: 12 }}
      />

      <VStack spacing={5} align="stretch">
        <HStack spacing={10} flexWrap="wrap">
          <Input
            placeholder="Nume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
            flex={{ base: "1 1 100%", md: "1 1 45%" }}
            height={{ base: "46px", md: "50px" }}
          />
          <Input
            placeholder="Prenume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
            flex={{ base: "1 1 100%", md: "1 1 45%" }}
            height={{ base: "46px", md: "50px" }}
          />
        </HStack>

        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={10}
        >
          <Input
            placeholder="Email"
            value={user?.email || ""}
            isDisabled
            bg="gray.600"
            color="white"
            border="none"
            height={{ base: "46px", md: "50px" }}
          />
          <Input
            placeholder="Numar de telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            bg="gray.600"
            color="white"
            border="none"
            height={{ base: "46px", md: "50px" }}
          />
        </Box>

        <Box
          className="bordeRed"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-end"
          gap={2}
        >
          <Box
            className="bordeRed"
            display="flex"
            flexDirection={{ base: "column", md: "column" }}
            gap={4}
            height="110px"
            width={{ base: "100%", md: "48%" }}
          >
            <Input
              className="bordeRed"
              placeholder="Parola veche"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              bg="gray.600"
              color="white"
              border="none"
              flex={{ base: "1 1 100%", md: "1 1 45%" }}
              height={{ base: "46px", md: "50px" }}
              width="100%"
            />
            <Input
              className="bordeRed"
              placeholder="Parola noua"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="gray.600"
              color="white"
              border="none"
              flex={{ base: "1 1 100%", md: "1 1 45%" }}
              height={{ base: "46px", md: "50px" }}
              width="100%"
            />
          </Box>

          <Popover>
            <PopoverTrigger>
              <Link
                className="borderRed"
                href="/"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgColor="#999999"
                color="#FFFFFF"
                borderRadius="5px"
                height={{ base: "46px", md: "50px" }}
                width={{ base: "100%", md: "30%" }}
              >
                <Box
                  //
                  display="flex"
                  textAlign="left"
                  alignItems="center"
                  pl={{ base: 12, md: 12 }}
                  variant="solid"
                  height={{ base: "46px", md: "50px" }}
                  fontSize={{ base: "0.8rem", md: "inherit" }}
                >
                  MODIFICA DATELE
                </Box>
                <Image
                  src="../assets/arrow-right.svg"
                  alt="arrow"
                  height={"100%"}
                  borderRadius="5px"
                />
              </Link>
            </PopoverTrigger>
            <PopoverContent bg="gray.700" color="white">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Actualizarea profilului nu este implementata.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        <Popover>
          <PopoverTrigger>
            <Button
              rightIcon={<FaLock />}
              iconSpacing={60}
              bg="gray.600"
              color="white"
              border="none"
              fontWeight="bold"
              _hover={{ bg: "gray.700" }}
              width={{ base: "100%", md: "48%" }}
              height={{ base: "46px", md: "50px" }}
            >
              MODIFICA PAROLA
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="gray.700" color="white">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Schimbarea parolei nu este implementata.</PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>

      <HStack flexWrap="wrap" mt={{ base: 4, md: 20 }} pb={2}>
        <Button
          display={{ base: "none", md: "flex" }}
          onClick={handleLogout}
          gap={3}
          cursor="pointer"
          color="#FFD100"
          bgColor="inherit"
          alignSelf={{ base: "flex-start", md: "center" }}
          _hover={{ textDecoration: "none" }}
          fontSize={{ base: "sm", md: "xl" }}
          fontWeight="normal"
        >
          <Image src="../assets/logout.svg" alt="Delete" boxSize="30px" />
          <Box>Log out</Box>
        </Button>

        <Popover>
          <PopoverTrigger>
            <Button
              display={{ base: "none", md: "flex" }}
              gap={3}
              cursor="pointer"
              color="#FFD100"
              bgColor="inherit"
              alignSelf={{ base: "flex-start", md: "center" }}
              _hover={{ textDecoration: "none" }}
              fontSize={{ base: "sm", md: "xl" }}
              fontWeight="normal"
            >
              <Image
                src="../assets/delete-yellow.svg"
                alt="Delete"
                boxSize="30px"
              />
              <Box>Sterge cont</Box>
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="gray.700" color="white">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Stergerea contului nu este implementata.</PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  );
}
