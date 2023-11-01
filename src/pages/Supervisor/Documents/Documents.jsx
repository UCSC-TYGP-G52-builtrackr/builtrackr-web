import React, { useCallback } from 'react';
import { Box, Button, Text, VStack,Card, Center, SimpleGrid, Image ,ChakraProvider} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import axios from 'axios';
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { useStateContext } from "../../../contexts/ContextProvider";
import { BsChatDots } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Document, Page, pdfjs } from 'react-pdf';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const FileUpload = () => {

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();


  const [pdfUrls, setPdfUrls] = useState([]);

  
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDelete, setToDelete] = useState(null);
  const viewPdf = async (pdfUrl) => {
    const response = await axios.post(`http://localhost:4000/api/fileupload/uploads/Documents`,
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


    // Set the PDF URL to display

    window.open(url);
  };

  console.log(pdfUrls)


  useEffect(() => { 
  const fetchPdfUrls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/fileupload/uploads/Documents"
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
     console.log(acceptedFiles[0]);

    const res=await axios.post("http://localhost:4000/api/fileupload/uploads3", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("File uploaded successfully.");
    console.log(res)
    if(res.status === 200){
      toast.success("Uploaded Successfully")
    }
    
     window.location.reload()

    
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Error in uploading file") 
  }
}, []);

// const fetchPdfUrls = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:4000/api/fileupload/getpdfs"
//     );
//     console.log(response);
//     setPdfUrls(response.data);
//     console.log(pdfUrls);
//   } catch (error) {
//     console.error("Error fetching PDF URLs:", error);
//   }
//};

const deletePdf = async (filename) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/fileupload/uploads/Documents/${toDelete.name}`
    );
    // After successful deletion, update the PDF URLs in state
    setPdfUrls((prevUrls) =>
      prevUrls.filter((pdfUrl) => pdfUrl.name !== filename)
    );
    console.log(`PDF ${filename} deleted.`);
    onClose()

    if(pdfUrls != null){
     toast.success("Deleted Successfully") 
    }
    window.location.reload();
    
  } catch (error) {
    console.error(`Error deleting PDF ${filename}:`, error);
    toast.error("Error in deleting file") 
    // Show a Chakra UI error alert
    
  }
};

const openDeleteModal = ({ index }) => {
  onOpen();
  setToDelete(pdfUrls[index]);
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });




  return (
    <ChakraProvider>
    <>

  <div className="relative flex dark:bg-main-dark-bg w:100">
  {/* chatbot popup */}
  <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
    <button
      type="button"
      onClick={() => setThemeSettings(true)}
      style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
      className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
    >
      <BsChatDots />
    </button>
  </div>

  {activeMenu ? (
    <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
      <SideBar />
    </div>
  ) : (
    <div className="w-0 dark:bg-secondary-dark-bg">
      <SideBar />
    </div>
  )}
</div>
<div className="fixed w:100% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
  <NavBar />
</div>
{themeSettings && <ChatSpace />}

<div
  className={
    activeMenu
      ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-90  "
      : "bg-main-bg dark:bg-main-dark-bg  w-90 min-h-screen flex-2 "
  }
>
<div className=" w-full flex items-center justify-center">
              <div
                className="flex  w-full flex-col mt-40 ml-80"
              >
                <Box {...getRootProps()} cursor="pointer" className="max-w-lg ">
                  <input {...getInputProps()} />

                  <VStack
                    p={10}
                    spacing={10}
                    borderWidth={8}
                    borderRadius="md"
                    borderStyle="dashed"
                    ml={40}
                    
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

                <div className="p-4 mt-10 ml- -40">
                  <SimpleGrid columns={3} spacing={1} ml={-40}>
                    {pdfUrls.map((pdfUrl, index) => (
                      <Card
                        key={index}
                        maxW="250px"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        height="180px"
                      >
                        <Center height="100px">
                          <Image
                            src="/pdf.png"
                            alt="PDF Thumbnail"
                            width="10"
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
                            mt={2}
                           
                            colorScheme="blue"
                            onClick={() => viewPdf(pdfUrl)}
                            style={{
                              backgroundColor: "#ffcc00",
                              border: "none",
                              color: "black",
                              padding: "5px 5px",
                              fontSize: "14px",
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
                            ml={2}
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
<ToastContainer />
</> 
</ChakraProvider>
 );
};

export default FileUpload;