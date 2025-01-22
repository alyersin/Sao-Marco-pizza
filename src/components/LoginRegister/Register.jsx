"use client";

import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Radio,
  HStack,
  Link,
  Box,
  Image,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Register({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    if (!agree) {
      setMessage("Trebuie sa accepti politica de confidentialitate.");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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

      toast({
        title: "Registration successful",
        description:
          "A verification email has been sent to your email address.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAgree(false);

      setMessage("");
      setShowAlert(false);
      onClose();
    } catch (error) {
      setMessage(error.message);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* ALERT MSG */}
      {showAlert && (
        <Alert
          status="error"
          position="absolute"
          bgColor="#FF5549"
          color="white"
          top="10px"
          right="10px"
          width="400px"
          height="54px"
          zIndex="2400"
          borderRadius="md"
          boxShadow="lg"
          display="flex"
          alignItems="center"
          opacity={showAlert ? 1 : 0}
          visibility={showAlert ? "visible" : "hidden"}
          transition="opacity 0.5s ease-in-out, visibility 0.5s ease-in-out"
        >
          <CloseButton
            position="absolute"
            left="8px"
            top="8px"
            onClick={() => setShowAlert(false)}
          />
          <Text flex="1" textAlign="center">
            {message}
          </Text>
        </Alert>
      )}

      {/* REGISTER MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="rgba(51, 51, 51, 0.8)" />
        <ModalContent bgColor="black" maxW="480px" height="700px" color="white">
          <ModalHeader
            // className="borderGreen"
            textAlign="center"
            fontWeight="bold"
            fontSize="3xl"
            p={2}
            mt={8}
          >
            CONT NOU
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody className="borderBlue">
            <Text textAlign="center" color="white" fontSize="xl" mx={12} mb={2}>
              Creeaza un cont nou pentru a face mai rapid o comanda.
            </Text>
            <VStack spacing={5} mx={4}>
              <Input
                placeholder="Nume"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
                height="50px"
              />
              <Input
                placeholder="Prenume"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
                height="50px"
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
                height="50px"
              />
              <Input
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
                height="50px"
              />
              <Input
                placeholder="Parola"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
                height="50px"
              />
              <HStack className="borderRed" mt={-2} mb={4}>
                <Radio
                  isChecked={agree}
                  onClick={() => setAgree(!agree)}
                  sx={{
                    boxSize: "21px",
                    borderColor: "#ffcc00",
                    borderWidth: "2px",
                    _checked: {
                      bg: "#ffcc00",
                      borderColor: "#ffcc00",
                    },
                  }}
                />
                <Text color="gray.400" ml={2}>
                  Da, sunt de acord cu{" "}
                  <Link href="#" color="#ffcc00" fontSize="sm">
                    Politica de confidentialitate.
                  </Link>
                </Text>
              </HStack>
              <Link
                className="borderGreen"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                href="#"
                mt={0}
                height="54px"
                width="100%"
                bgColor="#999999"
                borderRadius="5px"
                onClick={handleRegister}
              >
                <Box
                  color={"white"}
                  display="flex"
                  alignItems="center"
                  pl={{ base: 12, md: 4 }}
                  width="auto"
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  fontWeight={"bold"}
                >
                  INREGISTRARE
                </Box>
                <Image
                  src="../../assets/thumb-right.svg"
                  width="auto"
                  height={"100%"}
                  borderRadius="5px"
                />
              </Link>
            </VStack>
          </ModalBody>
          <ModalFooter
            className="borderRed"
            justifyContent="center"
            height="auto"
          >
            <Link
              href="/login"
              color="#ffcc00"
              fontWeight="bold"
              textDecoration="none"
            >
              Ai deja cont? Log in aici
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
