"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { saveOrderToHistory } from "../../lib/firestore";
import { auth } from "../../lib/firebase";

export default function CheckoutPage() {
  const { cart, calculateTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOrderConfirmation = async () => {
    if (!auth.currentUser) {
      alert("Please log in to confirm your order.");
      return;
    }

    setLoading(true);

    try {
      await saveOrderToHistory(cart, calculateTotal());
      clearCart();
      localStorage.removeItem("cart");
      alert("Order confirmed! Redirecting to order history...");
      router.push("/profile/istoric");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1280px" mx="auto" p={4}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        Checkout
      </Text>
      <VStack spacing={4}>
        {cart.map((item, index) => (
          <HStack
            key={`${item.id}-${index}`}
            justifyContent="space-between"
            width="100%"
            border="1px solid gray"
            p={4}
            borderRadius="md"
          >
            <Text>{item.name}</Text>
            <Text>
              {item.quantity} x {item.size.price} lei
            </Text>
            <Text>{(item.quantity * item.size.price).toFixed(2)} lei</Text>
          </HStack>
        ))}
      </VStack>

      <Text fontSize="2xl" fontWeight="bold" mt={6}>
        Total: {calculateTotal()} lei
      </Text>
      <Button
        colorScheme="green"
        mt={4}
        onClick={handleOrderConfirmation}
        isLoading={loading}
      >
        Confirm Order
      </Button>
    </Box>
  );
}
