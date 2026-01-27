import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProductStore } from "../store/product";
import {
  Container,
  Text,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const ProductCard = ({ product, removeProduct, cardBg }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = React.useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const toast = useToast();
  return (
    <Box
      key={product._id || product.id}
      bg={cardBg}
      p={4}
      borderRadius="md"
      transition="0.3s ease-in-out"
      _hover={{
        boxShadow: "md",
        transform: "scale(1.01) translateY(-2px)",
      }}
    >
      <Text fontSize="sm" color="gray.500" noOfLines={1}>
        {product.image}
      </Text>
      <Text fontWeight="bold">{product.name}</Text>
      <Text>{product.price}</Text>

      <Button mt={3} mr={2} onClick={onOpen}>
        <FaEdit />
      </Button>
      <Button
        mt={3}
        colorScheme="red"
        onClick={async () => {
          const removed = await removeProduct(product._id || product.id);
          if (removed.success) {
            toast({
              title: `Product ${product.name} removed.`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error removing product.",
              description: removed.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }}
      >
        <FaRegTrashCan />
      </Button>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input
                borderColor={useColorModeValue("gray.300", "gray.600")}
                focusBorderColor="green.500"
                name="productName"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
                placeholder="Product Name"
                _placeholder={{
                  color: useColorModeValue("gray.400", "gray.500"),
                }}
              />
              <Input
                borderColor={useColorModeValue("gray.300", "gray.600")}
                focusBorderColor="green.500"
                name="productPrice"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                type="number"
                placeholder="Product Price in Tenge"
                _placeholder={{
                  color: useColorModeValue("gray.400", "gray.500"),
                }}
              />
              <Input
                borderColor={useColorModeValue("gray.300", "gray.600")}
                focusBorderColor="green.500"
                name="productImage"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Product Image URL"
                _placeholder={{
                  color: useColorModeValue("gray.400", "gray.500"),
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                onClose();
                const updated = await updateProduct(
                  product._id || product.id,
                  updatedProduct
                );
                if (updated.success) {
                  toast({
                    title: "Product updated.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Error updating product.",
                    description: updated.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
