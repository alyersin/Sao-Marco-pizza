"use client";

import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";

export default function MobileRegister({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="black" color="white" p={4}>
        <DrawerCloseButton color="white" onClick={onClose} />
        <DrawerBody>
          <VStack spacing={5}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Register
            </Text>
            <Input placeholder="Name" bg="gray.700" color="white" />
            <Input placeholder="Email" bg="gray.700" color="white" />
            <Input
              placeholder="Password"
              type="password"
              bg="gray.700"
              color="white"
            />
            <Button
              bg="red.500"
              color="white"
              _hover={{ bg: "red.400" }}
              width="full"
            >
              Register
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
