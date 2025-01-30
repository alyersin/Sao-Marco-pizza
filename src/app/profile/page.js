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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activeItem, setActiveItem] = useState("Date personale");

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
      bg="#232323"
      color="white"
      px={{ base: 4, md: 10 }}
      py={{ base: 4, md: 9 }}
      maxW="1024px"
      mx="auto"
      mt={{ base: 0, md: 20 }}
      mb={{ base: 4, md: 20 }}
      borderRadius="md"
    >
      <Text
        display={{ base: "none", md: "flex" }}
        fontSize={{ base: "md", md: "18px" }}
        mb={{ base: 4, md: 6 }}
      >
        Cont personal | Date personale
      </Text>

      {/* NAVIGATION */}
      <HStack
        display={{ base: "none", md: "flex" }}
        spacing={{ base: 2, md: 4 }}
        justifyContent="space-between"
        mb={{ base: 4, md: 7 }}
        mt={{ base: 4, md: 8 }}
        flexWrap="wrap"
      >
        <ChakraLink
          as={NextLink}
          _hover={{ textDecoration: "none" }}
          href="/profile"
          color="#FFD100"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          DATE PERSONALE
        </ChakraLink>

        <ChakraLink
          as={NextLink}
          _hover={{ textDecoration: "none" }}
          href="/profile/adrese"
          color="gray.500"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          ADRESE DE LIVRARE
        </ChakraLink>

        <ChakraLink
          as={NextLink}
          _hover={{ textDecoration: "none" }}
          href="/profile/istoric"
          color="gray.500"
          // fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textDecoration="none"
        >
          ISTORIC COMENZI
        </ChakraLink>
      </HStack>

      {/* NAVIGATION MOBILE */}
      <Box
        display={{ base: "flex", md: "none" }}
        width={"full"}
        mt={{ base: 2, md: 0 }}
      >
        <Menu matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon boxSize={8} />}
            width="full"
            height={"50px"}
            bg="#707070"
            color="white"
            _hover={{ bg: "#606060" }}
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {activeItem}
          </MenuButton>
          <MenuList width="full" bg="#707070" border="none">
            {" "}
            <MenuItem
              onClick={() => setActiveItem("Date personale")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Date personale
            </MenuItem>
            <MenuItem
              onClick={() => setActiveItem("Adrese de livrare")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Adrese de livrare
            </MenuItem>
            <MenuItem
              onClick={() => setActiveItem("Istoric comenzi")}
              bg="#707070"
              color="white"
              _hover={{ bg: "#606060" }}
              textAlign="center"
              justifyContent="center"
              height="30px"
            >
              Istoric comenzi
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Divider
        display={{ base: "none", md: "flex" }}
        borderColor="#FFD100"
        borderWidth="1px"
        mb={{ base: 4, md: 12 }}
      />

      <VStack
        className="borderGreen"
        mt={{ base: 14, md: 0 }}
        spacing={{ base: 4, md: 5 }}
        align="stretch"
      >
        <Box display={"flex"} gap={{ base: 4, md: 10 }} flexWrap="wrap">
          <Input
            placeholder="Nume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            bg="#707070"
            color="white"
            border="none"
            flex={{ base: "1 1 100%", md: "1 1 45%" }}
            height={{ base: "52px", md: "50px" }}
          />
          <Input
            placeholder="Prenume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            bg="#707070"
            color="white"
            border="none"
            flex={{ base: "1 1 100%", md: "1 1 45%" }}
            height={{ base: "52px", md: "50px" }}
          />
        </Box>

        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 10 }}
        >
          <Input
            placeholder="Email"
            value={user?.email || ""}
            isDisabled
            bg="#707070"
            color="white"
            border="none"
            height={{ base: "52px", md: "50px" }}
          />
          <Input
            placeholder="Numar de telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            bg="#707070"
            color="white"
            border="none"
            height={{ base: "52px", md: "50px" }}
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
            // className="borderRed"
            display="flex"
            flexDirection={{ base: "column", md: "column" }}
            gap={{ base: 9, md: 4 }}
            // height="120px"
            width={{ base: "100%", md: "48%" }}
          >
            <Input
              placeholder="Parola veche"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              bg="#707070"
              color="white"
              border="none"
              // flex={{ base: "1 1 100%", md: "1 1 45%" }}
              height={{ base: "52px", md: "50px" }}
              width="100%"
            />
            <Input
              placeholder="Parola noua"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="#707070"
              color="white"
              border="none"
              // flex={{ base: "1 1 100%", md: "1 1 45%" }}
              height={{ base: "52px", md: "50px" }}
              width="100%"
            />
          </Box>

          <Popover>
            <PopoverTrigger>
              <Link
                href="/"
                _hover={{ textDecoration: "none" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgColor="#999999"
                color="#FFFFFF"
                borderRadius="5px"
                mt={{ base: 8, md: 0 }}
                height={{ base: "52px", md: "50px" }}
                width={{ base: "100%", md: "30%" }}
              >
                <Box
                  display="flex"
                  textAlign="left"
                  alignItems="center"
                  pl={{ base: 5, md: 5 }}
                  variant="solid"
                  height={{ base: "100%", md: "50px" }}
                  fontSize={{ base: "1rem", md: "inherit" }}
                  fontWeight={"bold"}
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
              className="borderRed"
              rightIcon={<FaLock />}
              iconSpacing={{ base: 48, md: 60 }}
              bg="#707070"
              mt={{ base: 1, md: 0 }}
              color="white"
              border="none"
              fontWeight="bold"
              _hover={{ bg: "gray.700" }}
              width={{ base: "100%", md: "48%" }}
              height={{ base: "52px", md: "50px" }}
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

      <HStack flexWrap="wrap" mt={{ base: 20, md: 20 }} pb={2}>
        <Button
          // display={{ base: "none", md: "flex" }}
          onClick={handleLogout}
          gap={3}
          cursor="pointer"
          color="#FFD100"
          bgColor="inherit"
          alignSelf={{ base: "flex-start", md: "center" }}
          _hover={{ textDecoration: "none" }}
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="normal"
        >
          <Image src="../assets/logout.svg" alt="Delete" boxSize="30px" />
          <Box>Log out</Box>
        </Button>

        <Popover>
          <PopoverTrigger>
            <Button
              // display={{ base: "none", md: "flex" }}
              gap={3}
              cursor="pointer"
              color="#FFD100"
              bgColor="inherit"
              alignSelf={{ base: "flex-start", md: "center" }}
              _hover={{ textDecoration: "none" }}
              fontSize={{ base: "lg", md: "xl" }}
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
