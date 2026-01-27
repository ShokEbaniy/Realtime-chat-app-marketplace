import {
  Container,
  useColorModeValue,
  Text,
  Center,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const CreateProductPage = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const addProduct = useProductStore((state) => state.addProduct);

  const handleAddProduct = async () => {
    const { success, message } = await addProduct(productDetails);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      setProductDetails({ name: "", price: "", image: "" });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container
      maxW={"container.lg"}
      bg={useColorModeValue("gray.200", "gray.800")}
      p={6}
      borderRadius="md"
      alignItems={"center"}
    >
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          Create New Product
        </Text>
        <Input
          borderColor={useColorModeValue("gray.300", "gray.600")}
          focusBorderColor="green.500"
          name="productName"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
          placeholder="Product Name"
          _placeholder={{ color: useColorModeValue("gray.400", "gray.500") }}
        />
        <Input
          borderColor={useColorModeValue("gray.300", "gray.600")}
          focusBorderColor="green.500"
          name="productPrice"
          value={productDetails.price}
          onChange={(e) =>
            setProductDetails({ ...productDetails, price: e.target.value })
          }
          type="number"
          placeholder="Product Price in Tenge"
          _placeholder={{ color: useColorModeValue("gray.400", "gray.500") }}
        />
        <Input
          borderColor={useColorModeValue("gray.300", "gray.600")}
          focusBorderColor="green.500"
          name="productImage"
          value={productDetails.image}
          onChange={(e) =>
            setProductDetails({ ...productDetails, image: e.target.value })
          }
          placeholder="Product Image URL"
          _placeholder={{ color: useColorModeValue("gray.400", "gray.500") }}
        />

        <Button colorScheme="green" width="full" onClick={handleAddProduct}>
          Create Product
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateProductPage;
