"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  Input,
  Radio,
  HStack,
  Link,
  Text,
  useToast,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function DesktopRegister({ isOpen, onClose }) {
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
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          status="error"
          position="absolute"
          top="10px"
          right="10px"
          width="400px"
          bg="#FF5549"
          color="white"
          zIndex="2400"
          borderRadius="md"
        >
          <CloseButton
            position="absolute"
            left="8px"
            onClick={() => setShowAlert(false)}
          />
          <Text>{message}</Text>
        </Alert>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="rgba(51, 51, 51, 0.8)" />
        <ModalContent bgColor="black" maxW="480px" height="700px" color="white">
          <ModalHeader
            textAlign="center"
            fontWeight="bold"
            fontSize="3xl"
            mt={8}
          >
            CONT NOU
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text textAlign="center" fontSize="xl" color="white" mb={6}>
              Creeaza un cont nou pentru a face mai rapid o comanda.
            </Text>
            <VStack spacing={5}>
              <Input
                placeholder="Nume"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Prenume"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Parola"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="#707070"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <HStack>
                <Radio
                  isChecked={agree}
                  onClick={() => setAgree(!agree)}
                  sx={{
                    boxSize: "21px",
                    borderColor: "#ffcc00",
                    borderWidth: "2px",
                    _checked: { bg: "#ffcc00", borderColor: "#ffcc00" },
                  }}
                />
                <Text color="gray.400" ml={2}>
                  Da, sunt de acord cu{" "}
                  <Link href="#" color="#ffcc00">
                    Politica de confidentialitate.
                  </Link>
                </Text>
              </HStack>
              <Link
                display="block"
                textAlign="center"
                bg="#999999"
                color="white"
                py={3}
                borderRadius="5px"
                onClick={handleRegister}
              >
                INREGISTRARE
              </Link>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Link href="/login" color="#ffcc00" fontWeight="bold">
              Ai deja cont? Log in aici
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
