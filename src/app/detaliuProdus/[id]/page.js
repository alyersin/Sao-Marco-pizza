"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  CheckboxGroup,
  Checkbox,
  Link,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import pizzaData from "../../../pizza.json";
import pasteData from "../../../paste.json";
import bauturiData from "../../../bauturi.json";
import desertData from "../../../desert.json";
import sandwichData from "../../../sandwich.json";
import salateData from "../../../salate.json";
import burgerAndWrapsData from "../../../burgerAndWraps.json";

const allItems = [
  ...pizzaData,
  ...pasteData,
  ...bauturiData,
  ...desertData,
  ...sandwichData,
  ...salateData,
  ...burgerAndWrapsData,
];

const extractToppings = (categoryData) => {
  return [
    ...new Set(
      categoryData.flatMap((item) =>
        item.description
          .replace("INGREDIENTE:", "")
          .split(",")
          .map((topping) => topping.trim())
      )
    ),
  ];
};

const pizzaToppings = extractToppings(pizzaData);
const pastaToppings = extractToppings(pasteData);
const sandwichToppings = extractToppings(sandwichData);
const saladToppings = extractToppings(salateData);
const burgerWrapToppings = extractToppings(burgerAndWrapsData);
const dessertToppings = extractToppings(desertData);
const drinkToppings = extractToppings(bauturiData);

export default function DetaliuProdus({ params: paramsPromise }) {
  const [product, setProduct] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      const params = await paramsPromise;
      setId(params.id);
    }
    fetchParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (id) {
      const foundProduct = allItems.find((item) => item.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : null);
      } else {
        console.error("Produsul nu a fost gasit");
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Alege marimea produsului");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [
      ...cart,
      {
        id: product.id,
        name: product.name,
        image: product.image,
        size: selectedSize
          ? { label: selectedSize.label, price: parseFloat(selectedSize.price) }
          : null,
        toppings: selectedToppings,
        quantity: 1,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (!product) return <Text>Loading...</Text>;

  let relevantToppings = [];
  if (pizzaData.some((item) => item.id === product.id)) {
    relevantToppings = pizzaToppings;
  } else if (pasteData.some((item) => item.id === product.id)) {
    relevantToppings = pastaToppings;
  } else if (sandwichData.some((item) => item.id === product.id)) {
    relevantToppings = sandwichToppings;
  } else if (salateData.some((item) => item.id === product.id)) {
    relevantToppings = saladToppings;
  } else if (burgerAndWrapsData.some((item) => item.id === product.id)) {
    relevantToppings = burgerWrapToppings;
  } else if (desertData.some((item) => item.id === product.id)) {
    relevantToppings = dessertToppings;
  } else if (bauturiData.some((item) => item.id === product.id)) {
    relevantToppings = drinkToppings;
  }

  return (
    <Box
      maxWidth="1280px"
      mx="auto"
      mt={20}
      mb={10}
      bg="#232323"
      color="white"
      py={8}
      px={10}
    >
      <HStack alignItems="flex-start" spacing={8}>
        <VStack align="start" spacing={6}>
          <HStack spacing={2} fontSize="sm">
            <Link href="/" _hover={{ textDecoration: "none" }}>
              Homepage
            </Link>
            <Text>|</Text>
            <Text>{product.name}</Text>
          </HStack>

          <Image
            src={product.image}
            alt={product.name}
            borderRadius="md"
            mx="auto"
            boxSize="300px"
          />

          <Text>{product.description}</Text>
        </VStack>

        <VStack align="start" spacing={4}>
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text fontSize="xl" fontWeight="bold">
                Alege dimensiunea:
              </Text>
              <RadioGroup
                onChange={(sizeLabel) =>
                  setSelectedSize(
                    product.sizes.find((size) => size.label === sizeLabel)
                  )
                }
                value={selectedSize?.label || ""}
              >
                {product.sizes.map((size, index) => (
                  <Radio key={index} value={size.label}>
                    {size.label} - {size.price}
                  </Radio>
                ))}
              </RadioGroup>
            </>
          )}

          {relevantToppings.length > 0 && (
            <>
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                Adauga topping:
              </Text>
              <CheckboxGroup
                onChange={setSelectedToppings}
                value={selectedToppings}
              >
                <VStack align="start">
                  {relevantToppings.map((topping, index) => (
                    <Checkbox key={index} value={topping}>
                      {topping}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </>
          )}

          <Button colorScheme="green" onClick={handleAddToCart} mt={4}>
            ADAUGA IN COS
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
