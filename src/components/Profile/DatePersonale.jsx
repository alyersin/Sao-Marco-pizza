"use client";

import {
  Box,
  VStack,
  Link,
  Popover,
  Image,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Input,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useEffect, useState } from "react";

export default function DatePersonale() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setPhone(userData.phone || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserData = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          firstName,
          lastName,
          phone,
        });

        toast({
          title: "Succes!",
          description: "Profilul a fost actualizat cu succes!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating user data:", error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut actualiza profilul. Încearcă din nou.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Deconectat",
        description: "Te-ai deconectat cu succes!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box>
      <VStack
        className="borderGreen"
        mt={{ base: 14, md: 12 }}
        spacing={{ base: 4, md: 5 }}
        align="stretch"
      >
        <Box display={"flex"} gap={{ base: 4, md: 10 }} flexWrap="wrap">
          <Input
            placeholder="Nume"
            sx={{ "::placeholder": { color: "#B3B3B3" } }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            bg="#707070"
            color="white"
            flex={{ base: "1 1 100%", md: "1 1 45%" }}
            height={{ base: "52px", md: "50px" }}
          />
          <Input
            placeholder="Prenume"
            sx={{ "::placeholder": { color: "#B3B3B3" } }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            bg="#707070"
            color="white"
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
            sx={{ "::placeholder": { color: "#B3B3B3" } }}
            value={user?.email || ""}
            isDisabled
            bg="#707070"
            color="white"
            height={{ base: "52px", md: "50px" }}
          />
          <Input
            placeholder="Numar de telefon"
            sx={{ "::placeholder": { color: "#B3B3B3" } }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            bg="#707070"
            color="white"
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
            display="flex"
            flexDirection={{ base: "column", md: "column" }}
            gap={{ base: 9, md: 4 }}
            width={{ base: "100%", md: "48%" }}
          >
            <Input
              placeholder="Parola veche"
              sx={{ "::placeholder": { color: "#B3B3B3" } }}
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              bg="#707070"
              color="white"
              height={{ base: "52px", md: "50px" }}
            />
            <Input
              placeholder="Parola noua"
              sx={{ "::placeholder": { color: "#B3B3B3" } }}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="#707070"
              color="white"
              height={{ base: "52px", md: "50px" }}
            />
          </Box>

          <Popover>
            <PopoverTrigger>
              <Link
                href="#"
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
                onClick={updateUserData}
              >
                <Box
                  display="flex"
                  textAlign="left"
                  alignItems="center"
                  pl={{ base: 5, md: 5 }}
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
              <PopoverBody>Profil actualizat cu succes!</PopoverBody>
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
            <PopoverBody>Schimbarea parolei nu este implementata</PopoverBody>
          </PopoverContent>
        </Popover>

        <HStack flexWrap="wrap" mt={{ base: 20, md: 16 }} pb={4}>
          <Button
            onClick={handleLogout}
            gap={3}
            cursor="pointer"
            color="#FFD100"
            bgColor="inherit"
            fontSize={{ base: "lg", md: "xl" }}
          >
            <Image src="../assets/logout.svg" alt="Logout" boxSize="30px" />
            <Box>Log out</Box>
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button
                gap={3}
                cursor="pointer"
                color="#FFD100"
                bgColor="inherit"
                fontSize={{ base: "lg", md: "xl" }}
              >
                <Image
                  src="../assets/delete-yellow.svg"
                  alt="Delete Account"
                  boxSize="30px"
                />
                <Box>Sterge cont</Box>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg="gray.700" color="white">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Stergerea contului nu este implementata.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </VStack>
    </Box>
  );
}
