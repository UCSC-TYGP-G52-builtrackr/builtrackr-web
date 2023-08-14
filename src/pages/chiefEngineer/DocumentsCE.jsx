import React, { useCallback } from 'react';
import { Box, Button, Text, VStack,Card, Center, SimpleGrid, Image, ChakraProvider } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Navbar from '../../components/ChiefEngineer/Navbar';
import SidebarCE from '../../components/ChiefEngineer/SidebarCE';
import axios from 'axios';

const DocumentsCE = () => {
    const [pdfUrls, setPdfUrls] = useState([]);
    const viewPdf = (pdfUrl) => {
      window.open(pdfUrl, '_blank'); // Open the PDF URL in a new tab or window
    };
  
    useEffect(() => {

      const fetchPdfUrls = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/upload/getpdfs');
          console.log(response);
          setPdfUrls(response.data);
        } catch (error) {
          console.error('Error fetching PDF URLs:', error);
        }
      };
  
      fetchPdfUrls();
    }, []);
   
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append('document', acceptedFiles[0]);

      await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }


  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ChakraProvider>
    <>
    <Navbar />
    <div className='flex'>
    <SidebarCE/>
    <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]" style={{width:"80%",marginLeft:"18%"}} >
    <div className='ml-[300px] flex items-center justify-center'>
    <div className='flex flex-col' style={{width:"80%",marginRight:"18%"}}>
    <Box {...getRootProps()} cursor="pointer" className='max-w-lg '>
      <input {...getInputProps()} />

      <VStack p={10} spacing={4} borderWidth={8} borderRadius="md" borderStyle="dashed">
        {isDragActive ? (
          <Text>Drop the file here ...</Text>
        ) : (
          <Text>Drag 'n' drop a PDF file here, or click to select one</Text>
        )}

        <Button colorScheme="blue" style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '10px 20px',
        fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      }}>Select PDF</Button>
      </VStack>
    </Box>
    
    <div className="p-4">
        <SimpleGrid columns={3} spacing={4}>
          {pdfUrls.map((pdfUrl, index) => (
            <Card key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Center height="150px">
                <Image src="/path/to/your/pdf-thumbnail.png" alt="PDF Thumbnail" />
              </Center>
              <Box p="6">
                <Text as="h3" fontSize="xl" fontWeight="semibold" isTruncated>
                  {pdfUrl.name}
                </Text>
             
                <Button mt={4} colorScheme="blue" onClick={() => viewPdf(pdfUrl.path)} style={{
                backgroundColor: "#ffcc00",
                border: "none",
                color: "black",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "background-color 0.3s, box-shadow 0.3s",
              }}>
                  View Document
                </Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>

    </div>
    </div>
    </div>


</>
</ChakraProvider>
  );
};

export default DocumentsCE;
