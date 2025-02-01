"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "../../lib/firestore";
import { VStack, Text, Box, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function IstoricComenzi() {
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
          Trebuie sa te autentifici pentru a vedea istoricul comenzilor
        </Text>
      </VStack>
    );
  }

  return (
    <VStack className="borderBlue" spacing={4}>
      <Text fontSize="xl">
        Poti sa vezi factura sau detaliile de comanda la fiecare din comenzile
        tale.
      </Text>
      {orders.length === 0 ? (
        <Text>Nu exista comenzi</Text>
      ) : (
        orders.map((order) => (
          <Box
            key={order.id}
            p={4}
            width={"100%"}
            border="1px solid gray"
            borderRadius="md"
          >
            <Text>Data: {order.orderDate.toDate().toLocaleString()}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Total: {parseFloat(order.totalAmount).toFixed(2)} lei</Text>
          </Box>
        ))
      )}
    </VStack>
  );
}
