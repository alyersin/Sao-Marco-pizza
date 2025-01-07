"use client";

import { useState } from "react";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      setMessage(
        "Registration successful! A confirmation email has been sent to your email address. Please verify your account before logging in."
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Heading mb={6}>Register</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister} colorScheme="blue">
          Register
        </Button>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
}
