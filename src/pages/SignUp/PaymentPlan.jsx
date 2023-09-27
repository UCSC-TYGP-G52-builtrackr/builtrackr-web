'use client'


import {
  Flex,
  Heading,
  VStack,
  Stack,
  Box,
  Grid,
  Text
} from "@chakra-ui/react";
import PricingBox from "./PricingBox";

const prices = [
  {
    name: "pro",
    price: "$12",
    popular: true,
    features: new Array(4).fill(null).map((e) => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  },
  {
    name: "business",
    price: "$30",
    features: new Array(5).fill(null).map((e) => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  },
  {
    name: "special",
    price: "$180",
    features: new Array(5).fill(null).map((e) => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  }
];

const App = () => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    minH="100vh"
    w="full"
    backgroundColor="gray.200"
  >
    <Stack
    className="flex h-full justify-start items-center w-full"
      spacing={5}
      marginY={5}
      justifyContent="flex-start"
      alignItems="center"
      maxWidth="1200px"
      w="full"
      paddingX={[5, 0]}
    >
      <VStack alignItems="center" w="full">
        <Heading color="teal.300">Pricing</Heading>
        <Text mb={5} textAlign="center">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
        </Text>
      </VStack>
      <Stack
        spacing={0}
        isInline
        border="1px solid"
        borderColor="teal.300"
        borderRadius="4px"
        justifyContent="center"
        alignItems="stretch"
        display="flex"
        width="fit-content"
        backgroundColor="white"
        mb={3}
      >
        <Box backgroundColor="teal.300" color="white" p=".3rem 1rem">
          Monthly
        </Box>
        <Box p=".3rem 1rem">Annually</Box>
      </Stack>
      <div className="flex w-full justify-around my-8"
        w="full"
        gap={5}
        justifyContent="center"
        templateColumns={{
          base: "inherit",
          md: "repeat( auto-fit, 250px )"
        }}
      >
        {prices.map((price) => (
          <PricingBox key={price.name} {...price} />
        ))}
      </div>
    </Stack>
  </Flex>
);

export default App;
