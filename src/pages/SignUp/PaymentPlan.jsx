import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
useEffect(() => {
  // Fetch the publishable key from the server
  fetch('http://localhost:4000/api/payment/secret')
    .then((res) => res.json())
    .then((data) => {
      // Initialize Stripe.js
      console.log(data);
    }
    );
}, []);

const stripePromise = loadStripe('pk_test_51NY6q2D8G4Qm0m3hAbBVmResDXsSsCqPMo5cj5C6fyACU1jSlUZkAfRUaDQaC4Fgs3OMHEkAtBKcms9UZ4eo7NpB00DgX4IkE4');

const options = {
  // passing the client secret obtained from the server
  clientSecret: 'sk_test_51NY6q2D8G4Qm0m3hOsriIZQ95DweofBM2mYWrA5Pczx7zzHr8xuBvIZjmaLo1XjtYGrxfNywwCWXh2KL3kvZjka000d9V8z9b4',
};

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "5000 LKR/Year",
      description1: "⊛ 1 Contruction Site.",
      description2: "⊛ Create User Roles.",
      description3: "⊛ 24/7 Support.",
    },
    {
      id: "standard",
      name: "Standard",
      price: "10000 LKR/Year",
      description1: "⊛ 5 Contruction Site.",
      description2: "⊛ Create User Roles.",
      description3: "⊛ 24/7 Support.",
    },
    {
      id: "premium",
      name: "Premium",
      price: "200000 LKR/Year",
      description1: "⊛ Unlimited Contruction Site.",
      description2: "⊛ Create User Roles.",
      description3: "⊛ 24/7 Support.",
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async() => {
    if (selectedPlan) {
      
        const response = await fetch('http://localhost:4000/api/payment/secret');
        console.log(response);
        const {client_secret: clientSecret} = await response.json();
    }
        
        // Render the form using the clientSecret
      
  };

  return (
    <>
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
    <Flex>
      <Flex>
        <VStack as="main" spacing="4" align="stretch" p="4">
          {/* Your main content here */}
        </VStack>
      </Flex>

      <VStack as="main" spacing="4" align="stretch" p="4">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Select Payment Plan
        </Text>

        <Flex justify="center">
          <HStack spacing="8">
            {plans.map((plan) => (
              <Box
                key={plan.id}
                borderWidth={selectedPlan === plan ? "2px" : "1px"}
                borderColor={selectedPlan === plan ? "red.500" : "purple.500"}
                borderRadius="lg"
                p="6"
                cursor="pointer"
                transition="0.2s"
                onClick={() => handlePlanSelect(plan)}
                _hover={{
                  borderColor: "red.500",
                }}
              >
                <Text fontSize="2xl" fontWeight="bold" mb="4" color="#0033FF">
                  {plan.name}
                </Text>
                <Text fontSize="xl" fontWeight="bold" mb="2">
                  {plan.price}
                </Text>
                <Text fontSize="sm" color="gray.600" mt="2" lineHeight="1.5">
                  {plan.description1}
                </Text>
                <Text fontSize="sm" color="gray.600" mt="2" lineHeight="1.5">
                  {plan.description2}
                </Text>
                <Text fontSize="sm" color="gray.600" mt="2" lineHeight="1.5">
                  {plan.description3}
                </Text>
              </Box>
            ))}
          </HStack>
        </Flex>

        <Box textAlign="center">
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={handlePayment}
            disabled={!selectedPlan}
            _hover={{
              bgColor: "yellow.500",
            }}
          >
            Proceed to Payment
          </Button>
        </Box>
      </VStack>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Select Payment Plan
      </Text>
    </Flex>
    </>
  );
};

export default PaymentPlan;
