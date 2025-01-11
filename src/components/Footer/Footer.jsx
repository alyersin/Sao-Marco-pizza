import {
  Box,
  Text,
  HStack,
  Link,
  VStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box bg="black">
      <Box
        maxW="1280px"
        mx="auto"
        color="white"
        py={6}
        px={8}
        textAlign="center"
      >
        <VStack spacing={4}>
          {/* TOP */}
          <HStack spacing={4} justify="center">
            <Box
              as={NextLink}
              href="/"
              bg="yellow.400"
              borderRadius="full"
              w={10}
              h={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="bold"
              fontSize="lg"
              color="black"
              _hover={{ bg: "yellow.300" }}
            >
              SO
            </Box>
            <HStack spacing={4} wrap="wrap">
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Despre Sao Marco
              </Link>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Restaurante
              </Link>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Contact
              </Link>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Termeni si conditii
              </Link>
            </HStack>
          </HStack>
          {/* MIDDLE */}
          <HStack spacing={4} justify="center" wrap="wrap">
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Politica de confidentialitate
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Politica de cookie-uri
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              ANPC
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Valori nutritionale
            </Link>
          </HStack>
          <HStack spacing={4} justify="center">
            <Icon as={FaFacebook} boxSize={5} cursor="pointer" />
            <Icon as={FaInstagram} boxSize={5} cursor="pointer" />
          </HStack>
          <Divider borderColor="gray.600" />
          {/* BOTTOM */}
          <Text fontSize="sm" mt={2}>
            © {new Date().getFullYear()} Ersin.
          </Text>
          <Text fontSize="xs" color="gray.400" mt={2} px={6}>
            This app is a personal project created for academic purposes and to
            showcase my skills. It is not intended for commercial use or public
            distribution.
            <br />
            All trademarks, logos, and brand names are the property of their
            respective owners. No data is collected or stored by this app. The
            creator is not responsible for any misuse of this project.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
