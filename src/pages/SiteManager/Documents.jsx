import React, { useCallback } from 'react';
import { Box, Button, Text, VStack,Card, Center, SimpleGrid, Image } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Navbar from '../../components/SiteManager/Navbar';
import Sidebar from '../../components/SiteManager/Sidebar';
import axios from 'axios';

const FileUpload = () => {
    const [pdfUrls, setPdfUrls] = useState([]);
    useEffect(() => {
        // Fetch the list of PDF URLs from your backend API here
        // Replace the dummy URLs with the actual URLs of your uploaded PDFs
        const dummyPdfUrls = [
          'https://example.com/pdf1.pdf',
          'https://example.com/pdf2.pdf',
          'https://example.com/pdf3.pdf',
        ];
        setPdfUrls(dummyPdfUrls);
      }, []);
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      await axios.post('/api/upload', formData, {
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
    <>
    <Sidebar /> 
    <Navbar />
    
    <div className='ml-[300px] flex items-center justify-center'>
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

    </div>
    


</>
  );
};

export default FileUpload;
