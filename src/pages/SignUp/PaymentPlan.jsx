import React, { useState } from 'react';
import { Box, Flex, Button, Text, VStack, HStack, Image } from '@chakra-ui/react';

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price:  '5000 LKR/Year',
      description1: '⊛ 1 Contruction Site.',
      description2: '⊛ Create User Roles.',
      description3: '⊛ 24/7 Support.',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '10000 LKR/Year',
      description1: '⊛ 5 Contruction Site.',
      description2: '⊛ Create User Roles.',
      description3: '⊛ 24/7 Support.',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '200000 LKR/Year',
      description1: '⊛ Unlimited Contruction Site.',
      description2: '⊛ Create User Roles.',
      description3: '⊛ 24/7 Support.',
      
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    if (selectedPlan) {
      // Perform Stripe Checkout process here
      alert(`You selected the ${selectedPlan.name} plan. Redirecting to Stripe Checkout...`);
    } else {
      alert('Please select a plan before proceeding to payment.');
    }
  };

  return (

    
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
                borderWidth={selectedPlan === plan ? '2px' : '1px'}
                borderColor={selectedPlan === plan ? 'red.500' : 'purple.500'}
                borderRadius="lg"
                p="6"
                cursor="pointer"
                transition="0.2s"
                onClick={() => handlePlanSelect(plan)}
                _hover={{
                  borderColor: 'red.500',
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
              bgColor: 'yellow.500',
            }}
          >
            Proceed to Payment
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default PaymentPlan;
