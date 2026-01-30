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
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) =>s.fetchProducts);
  const removeProduct = useProductStore((s) => s.removeProduct);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.lg" mt={{ base: 4, md: 8 }} pb={{ base: 28, md: 8 }}>
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        товары
      </Text>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : products.length === 0 ? (
        <Text textAlign="center" color={textColor} fontSize="lg">
          товаров нет{" "}
          <ChakraLink
            as={NavLink}
            to="/create"
            color="teal.400"
            fontWeight="semibold"
          >
            создать?
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
