"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Text,
  Link,
  Box,
  HStack,
  Input,
  Image,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function MobileDrawer({ isOpen, onClose }) {
  const [view, setView] = useState("menu");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const switchToLogin = () => {
    setView("login");
  };

  const switchToRegister = () => {
    setView("register");
  };

  const handleLogin = async () => {
    if (!agree) {
      setMessage("Trebuie sa accepti politica de confidentialitate.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Autentificare cu succes");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setView("menu");
        onClose();
      }, 3000);
    } catch (error) {
      setMessage(error.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleRegister = async () => {
    if (!agree) {
      setMessage("Trebuie sa accepti politica de confidentialitate.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      setMessage(
        "Inregistrare cu succes! Verifica email-ul pentru confirmare."
      );
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setView("menu");
        onClose();
      }, 3000);
    } catch (error) {
      setMessage(error.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const renderContent = () => {
    if (view === "menu") {
      if (isLoggedIn) {
        return (
          <VStack spacing={6} textAlign="center">
            <Link
              href="/profile"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="#999999"
              color="#FFFFFF"
              borderRadius="5px"
              height="54px"
              width="68%"
            >
              <Box
                display="flex"
                textAlign="left"
                alignItems="center"
                pl={12}
                fontSize="1.2rem"
              >
                My Account
              </Box>
              <Image
                src="../assets/arrow-right.svg"
                alt="arrow"
                height={"100%"}
                borderRadius="5px"
              />
            </Link>
          </VStack>
        );
      }

      return (
        <VStack spacing={5} mt={52} textAlign="center">
          <Link
            // className="borderRed"
            onClick={switchToLogin}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgColor="#999999"
            color="#FFFFFF"
            borderRadius="5px"
            height="54px"
            width="68%"
          >
            <Box
              display="flex"
              textAlign="left"
              alignItems="center"
              pl={12}
              fontSize="1.2rem"
            >
              LOG IN
            </Box>
            <Image
              src="../assets/arrow-right.svg"
              alt="arrow"
              height={"100%"}
              borderRadius="5px"
            />
          </Link>

          <Link
            onClick={switchToRegister}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgColor="#999999"
            color="#FFFFFF"
            borderRadius="5px"
            height="54px"
            width="68%"
          >
            <Box
              display="flex"
              textAlign="left"
              alignItems="center"
              pl={12}
              fontSize="1.2rem"
            >
              REGISTER
            </Box>
            <Image
              src="../assets/arrow-right.svg"
              alt="arrow"
              height={"100%"}
              borderRadius="5px"
            />
          </Link>

          <VStack spacing={10} mt={16} align="center">
            <Link
              href="#"
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
              _hover={{ color: "red.500" }}
            >
              DESPRE SAO MARCO
            </Link>
            <Link
              href="#"
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
              _hover={{ color: "red.500" }}
            >
              CONTACT
            </Link>
          </VStack>

          <VStack spacing={10} mt={10} align="center">
            <HStack spacing={4}>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size="30px" color="white" />
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size="30px" color="white" />
              </Link>
            </HStack>
            <Text fontSize="lg" textAlign="center" color="gray.400">
              Comenzi telefonice: <br /> 0241 555 555
            </Text>
          </VStack>
        </VStack>
      );
    } else if (view === "login") {
      return (
        <VStack
          //   className="borderBlue"
          spacing={6}
          textAlign="center"
          mt="260px"
        >
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Log in
          </Text>
          <VStack mt={1} width="100%" spacing={1}>
            <Input
              placeholder="Email"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="#707070"
              border="none"
              height="52px"
              color="white"
            />
            <Input
              placeholder="Parola"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="#707070"
              border="none"
              height="52px"
              color="white"
              mt={4}
            />
          </VStack>
          <HStack
            justifyContent="flex-start"
            width="80%"
            spacing={4}
            mt={2}
            align="center"
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              style={{
                width: "20px",
                height: "20px",
                accentColor: "#FFD101",
              }}
            />
            <Text fontSize="sm" color="gray.400">
              Da, sunt de acord cu{" "}
              <Link href="#" color="#FFD101" fontWeight="bold">
                Politica de confidentialitate.
              </Link>
            </Text>
          </HStack>
          <Link
            onClick={handleLogin}
            bg="#FFD101"
            color="black"
            borderRadius="5px"
            p={4}
            width="80%"
            mt={4}
            fontWeight="bold"
          >
            LOG IN
          </Link>

          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}
          {/* CONTINUA AICI */}

          <Link
            color="#FFD101"
            fontSize="md"
            fontWeight="bold"
            mt={4}
            _hover={{ color: "yellow.300" }}
            // href="/ForgotPassword"
            onClick={switchToRegister}
          >
            Ai uitat parola? Click aici
          </Link>
        </VStack>
      );
    } else if (view === "register") {
      return (
        <VStack spacing={4} textAlign="center" mt={6}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            CONT NOU
          </Text>

          {/* Input Fields */}
          <Box width="80%">
            <Input
              placeholder="Nume"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="#707070"
              border="none"
              color="white"
              mb={2}
            />
            <Input
              placeholder="Prenume"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              bg="#707070"
              border="none"
              color="white"
              mb={2}
            />
            <Input
              placeholder="Email"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="#707070"
              border="none"
              color="white"
              mb={2}
            />
            <Input
              placeholder="Telefon"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              bg="#707070"
              border="none"
              color="white"
              mb={2}
            />
            <Input
              placeholder="Parola"
              sx={{
                "::placeholder": {
                  color: "#B3B3B3",
                },
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="#707070"
              border="none"
              color="white"
              mb={2}
            />
          </Box>

          <HStack
            justifyContent="flex-start"
            width="80%"
            spacing={4}
            mt={2}
            align="center"
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              style={{
                width: "20px",
                height: "20px",
                accentColor: "#FFD101",
              }}
            />
            <Text fontSize="sm" color="gray.400">
              Da, sunt de acord cu{" "}
              <Link href="#" color="#FFD101" fontWeight="bold">
                Politica de confidentialitate.
              </Link>
            </Text>
          </HStack>

          <Link
            onClick={handleRegister}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="#FFD101"
            color="black"
            borderRadius="5px"
            height="54px"
            width="80%"
            mt={4}
            pl={6}
            pr={4}
            fontWeight="bold"
          >
            <Text>INREGISTRARE</Text>
            <Image
              src="../assets/thumb-right.svg"
              alt="thumb-right"
              height={"100%"}
              borderRadius="5px"
            />
          </Link>

          <Link
            color="#FFD101"
            fontSize="md"
            fontWeight="bold"
            mt={4}
            _hover={{ color: "yellow.300" }}
            onClick={switchToLogin}
            // href="/login"
          >
            Ai deja cont? Log in aici
          </Link>
        </VStack>
      );
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent bg="black" color="white">
        <DrawerCloseButton
          onClick={() => setView("menu")}
          color="red"
          fontSize={22}
          left={4}
          top={4}
        />
        {showAlert && (
          <Alert status="error" bg="#FF5549" color="white" borderRadius="md">
            <CloseButton onClick={() => setShowAlert(false)} />
            {message}
          </Alert>
        )}

        <DrawerBody py={8}>{renderContent()}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
