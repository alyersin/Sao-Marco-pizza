"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Input,
  VStack,
  Text,
  useMediaQuery,
  Radio,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function LoginRegister({ isOpen, onClose, defaultTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const [selectedValue, setSelectedValue] = useState("");

  const defaultIndex = defaultTab === "register" ? 1 : 0;

  const handleRadioChange = (value) => {
    setSelectedValue((prev) => (prev === value ? "" : value));
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setMessage("Login successful!");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      onClose();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      setMessage("Registration successful!");

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      {/* {isMobile ? (  <Text>dasda</Text>    ) : ( 
        
      )}  */}
      <ModalOverlay className="borderRed" />
      <ModalContent
        className="borderRed"
        bgColor="black"
        maxW="500px"
        height="490px"
      >
        {/* <ModalHeader>Login / Register</ModalHeader> */}
        <ModalCloseButton color="white" size={4} />
        <ModalBody my="20">
          <Tabs isFitted variant="enclosed" defaultIndex={defaultIndex}>
            <TabList mb="2em">
              <Tab color={"white"}>Login</Tab>
              <Tab color={"white"}>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={4}>
                  <Input
                    placeholder="Email"
                    bg="#707070"
                    _placeholder={{ color: "gray.400" }}
                    border="none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="Parola"
                    bg="#707070"
                    _placeholder={{ color: "gray.400" }}
                    border="none"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <HStack>
                    <Radio
                      isChecked={selectedValue === "yes"}
                      onClick={() =>
                        setSelectedValue((prev) =>
                          prev === "yes" ? "" : "yes"
                        )
                      }
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

                    <Text color="gray.400">
                      Da, sunt de acord cu{" "}
                      <Link href="#" passHref>
                        <Text as="span" color="#ff6633">
                          Politica de confidentialitate.
                        </Text>
                      </Link>
                    </Text>
                  </HStack>
                  <Button colorScheme="orange" onClick={handleLogin}>
                    Login
                  </Button>
                  {message && <Text color="red.500">{message}</Text>}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4}>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button colorScheme="orange" onClick={handleRegister}>
                    Register
                  </Button>
                  {message && <Text color="red.500">{message}</Text>}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
