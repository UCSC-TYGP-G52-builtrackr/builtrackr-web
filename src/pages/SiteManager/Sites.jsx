import React from "react";
import SiteCard from "../../components/SiteManager/SiteCard";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
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

// const sites =
//   { id: 1, name: "Kumbuka" },
//   { id: 2, name: "Havelock" },

// ];

const SiteDashboard = () => {
  const imageFilenames = JSON.parse(localStorage.getItem("imagePaths")) || [];
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [labourList, setLabourList] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [sites, setSites] = useState([]);
  
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [materialList,setMaterialList] = useState([]);




  const onClose = () => {
    setIsOpen(false);
    setSelectedSite(null);
  };

  const openModal = (siteID) => {
    setSelectedSite(siteID);
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
    //axios request to the backend to assign the supervisor

    axios
      .post("http://localhost:4000/api/sitemanager/selectsupervisor", {
        supervisorID: supervisor.id,
        supervisorName: supervisor.name,
        siteID: selectedSite,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
        toast({
          title: "Supervisor Selected",
          description: "Supervisor has been selected successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });

    onClose();
  };
  const [task, setTask] = useState({
    taskName: "",
    specialInformation: "",
    dueDate: "",
  });

  const AddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/task/addtask",
        {
          taskName: task.taskName,
          specialInformation: task.specialInformation,
          dueDate: task.dueDate,
          siteId: selectedSite.id,
        }
      );

      if (response.status === 201) {
        setIsSuccessAlertOpen(true);
        toast({
          title: "Task Added.",
          description: "Added Task Succesfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTask({
          taskName: "",
          specialInformation: "",
          dueDate: "",
        });

        onclose();
        setTimeout(() => {}, 2000);
      } else {
        setIsErrorAlertOpen(true);
      }
    } catch (error) {
      setIsErrorAlertOpen(true);
    }
  };

  const GetSites = async (e = null) => {
    if (e) e.preventDefault();
    await axios
      .get("http://localhost:4000/api/sitemanager/viewsites")
      .then((res) => {
        if (res.status === 200) {
          //request was succussful
          console.log(res.data);
          setSites(res.data);
        }
      });
  };

  useEffect(() => {
    GetSites();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = now.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sitemanager/labour")
      .then((res) => {
        if (res.status === 200) {
          console.log("Labour List");
          console.log(res.data);
          setLabourList(res.data);
        }
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const assignLabourToSite = () => {
    console.log(selectedSite, selectedLabour);
    if (selectedSite && selectedLabour) {
      axios
        .post("http://localhost:4000/api/sitemanager/assignlabour", {
          siteID: selectedSite,
          labourID: selectedLabour,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);

            // Show success toast
            toast({
              title: "Labour Assigned Successfully",
              description: "Labour Assigned Successfully",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            // Handle error
          }
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sitemanager/getequipment")
      .then((res) => {
        if (res.status === 200) {
          console.log("Equipment List");
          console.log(res.data);
          setEquipmentList(res.data);
        }
      })
      .catch((error) => {
        console.log("Error in epquipmwnt list");
      });
  }, []);

  const assignEquipmentToSite = () => {
    if (selectedSite && selectedEquipment) {
      axios
        .post("http://localhost:4000/api/sitemanager/assignequipment", {
          siteid: selectedSite,
          equipmentid: selectedEquipment,
          quantity: quantity,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);

            // Show success toast
            toast({
              title: "Equipment Assigned Successfully",
              description: "Equipment Assigned Successfully",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            // Handle error
          }
        })
        .catch((error) => {
          // Handle error
        });
    }
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

                <div className="flex items-center gap-10 justify-center">
                  <form className="bg-white w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <div className="text-2xl text-center font-bold mb-2 mt-10">
                      Add a Task
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="username"
                      >
                        Task Name
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="taskName"
                        id="username"
                        type="text"
                        placeholder="Task Name"
                        value={task.taskName}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="username"
                      >
                        Special Information
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Info"
                        name="specialInformation"
                        value={task.specialInformation}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="username"
                      >
                        Due Date
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="date"
                        placeholder="Due Date"
                        name="dueDate"
                        value={task.dueDate}
                        min={getCurrentDate()}
                        onChange={(e) => handleChange(e)}
                      />

                      <div className="flex items-center justify-center">
                        <button
                          className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
                          style={{ backgroundColor: "#FFCC00" }}
                          type="button"
                          onClick={(e) => AddTask(e)}
                        >
                          Add Task
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="flex items-center justify-center flex-col">
                    <label
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      Select Equipment
                    </label>

                    {/* Material selection dropdown */}
                   
                    <select
                      onChange={(e) => setSelectedEquipment(e.target.value)}
                      value={selectedEquipment}
                    >
                      <option value={null}>Select Equipment</option>
                      {equipmentList.map((equipment) => (
                        <option
                          key={equipment.materialid}
                          value={equipment.materialid}
                        >
                          {equipment.materialname}
                        </option>
                      ))}
                    </select>

                    {/* Quantity input field */}
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1" // Minimum quantity should be 1
                      className="mt-2"
                    />

                    {/* Button to assign material to the selected site */}
                    <button
                      onClick={assignEquipmentToSite}
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      style={{ backgroundColor: "#FFCC00" }}
                      type="button"
                    >
                      Assign Epquipment to Site
                    </button>
                  </div>

                  {/* Site selection dropdown */}
                  <div className="flex items-center justify-center flex-col">
                    {/* Labour selection dropdown */}
                    <label
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      Select Labours
                    </label>
                    <select
                      onChange={(e) => setSelectedLabour(e.target.value)}
                      value={selectedLabour}
                    >
                      <option value={null}>Select a Labour</option>
                      {labourList.map((labour) => (
                        <option key={labour.labourid} value={labour.labourid}>
                          {labour.labourname}
                        </option>
                      ))}
                    </select>

                    {/* Button to assign labour to the selected site */}
                    <button
                      onClick={assignLabourToSite}
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
                      style={{ backgroundColor: "#FFCC00" }}
                      type="button"
                    >
                      Assign Labour to Site
                    </button>
                  </div>
                </div>
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
                <div
                  className="flex justify-center"
                  onClick={() => openModal(site.siteid)}
                >
                  <SiteCard
                    key={site.siteid}
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
