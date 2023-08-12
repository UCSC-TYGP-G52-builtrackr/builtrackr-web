import React from "react";
import SiteCard from "../../components/SiteManager/SiteCard";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ChakraProvider,
  Box,
  Grid,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

const imagePaths = [
  "kumbuka.jpg",
  "havelock.jpg",
  "kaduwela.jpg",
  "horana.jpeg",
];

localStorage.setItem("imageFilenames", JSON.stringify(imagePaths));

const sites = [
  { id: 1, name: "Kumbuka" },
  { id: 2, name: "Havelock" },
  { id: 3, name: "Kaduwela" },
  { id: 4, name: "Horana" },
];

const SiteDashboard = () => {
  const imageFilenames = JSON.parse(localStorage.getItem("imagePaths")) || [];
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const [supervisors, setSupervisors] = useState([]);
  const toast = useToast();
  useEffect(() => {
    // Fetch supervisor data from the database
    const ViewSupervisors = async (e = null) => {
      if (e) e.preventDefault();
      await axios
        .get("http://localhost:4000/api/sitemanager/supervisor")
        .then((res) => {
          if (res.status === 200) {
            //request was succussful
            console.log(res.data);
            setSupervisors(res.data);
          }
        });
    };
    ViewSupervisors();
  }, []);

  const selectSupervisor = (supervisor) => {
    //Request
    toast({
      title: "Supervisor Selected",
      description: "Supervisor has been selected successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent style={{ width: "1000px", marginLeft: "10%" }}>
              <ModalHeader>Select a Supervisor</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p={8}>
                  <Grid templateColumns="repeat(3, minmax(200px, 1fr))" gap={4}>
                    {supervisors.map((supervisor) => (
                      <Box
                        key={supervisor.id}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Image
                          src="/supervisor.png"
                          alt={supervisor.name}
                          boxSize="150px"
                          objectFit="cover"
                          mb={4}
                        />
                        <Text fontWeight="bold" mb={2}>
                          {supervisor.name}
                        </Text>
                        <Text>{supervisor.availability}</Text>
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
                            transition:
                              "background-color 0.3s, box-shadow 0.3s",
                          }}
                          onClick={() => selectSupervisor(supervisor)}
                        >
                          Assign Supervisor
                        </Button>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <div
            className="flex w-full items-center justify-center h-full p-2 mt-[80px]"
            gap={4}
            style={{ width: "80%", marginLeft: "18%", marginTop: "10%" }}
          >
            <div className="dashboard items-center justify-center flex flex-wrap gap-2 p-2">
              {sites.map((site, index) => (
                <div className="flex justify-center" onClick={openModal}>
                  <SiteCard
                    key={site.id}
                    site={site}
                    imagePath={`/` + imagePaths[index]}
                    className="min-w-[300px] max-w-[300px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default SiteDashboard;
