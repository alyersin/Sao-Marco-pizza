import React from "react";
import { Box, Image, Text, VStack, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Card({
  item,
  category,
  width = "250px",
  height = "auto",
  p = 4,
  m = "auto",
}) {
  const router = useRouter();

  const handleAddToCart = (size) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, { ...item, size }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const typeColor = (type) => {
    switch (type) {
      case "De Post":
        return "green.400";
      case "Nou":
        return "yellow.400";
      case "Picant":
        return "red.400";
      default:
        return "gray.500";
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="#232323"
      color="white"
      borderRadius="md"
      overflow="hidden"
      width={width}
      height={height}
      shadow="lg"
      p={p}
      m={m}
    >
      <Box display="flex" justifyContent="center">
        <Image
          src={item.image}
          alt={item.name}
          height="194px"
          borderRadius="md"
        />
      </Box>

      <VStack align="center" height="100%" spacing={0} p={4}>
        <Text fontWeight="bold" fontSize="lg">
          {item.name}
        </Text>
        {item.type && (
          <Text fontSize="sm" fontWeight="bold" color={typeColor(item.type)}>
            {item.type}
          </Text>
        )}
        <Text fontSize="xs" align="center" color="gray.400" noOfLines={3}>
          {item.description}
        </Text>
      </VStack>

      <VStack spacing={2}>
        {item.sizes.map((size, index) => (
          <HStack
            key={index}
            justify="space-between"
            align="center"
            bgColor="#999999"
            pl={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            cursor="pointer"
            height="54px"
            width="100%"
            onClick={() => handleAddToCart(size)}
          >
            <HStack justify="space-between" align="center" width="100%">
              <Text
                fontSize={{ base: "md", md: "sm" }}
                fontWeight="800"
                color="black"
              >
                {size.label}
              </Text>
              {size.description && (
                <Text fontSize={{ base: "xs", md: "xs" }} color="gray.500">
                  {size.description}
                </Text>
              )}
            </HStack>
            <HStack spacing={2} width="100%">
              <Text fontWeight="bold" fontSize={{ base: "2xl", md: "sm" }}>
                {size.price}
              </Text>
            </HStack>
            <Image
              borderRadius="5px"
              src="../assets/addcart.svg"
              alt="thumb"
              boxSize="100%"
              width="auto"
              ml="4px"
            />
          </HStack>
        ))}

        <HStack
          justify="space-between"
          align="center"
          bgColor="#999999"
          pl={2}
          borderRadius="md"
          _hover={{ bg: "gray.700" }}
          cursor="pointer"
          height="54px"
          width="100%"
          onClick={() =>
            router.push(`/detaliuProdus/${item.id}?category=${category}`)
          }
        >
          <Text fontWeight="bold" fontSize="md" color="white">
            CUM VREI TU
          </Text>
          <Image
            borderRadius="5px"
            src="../assets/thumb-right-gray.svg"
            alt="thumb-gray"
            boxSize="100%"
            width="auto"
            ml="4px"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
