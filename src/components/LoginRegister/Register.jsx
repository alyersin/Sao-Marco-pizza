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
  Checkbox,
  Box,
  Link,
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
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent bgColor="black" maxW="400px" color="white">
          <ModalHeader textAlign="center" fontWeight="bold" fontSize="lg">
            CONT NOU
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text textAlign="center" color="gray.400" mb={4}>
              Creeaza un cont nou pentru a face mai rapid o comanda.
            </Text>
            <VStack spacing={3}>
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
              <Checkbox
                colorScheme="yellow"
                isChecked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                color="gray.400"
                size="lg"
              >
                Da, sunt de acord cu{" "}
                <Link href="#" color="#ffcc00" textDecoration="underline">
                  Politica de confidentialitate.
                </Link>
              </Checkbox>
              <Button
                bg="#ffcc00"
                color="black"
                _hover={{ bg: "#ffdb4d" }}
                onClick={handleRegister}
                height="50px"
                width="100%"
                fontWeight="bold"
                fontSize="md"
                rightIcon={
                  <Image src="../../assets/thumb-right.svg" boxSize="18px" />
                }
              >
                INREGISTRARE
              </Button>
              {message && <Text color="red.500">{message}</Text>}
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
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
