"use client";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage("Please verify your email before logging in.");
        return;
      }

      setMessage("Login successful!");
      router.push("/profile");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Heading mb={6}>Login</Heading>
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
        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
        <Link as={NextLink} href="/register" color="blue.500">
          Register
        </Link>
        <Link as={NextLink} href="/ForgotPassword" color="blue.500" mt={4}>
          Forgot Password?
        </Link>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
}
