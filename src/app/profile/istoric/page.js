"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "../../../lib/firestore";
import { VStack, Text, Box, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function Istoric() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getUserOrders().then((data) => {
          setOrders(data);
          setLoading(false);
        });
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Spinner size="lg" />;

  if (!isLoggedIn) {
    return (
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Please log in to view your order history.
        </Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Order History
      </Text>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        orders.map((order) => (
          <Box key={order.id} p={4} border="1px solid gray" borderRadius="md">
            <Text>Order Date: {order.orderDate.toDate().toLocaleString()}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Total: {parseFloat(order.totalAmount).toFixed(2)} lei</Text>
          </Box>
        ))
      )}
    </VStack>
  );
}
