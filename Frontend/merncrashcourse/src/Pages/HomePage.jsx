import React, { useEffect } from "react";
import ProductCard from "../Components/ProductCard.jsx";
import { useProductStore } from "../store/product";
import {
  Container,
  useColorModeValue,
  Text,
  SimpleGrid,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("gray.200", "gray.800");

  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading); // если добавил loading в store
  const fetchProducts = useProductStore((s) => s.fetchProducts); // если добавил fetchProducts
  const removeProduct = useProductStore((s) => s.removeProduct);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.lg" mt={{ base: 24, md: 14 }}>
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        Current Products
      </Text>

      {loading ? (
        <Text textAlign="center">Loading...</Text>
      ) : products.length === 0 ? (
        <Text textAlign="center" color={textColor} fontSize="lg">
          No products found{" "}
          <ChakraLink
            as={NavLink}
            to="/create"
            color="teal.400"
            fontWeight="semibold"
          >
            Create one?
          </ChakraLink>
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              removeProduct={removeProduct}
              cardBg={cardBg}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default HomePage;
