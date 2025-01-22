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
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Login({ isOpen, onClose, defaultTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const defaultIndex = defaultTab === "register" ? 1 : 0;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogin = async () => {
    if (!agree) {
      setMessage("Trebuie sa accepti politica de confidentialitate.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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
      setTimeout(() => {
        setShowAlert(false);
        setMessage("");
      }, 3000);

      onClose();
    } catch (error) {
      setMessage(error.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // MOBILE DRAWER
  const MobileDrawer = () => (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent bg="black" color="white" py={0}>
        <DrawerCloseButton
          color="red.500"
          size="lg"
          boxSize={10}
          fontSize={20}
          left={4}
        />
        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={0}
          py={16}
          my="40%"
        >
          {/* LOGIN / REGISTER */}
          <VStack
            textAlign={"center"}
            justifyContent="center"
            alignItems="center"
            spacing={6}
            width="100%"
            align="stretch"
          >
            <Link
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="#999999"
              color="#FFFFFF"
              borderRadius="5px"
              height={{ base: "54px", md: "50px" }}
              width="68%"
              onClick={() => setShowLoginModal(true)}
            >
              <Box
                display="flex"
                textAlign="left"
                alignItems="center"
                pl={{ base: 12, md: 12 }}
                fontSize="1.2rem"
              >
                LOGIN
              </Box>
              <Image
                src="../assets/arrow-right.svg"
                alt="arrow"
                height={"100%"}
                borderRadius="5px"
              />
            </Link>

            <Link
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="#999999"
              color="#FFFFFF"
              borderRadius="5px"
              height={{ base: "54px", md: "50px" }}
              width="68%"
              href="/register"
            >
              <Box
                display="flex"
                textAlign="left"
                alignItems="center"
                pl={{ base: 12, md: 12 }}
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
          </VStack>

          <VStack spacing={10} mt={24} align="center">
            <Link
              href="#"
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
              _hover={{ color: "red.500" }}
            >
              DESPRE SAN MARCO
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  // MOBILE LOGIN MODAL
  const MobileLoginModal = () => (
    <Modal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      size="full"
    >
      <ModalOverlay bg="rgba(51, 51, 51, 0.8)" />
      <ModalContent bg="black" color="white">
        <ModalCloseButton
          color="red.500"
          size="lg"
          boxSize={10}
          fontSize={20}
          left={4}
        />
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={10}
        >
          <VStack spacing={5} w="100%" px={8}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Log in
            </Text>
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
              <Text color="gray.400" ml={2} fontSize={15}>
                Da, sunt de acord cu{" "}
                <Link href="#" color="#ff6633">
                  Politica de confidentialitate.
                </Link>
              </Text>
            </HStack>
            <Link
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="#f7c000"
              color="black"
              borderRadius="5px"
              height="54px"
              width="100%"
              px={6}
              fontWeight="bold"
              _hover={{ bg: "#e0ac00" }}
              onClick={handleLogin}
            >
              <Text>LOG IN</Text>
              <Image src="../assets/thumb-right-yellow.svg" alt="thumb-right" />
            </Link>
            <Link
              href="#"
              color="yellow.400"
              fontSize="sm"
              fontWeight="bold"
              _hover={{ color: "yellow.300" }}
            >
              Ai uitat parola? Click aici
            </Link>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  // DESKTOP MODAL
  const DesktopModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(51, 51, 51, 0.8)" />
      <ModalContent bgColor="black" width="476px" height="440px">
        <ModalCloseButton color="white" size={4} />
        <ModalBody my="8">
          <Tabs isFitted variant="none" defaultIndex={defaultIndex}>
            <TabList mb={4} justifyContent={"center"}>
              <Box color={"white"} fontSize="28px" fontWeight="bold">
                Log in
              </Box>
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
  );

  return (
    <>
      {/* ALERT */}
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

      {isMobile ? (
        <>{showLoginModal ? MobileLoginModal() : MobileDrawer()}</>
      ) : (
        <DesktopModal />
      )}
    </>
  );
}
