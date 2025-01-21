"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Input,
  Radio,
  HStack,
  Link,
  Text,
  Image,
  Box,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Login({ isOpen, onClose, defaultTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const defaultIndex = defaultTab === "register" ? 1 : 0;

  const handleLogin = async () => {
    if (!agree) {
      setMessage("Trebuie sa accepti politica de confidentialitate.");
      setShowAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setMessage("Autentificare cu succes");
      setShowAlert(true);

      setEmail("");
      setPassword("");

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
        setMessage("");
      }, 3000);

      onClose();
    } catch (error) {
      setMessage(error.message);
      setShowAlert(true);

      // Hide the alert after 3 seconds
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

      {/* LOGIN MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay className="borderRed" bg="rgba(51, 51, 51, 0.8)" />
        <ModalContent bgColor="black" maxW="480px" height="440px">
          <ModalCloseButton color="white" size={4} />
          <ModalBody my="8">
            <Tabs isFitted variant="enclosed" defaultIndex={defaultIndex}>
              <TabList mb="2em">
                <Tab color={"white"}>Login</Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                  textAlign="center"
                  display="flex"
                  flexDirection={"column"}
                  gap={2}
                >
                  <VStack spacing={4}>
                    <Input
                      placeholder="Email"
                      bg="#707070"
                      _placeholder={{ color: "gray.400" }}
                      border="none"
                      height="50px"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Parola"
                      bg="#707070"
                      _placeholder={{ color: "gray.400" }}
                      border="none"
                      height="50px"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <HStack>
                      <Radio
                        isChecked={agree}
                        onChange={() => setAgree(!agree)}
                        sx={{
                          boxSize: "21px",
                          borderColor: "#ff6633",
                          borderWidth: "2px",
                          color: "transparent",
                          _checked: {
                            bg: "#ff6633",
                            borderColor: "#ff6633",
                          },
                          _focus: {
                            boxShadow: "none",
                          },
                        }}
                      />
                      <Text color="gray.400" ml={2}>
                        Da, sunt de acord cu{" "}
                        <Link href="#" color="#ff6633">
                          Politica de confidentialitate.
                        </Link>
                      </Text>
                    </HStack>
                    <Link
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      href="#"
                      mt={4}
                      height="50px"
                      width="100%"
                      bgColor="#999999"
                      borderRadius="5px"
                      onClick={handleLogin}
                    >
                      <Box
                        color={"white"}
                        display="flex"
                        alignItems="center"
                        pl={{ base: 12, md: 4 }}
                        width="auto"
                        fontSize={{ base: "0.8rem", md: "0.9rem" }}
                      >
                        LOG IN
                      </Box>
                      <Image
                        src="../../assets/thumb-right.svg"
                        width="auto"
                        height={"100%"}
                        borderRadius="5px"
                      />
                    </Link>
                  </VStack>
                  <Link
                    href="/resetPassword"
                    color={"#ff6633"}
                    fontWeight={"bold"}
                    sx={{ textDecoration: "none" }}
                  >
                    Ai uitat parola? Click aici
                  </Link>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
