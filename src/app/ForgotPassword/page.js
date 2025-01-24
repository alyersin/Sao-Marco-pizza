"use client";

import { useState } from "react";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Heading mb={6}>Forgot Password</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handlePasswordReset} colorScheme="blue">
          Reset Password
        </Button>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
}
