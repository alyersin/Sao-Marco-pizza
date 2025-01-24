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
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function DesktopLogin({ isOpen, onClose, defaultTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

      setEmail("");
      setPassword("");
      setTimeout(() => {
        setShowAlert(false);
        setMessage("");
        onClose();
      }, 3000);
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="rgba(51, 51, 51, 0.8)" />
        <ModalContent bgColor="black" width="476px" height="440px">
          <ModalCloseButton color="white" />
          <ModalBody my="8">
            <Tabs
              isFitted
              variant="none"
              defaultIndex={defaultTab === "register" ? 1 : 0}
            >
              <TabList mb={4} justifyContent={"center"}>
                <Text color={"white"} fontSize="28px" fontWeight="bold">
                  Log in
                </Text>
              </TabList>
              <TabPanels>
                <TabPanel
                  textAlign="center"
                  display="flex"
                  flexDirection={"column"}
                  gap={2}
                >
                  <VStack spacing={5}>
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
                          _checked: { bg: "#ff6633", borderColor: "#ff6633" },
                        }}
                      />
                      <Text color="gray.400" ml={2} fontSize={15}>
                        Da, sunt de acord cu{" "}
                        <Link href="#" color="#ff6633">
                          Politica de confidentialitate.
                        </Link>
                      </Text>
                    </HStack>
                    <Link
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      href="#"
                      mt={4}
                      height="50px"
                      width="100%"
                      bgColor="#999999"
                      borderRadius="5px"
                      onClick={handleLogin}
                    >
                      <Text color="white" fontWeight="bold">
                        LOG IN
                      </Text>
                    </Link>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
