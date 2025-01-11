"use client";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Checkbox,
  Link,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../../app/globals.css";

export default function Contact() {
  return (
    <Box
      className="borderRed"
      maxWidth="1280px"
      mx="auto"
      my={20}
      bg="black"
      color="white"
      py={8}
      px={10}
    >
      <Box className="borderGreen">
        <Text fontSize="sm" mb={4} color="gray.400">
          Homepage | Contact
        </Text>

        <Heading fontSize="2xl" mb={4}>
          CONTACTEAZĂ-NE!
        </Heading>
        <Text fontSize="md" mb={6}>
          Ai întrebări? Lasă-ne un mesaj în acest formular.
        </Text>

        <HStack spacing={8} align="flex-start" flexWrap="wrap">
          <VStack spacing={4} flex="1" minW="300px">
            <Input placeholder="Nume" bg="gray.700" border="none" />
            <Input placeholder="Email" bg="gray.700" border="none" />
            <Textarea
              placeholder="Mesaj"
              bg="gray.700"
              border="none"
              h="120px"
            />
            <Checkbox colorScheme="yellow">
              Da, sunt de acord cu{" "}
              <Link color="yellow.400" href="#">
                Politica de confidențialitate.
              </Link>
            </Checkbox>
            <Button
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              leftIcon={<Icon as={FaMapMarkerAlt} />}
            >
              TRIMITE
            </Button>
          </VStack>

          <VStack align="flex-start" spacing={4} flex="1" minW="300px">
            <Text fontSize="lg" fontWeight="bold">
              Program de lucru:
            </Text>
            <Text>
              Te așteptăm între 10:00 și 24:00, de Luni până Duminică pentru
              comenzi online sau la telefon.
            </Text>
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              Contact:
            </Text>
            <Text>0241 555 555</Text>
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              Adrese:
            </Text>
            <Text>I. C. Brătianu , Constanța</Text>
            <Text>A. Lăpușneanu , City Mall</Text>
            <Text>Aurel Vlaicu , complex Aviatorii</Text>
          </VStack>
        </HStack>

        <Box
          mt={8}
          h="300px"
          bg="gray.700"
          borderRadius="md"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456.12345678!2d28.634285!3d44.1733899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40abcd12345:0x6789abcdf!2sConstanța!5e0!3m2!1sen!2sro!4v1615471234567!5m2!1sen!2sro"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
}
