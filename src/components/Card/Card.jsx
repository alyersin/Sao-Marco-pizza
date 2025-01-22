import React from "react";
import { Box, Image, Text, VStack, HStack } from "@chakra-ui/react";
export default function Card({
  item,
  width = "250px",
  height = "auto",
  p = 4,
  m = "auto",
}) {
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
      // className="borderRed"
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
      <Box className="borderGreen" display="flex" justifyContent="center">
        <Image
          src={item.image}
          alt={item.name}
          // width="100%"
          height="194px"
          borderRadius="md"
        />
      </Box>
      <VStack
        className="borderBlue"
        align="center"
        height={"100%"}
        spacing={0}
        p={4}
      >
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
          // BUTOANE ADAUGA IN COS
          <HStack
            className="borderBlue"
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
            <HStack className="borderGreen" spacing={2} width={"100%"}>
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
          className="borderBlue"
          justify="space-between"
          align="center"
          bgColor="#999999"
          pl={2}
          borderRadius="md"
          _hover={{ bg: "gray.700" }}
          cursor="pointer"
          height="54px"
          width="100%"
        >
          <Text
            className="borderBlue"
            width="100%"
            fontWeight="bold"
            fontSize={{ base: "xl", md: "md" }}
            color="white"
          >
            CUM VREI TU
          </Text>
          <Image
            className="borderGreen"
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
