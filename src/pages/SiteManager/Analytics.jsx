import React from 'react';
import { ChakraProvider, Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Navbar from '../../components/SiteManager/Navbar';
import Sidebar from '../../components/SiteManager/Sidebar';

// 

const projectsData = {
  taskDue: 15,
  taskCompleted: 85,
  taskRejected: 5,
  workers: 30,
};

const Analytics =() =>{
  return (
    <>
    <Sidebar /> 
    <Navbar />
    <ChakraProvider>
    <Box p={8}>
      <Heading as="h1" mb={4}>
        Welcome to Site Kumbuka
      </Heading>
      <Flex justifyContent="flex-end" mt={10} mb={10}>
      <Box ml={4}>
            <Link to="/sitemanager">
              <Button colorScheme="orange">Add Task</Button>
            </Link>
            </Box>
            <Box ml={4}>
            <Link to="/sitemanager/supervisor">
              <Button colorScheme="orange">Add Supervisor</Button>
            </Link>
            </Box>
            <Box ml={4}>
            <Link to="/sitemanager/documents">
              <Button colorScheme="orange">Add Documents</Button>
            </Link>
            </Box>
          </Flex>
       
      <Flex justifyContent="center" mt={6}>
        <Box
        ml={4}
          w="15%"
          p={4}
          boxShadow="md"
          rounded="md"
          bg="orange.200"
          border="4px solid orange"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            To Do Tasks
          </Text>
          <Text fontSize="3xl">{projectsData.taskDue}</Text>
        </Box>
        <Box
        ml={4}
          w="15%"
          p={4}
          boxShadow="md"
          rounded="md"
          borderColor="gr.500"
          bg="green.200"
          border="4px solid green"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Completed Tasks
          </Text>
          <Text fontSize="3xl">{projectsData.taskCompleted}</Text>
        </Box>
        <Box
        ml={4}
          w="15%"
          p={4}
          boxShadow="md"
          rounded="md"
          bg="red.200"
          border="4px solid red"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Tasks Rejected
          </Text>
          <Text fontSize="3xl">{projectsData.taskRejected}</Text>
        </Box>
        <Box
        ml={4}
         w="15%" 
         p={4} 
         boxShadow="md" 
         rounded="md"
         border="4px solid black">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Workers
          </Text>
          <Text fontSize="3xl">{projectsData.workers}</Text>
        </Box>
      </Flex>
    </Box>
  </ChakraProvider>  
  </>);
}

export default Analytics;
