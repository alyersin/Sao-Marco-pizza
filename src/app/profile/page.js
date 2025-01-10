"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { auth } from "../../lib/firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6}>Dashboard</Heading>
      {user && <Heading size="sm">Welcome, {user.email}</Heading>}
      <Button onClick={handleLogout} mt={4} colorScheme="red">
        Logout
      </Button>
    </Box>
  );
}
