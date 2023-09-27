import React, { useCallback } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Card,
  Center,
  SimpleGrid,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

const FileUpload = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const toast = useToast();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDelete, setToDelete] = useState(null);
  const viewPdf = async (pdfUrl) => {
    const response = await axios.post(
      "http://localhost:4000/api/upload/downloadpdfs",
      {
        filename: pdfUrl.name,
      }
    );
    // get blob data from response
    const blob = await response.data;
    // convert blob to file
    const file = new File([blob], pdfUrl.name, { type: "application/pdf" });
    // build temporary URL from file
    const url = URL.createObjectURL(file);
    // open URL in new window
    window.open(url);
  };

  useEffect(() => {
    const fetchPdfUrls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/upload/getpdfs"
        );
        console.log(response);
        setPdfUrls(response.data);
        console.log(pdfUrls);
      } catch (error) {
        console.error("Error fetching PDF URLs:", error);
      }
    };

    fetchPdfUrls();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      
      formData.append("document", acceptedFiles[0]);
      

      await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      });

      console.log(formData);

      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    fetchPdfUrls();
  }, []);

  const fetchPdfUrls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/upload/getpdfs"
      );
      console.log(response);
      setPdfUrls(response.data);
      console.log(pdfUrls);
    } catch (error) {
      console.error("Error fetching PDF URLs:", error);
    }
  };

  const deletePdf = async (filename) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/upload/deletepdf/${toDelete.name}`
      );
      // After successful deletion, update the PDF URLs in state
      setPdfUrls((prevUrls) =>
        prevUrls.filter((pdfUrl) => pdfUrl.name !== filename)
      );
      console.log(`PDF ${filename} deleted.`);
      onClose()

      // Show a Chakra UI success alert
      toast({
        title: "PDF Deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Error deleting PDF ${filename}:`, error);

      // Show a Chakra UI error alert
      toast({
        title: "Error Deleting PDF",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    fetchPdfUrls();
  };

  const openDeleteModal = ({ index }) => {
    onOpen();
    setToDelete(pdfUrls[index]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ChakraProvider>
      <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div
            className="ml-[300px] flex w-full items-center justify-center h-full p-2 mt-[80px]"
          >
            <div className=" w-full flex items-center justify-center">
              <div
                className="flex items-center justify-center w-full flex-col"
              >
                <Box {...getRootProps()} cursor="pointer" className="max-w-lg ">
                  <input {...getInputProps()} />

                  <VStack
                    p={10}
                    spacing={4}
                    borderWidth={8}
                    borderRadius="md"
                    borderStyle="dashed"
                  >
                    {isDragActive ? (
                      <Text>Drop the file here ...</Text>
                    ) : (
                      <Text>
                        Drag and drop a PDF file here, or click to select one
                      </Text>
                    )}

                    <Button
                      colorScheme="blue"
                      style={{
                        backgroundColor: "#ffcc00",
                        border: "none",
                        color: "black",
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                        transition: "background-color 0.3s, box-shadow 0.3s",
                      }}
                    >
                      Upload PDF
                    </Button>
                  </VStack>
                </Box>

                <div className="p-4">
                  <SimpleGrid columns={3} spacing={4}>
                    {pdfUrls.map((pdfUrl, index) => (
                      <Card
                        key={index}
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Center height="150px">
                          <Image
                            src="/pdf.png"
                            alt="PDF Thumbnail"
                            width="20"
                          />
                        </Center>
                        <Box p="6">
                          <Text
                            as="h3"
                            fontSize="xl"
                            fontWeight="semibold"
                            isTruncated
                          >
                            {pdfUrl.name}
                          </Text>

                          <Button
                            mt={4}
                            colorScheme="blue"
                            onClick={() => viewPdf(pdfUrl)}
                            style={{
                              backgroundColor: "#ffcc00",
                              border: "none",
                              color: "black",
                              padding: "10px 20px",
                              fontSize: "16px",
                              borderRadius: "4px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                              cursor: "pointer",
                              transition:
                                "background-color 0.3s, box-shadow 0.3s",
                            }}
                          >
                            View Document
                          </Button>
                          <Button
                            colorScheme="red"
                            mr={4}
                            mt={2}
                           
                            onClick={() => openDeleteModal({ index })}

                          >
                            Delete
                          </Button>
                        </Box>
                      </Card>
                    ))}
                  </SimpleGrid>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Are you sure you want to delete the pdf? This pdf will
                        be deleted.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          No {pdfUrls.name}
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
              
                          onClick={() => deletePdf(pdfUrls.name)}
                        >
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ChakraProvider>
  );
};

export default FileUpload;
