import React from 'react';

import {
    Box,
    Stack,
    HStack,
    Text,
    Heading,
    Divider,
    List,
    ListIcon,
    ListItem,
    Button
  } from "@chakra-ui/react";
  
  import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons"
  import PropTypes from "prop-types";
  
  const PricingBox = ({ popular, name, price, info = "", features = [] }) => {
    return (
      <Stack
        spacing={2}
        border="3px solid"
        borderColor={popular ? "teal.300" : "gray.300"}
        borderRadius="0.7rem"
        p={4}
        h="350px"
        backgroundColor="white"
        position="relative"
      >
        {popular && (
          <Box
            position="absolute"
            top="0"
            right="0"
            backgroundColor="teal.300"
            color="white"
            paddingX={2}
            paddingY={1}
            borderRadius="0 0 0 0.7rem"
            fontSize="0.8rem"
          >
            POPULAR
          </Box>
        )}
        <Text textTransform="uppercase">{name}</Text>
        <HStack>
          <Heading>{price ?? "Free"}</Heading>
          {price && (
            <Box as="span" color="gray.600" fontSize="sm">
              / mo
            </Box>
          )}
        </HStack>
        <Divider borderColor="blackAlpha.500" />
        <List flex="1">
          {features.map((feat) => (
            <ListItem key={Math.random()}>
              <ListIcon as={CheckCircleIcon} color="gray.400" />
              {feat}
            </ListItem>
          ))}
        </List>
        <Box>
          <Button
            variant="solid"
            size="sm"
            width="100%"
            rightIcon={<ArrowForwardIcon />}
            borderRadius={0}
            display="flex"
            justifyContent="space-between"
            backgroundColor={popular ? "purple" : "purple"}
            _hover={{
              backgroundColor: popular ? "teal.500" : "gray.300"
            }}
            style={{padding: "0.5rem 1rem"}}
            color="white"
          >
            Buy
          </Button>
          <Text fontSize="xs">{info}</Text>
        </Box>
      </Stack>
    );
  };
  PricingBox.propTypes = {
    name: PropTypes.string.isRequired,
    popular: PropTypes.bool,
    price: PropTypes.string,
    info: PropTypes.string,
    features: PropTypes.array.isRequired
  };
  
  export default PricingBox;
  