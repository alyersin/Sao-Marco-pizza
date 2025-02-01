"use client";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Radio,
  Image,
  HStack,
  Link,
  VStack,
  Icon,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      setResponseMessage("Mesajul a fost trimis cu succes!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMessage("Eroare la trimiterea mesajului. Încercați din nou.");
    }
    setLoading(false);
  };

  return (
    <Box maxWidth="1280px" mx="auto">
      <Box
        // className="borderBlue"
        maxWidth="1280px"
        mx={{ base: 0, md: 10 }}
        mt={{ base: 0, md: 20 }}
        mb={"7px"}
        bg="#232323"
        color="white"
        py={{ base: 6, md: 8 }}
        px={{ base: 4, md: 10 }}
      >
        {showAlert && (
          <Alert
            status="error"
            position="absolute"
            bgColor="#FF5549"
            color="white"
            top="10px"
            right="10px"
            width="400px"
            height="54px"
            zIndex="2400"
            borderRadius="md"
            boxShadow="lg"
            display="flex"
            alignItems="center"
          >
            <CloseButton
              position="absolute"
              left="8px"
              top="8px"
              onClick={() => setShowAlert(false)}
            />
            <Text flex="1" textAlign="center">
              Trebuie sa accepti politica de confidentialitate.
            </Text>
          </Alert>
        )}

        <Box>
          <Text
            display={{ base: "none", md: "block" }}
            fontSize="md"
            mb={5}
            mt={2}
            color="gray.400"
          >
            Home page | Contact
          </Text>

          <Heading fontSize="2xl" mb={{ base: 6, md: 10 }}>
            CONTACTEAZA-NE!
          </Heading>
          <Text fontSize="md" mb={{ base: 7, md: 8 }}>
            Ai intrebari? Lasa-ne un mesaj in acest formular.
          </Text>

          <HStack
            className="borderGreen"
            spacing={{ base: 20, md: 28 }}
            align="flex-start"
            flexWrap="wrap"
          >
            <VStack
              className="borderRed"
              spacing={{ base: 4, md: 5 }}
              flex="1"
              maxW={{ base: "100%", md: "50%" }}
            >
              <Input
                name="name"
                placeholder="Nume"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={{
                  "::placeholder": { color: "#B3B3B3" },
                }}
                bg="#707070"
                border="none"
                height="50px"
              />

              <Input
                placeholder="Email"
                sx={{
                  "::placeholder": {
                    color: "#B3B3B3",
                  },
                }}
                bg="#707070"
                border="none"
                height="50px"
              />
              <Textarea
                placeholder="Mesaj"
                sx={{
                  "::placeholder": {
                    color: "#B3B3B3",
                  },
                }}
                bg="#707070"
                border="none"
                height="150px"
              />
              <HStack>
                <Radio
                  isChecked={agree}
                  onChange={() => setAgree(!agree)}
                  sx={{
                    boxSize: "21px",
                    borderColor: "#ffcc00",
                    borderWidth: "2px",
                    _checked: { bg: "#ffcc00", borderColor: "#ff6633" },
                  }}
                />
                <Text color="gray.400" ml={2} fontSize={15}>
                  Da, sunt de acord cu{" "}
                  <Link href="#" color="#ffcc00">
                    Politica de confidentialitate.
                  </Link>
                </Text>
              </HStack>

              <Button
                className="borderBlue"
                onClick={handleSubmit}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgColor="#999999"
                color="#FFFFFF"
                borderRadius="5px"
                _hover={{ bgColor: "#888888" }}
                height="54px"
                width="100%"
                mt={{ base: 6, md: 3 }}
                isLoading={loading}
              >
                <Box
                  display="flex"
                  textAlign="left"
                  alignItems="center"
                  pl={6}
                  fontSize="1.2rem"
                >
                  TRIMITE
                </Box>
                <Image
                  className="borderBlue"
                  src="../assets/thumb-right.svg"
                  alt="arrow"
                  height={"100%"}
                  borderRadius="5px"
                />
              </Button>
            </VStack>

            <VStack
              className="borderBlue"
              align={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "left" }}
              spacing={4}
              flex="1"
              minW="300px"
            >
              <Text fontSize="xl">Program de lucru:</Text>
              <Text>
                Te asteptam intre 10:00 si 24:00, de Luni până Duminica pentru
                comenzi online sau la telefon.
              </Text>
              <Text fontSize="xl" mt={4}>
                Contact:
              </Text>
              <Text>0241 555 555</Text>
              <Text fontSize="xl" mt={4}>
                Adrese:
              </Text>
              <VStack>
                <Text>I. C. Bratianu , Constanta</Text>
                <Text>A. Lapusneanu , City Mall</Text>
                <Text>Aurel Vlaicu , complex Aviatorii</Text>
              </VStack>
            </VStack>
          </HStack>

          <Box
            mt={20}
            h="352px"
            mb={2}
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
    </Box>
  );
}
