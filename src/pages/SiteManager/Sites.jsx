import React from "react";
import SiteCard from "../../components/SiteManager/SiteCard";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { decryptData } from "../../encrypt";

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
import { GiConsoleController } from "react-icons/gi";

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
  const [mquantity, setmQuantity] = useState(1); // Initialize quantity with 1
  const [selectedType, setSelectedType] = useState("tubes");
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedEquipmentName, setSelectedEquipmentName] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterialName, setSelectedMaterialName] = useState(null);
  const [isSupervisorSelected, setIsSupervisorSelected] = useState(false);
  const [supDetails, setSupDetails] = useState([]);

  const [selectedSiteIds, setSelectedSiteIds] = useState([]);

  const GetSupervisorDetails = async (siteId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/sitemanager/getsupervisor/${siteId}`
      );
      if (response.status === 200) {
        setSupDetails(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error getting supervisor details:", error);
      // Handle the error appropriately (e.g., show an error message).
    }
  };
  

  const onClose = () => {
    setIsOpen(false);
    setSelectedSite(null);
  };

  const openModal = (siteID) => {
    setSelectedSite(siteID);
    GetSupervisorDetails(siteID);
    setIsOpen(true);
    const isSupervisorSelected =
      sites.find((site) => site.site_id === siteID).supervisorid !== null;
    console.log(sites.find((site) => site.site_id === siteID));
    console.log(siteID);
    if (isSupervisorSelected) {
      setIsSupervisorSelected(true);
    } else {
      setIsSupervisorSelected(false);
    }
  };

  useEffect(() => {
    const employee_id = decryptData(JSON.parse(localStorage.getItem("no")));
    axios
      .get("http://localhost:4000/api/sitemanager/getsiteids/" + employee_id)
      .then((response) => {
        const siteIds = response.data.map((site) => site.site_id);
        setSelectedSiteIds(siteIds);
        for (let i = 0; i < siteIds.length; i++) {
          GetSites(siteIds[i]);
        }
      })
      .catch((error) => {
        console.error("Error fetching site ids:", error);
      });
  }, []);

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
        supervisorID: supervisor.no,
        supervisorName: supervisor.f_name,
        siteID: selectedSite,
      })
      .then(async (res) => {
        if (res.status === 200) {
          await axios
            .get("http://localhost:4000/api/sitemanager/viewsites")
            .then((res) => {
              if (res.status === 200) {
                //request was succussful
                console.log(res.data);
                setSites(res.data);
              }
            });
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
    console.log(selectedSite);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/task/addtask",
        {
          taskName: task.taskName,
          specialInformation: task.specialInformation,
          dueDate: task.dueDate,
          siteID: selectedSite,
          siteName: sites.find((site) => site.site_id === selectedSite),
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

  const GetSites = async (siteId) => {
    console.log("sites", siteId);
    await axios
      .get(`http://localhost:4000/api/sitemanager/viewsites/${siteId}`)
      .then((res) => {
        if (res.status === 200) {
          //request was succussful
          console.log(res.data);
          setSites((prevSites) => {
            const newSites = prevSites.concat(
              res.data.filter(
                (site) =>
                  !prevSites.some(
                    (prevSite) => prevSite.site_id === site.site_id
                  )
              )
            );
            return newSites;
          });
        }
      });
  };



  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    // Get the current date in YYYY-MM-DD format
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };
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
  // Get and assign Equipments to the site
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sitemanager/getequipment")
      .then((res) => {
        if (res.status === 200) {
          setEquipmentList(res.data);
        }
      })
      .catch((error) => {
        console.log("Error in equipment list");
      });
  }, []);

  const assignEquipmentToSite = () => {
    console.log(setSelectedEquipmentName);
    if (selectedSite && selectedEquipment) {
      axios
        .post("http://localhost:4000/api/sitemanager/assignequipment", {
          siteid: selectedSite,
          equipmentid: selectedEquipment,
          quantity: quantity,
          name: selectedEquipmentName,
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
  //get and assign material to site
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sitemanager/getmaterial")
      .then((res) => {
        if (res.status === 200) {
          console.log("Material List");
          console.log(res.data);
          setMaterialList(res.data);
        }
      })
      .catch((error) => {
        console.log("Error in material list");
      });
  }, []);

  const assignMaterialToSite = () => {
    const currentDate = getCurrentDate();
    console.log(currentDate);
    console.log("selectedMaterialName");
    if (selectedSite && selectedMaterial) {
      axios
        .post("http://localhost:4000/api/sitemanager/assignmaterial", {
          siteid: selectedSite,
          materialid: selectedMaterial,
          quantity: quantity,
          date: currentDate,
          type: selectedType,
          name: selectedMaterialName,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);

            // Show success toast
            toast({
              title: "Material Assigned Successfully",
              description: "Material Assigned Successfully",
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
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleIncrease = () => {
    setmQuantity(mquantity + 1);
  };

  const handleDecrease = () => {
    if (mquantity > 1) {
      setmQuantity(mquantity - 1);
    } else {
      alert("Minimum quantity is 1");
    }
  };
  const supervisorPaths = [
    '/set1.png',
    '/set2.png',
    '/set3.png',
    '/set4.png',
    '/set5.png',
    // Add more image paths here
  ];

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <div className="flex">
          <Sidebar />

          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent
              style={{ width: "1500px", marginLeft: "10%", marginTop: "5%" }}
            >
              <ModalHeader style={{ fontSize: "24px" }}>
                Select a Supervisor
              </ModalHeader>

              <ModalCloseButton />
              <ModalBody>
                <Box p={8}>
                  <Grid templateColumns="repeat(3, minmax(200px, 1fr))" gap={4}>
                    {!isSupervisorSelected &&
                      supervisors.map((supervisor) => (
                        <Box
                          key={supervisor.no}
                          borderWidth="1px"
                          borderRadius="md"
                          p={4}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          className={`${
                            sites.find((site) => site.site_id === selectedSite)
                              ?.supervisorID === supervisor.no
                              ? "supervisor-selected"
                              : ""
                          } ${
                            isSupervisorSelected &&
                            sites.find((site) => site.site_id === selectedSite)
                              ?.supervisorID === supervisor.no
                              ? "supervisor-selected"
                              : ""
                          }`}
                        >
                          <Image
                            src={supervisorPaths[Math.floor(Math.random() * supervisorPaths.length)]}
                            alt={supervisor.name}
                            boxSize="150px"
                            objectFit="cover"
                            mb={4}
                          />
                          <Text fontWeight="bold" mb={2}>
                            {supervisor.f_name} {supervisor.l_name}
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
                    {isSupervisorSelected && (
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "green",
                            fontSize: "20px",
                          }}
                        >
                          {supDetails.f_name} {supDetails.l_name} is already
                        selected as the Site Supervisor. 
                        </p>
                        <p></p>
                      </div>
                    )}
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
                      Select Equipments
                    </label>

                    {/* Material selection dropdown */}

                    <select
                      onChange={(e) => {
                        setSelectedEquipment(e.target.value);
                        // Set the selected equipment_id
                        const selectedEquipment = equipmentList.find(
                          (equipment) =>
                            equipment.equipment_id === parseInt(e.target.value)
                        );
                        if (selectedEquipment) {
                          setSelectedEquipmentName(
                            selectedEquipment.equipment_name
                          );
                        }
                      }}
                      value={selectedEquipment}
                    >
                      <option value={null}>Select Equipment</option>
                      {equipmentList.map((equipment) => (
                        <option
                          key={equipment.equipment_id}
                          value={equipment.equipment_id}
                        >
                          {equipment.equipment_name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1" // Minimum quantity should be 1
                      className="mt-2"
                    />
                    <div style={{ margin: "22px 0" }}></div>
                    {/* Button to assign material to the selected site */}
                    <button
                      onClick={assignEquipmentToSite}
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      style={{ backgroundColor: "#FFCC00" }}
                      type="button"
                    >
                      Assign Equipment
                    </button>
                  </div>

                  <div className="flex items-center justify-center flex-col">
                    <label
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "60px",
                      }}
                    >
                      Select 
                      Materials
                    </label>

                    {/* Material selection dropdown */}

                    <select
                      onChange={(e) => {
                        setSelectedMaterial(e.target.value);
                        // Set the selected material_id
                        const selectedMaterial = materialList.find(
                          (material) =>
                            material.material_id === parseInt(e.target.value)
                        );
                        if (selectedMaterial) {
                          setSelectedMaterialName(
                            selectedMaterial.material_name
                          );

                          console.log(selectedMaterialName);
                        }
                      }}
                      value={selectedMaterial}
                    >
                      <option value={null}>Select Material</option>
                      {materialList.map((material) => (
                        <option
                          key={material.material_id}
                          value={material.material_id}
                        >
                          {material.material_name}
                        </option>
                      ))}
                    </select>

                    <select
                      id="typeSelect"
                      value={selectedType}
                      onChange={handleTypeChange}
                      className="mt-2"
                    >
                      <option value={null}>Select Type</option>
                      <option value="Tubes">Tubes</option>
                      <option value="Cubes">Cubes</option>
                      <option value="Packets">Packets</option>
                      <option value="Dozen">Dozen</option>
                    </select>

                    <input
                      type="number"
                      value={mquantity}
                      onChange={(e) => setmQuantity(e.target.value)}
                      min="1" // Minimum quantity should be 1
                      className="mt-2"
                      id="quantityInput"
                    />
                    {/* <button onClick={handleDecrease}>-</button>
                    <button onClick={handleIncrease}>+</button> */}
                    {/* Button to assign material to the selected site */}
                    <button
                      onClick={assignMaterialToSite}
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      style={{ backgroundColor: "#FFCC00" }}
                      type="button"
                    >
                      Assign Material
                    </button>
                  </div>

                  {/* Site selection dropdown */}
                  <div className="flex items-center justify-center flex-col">
                    {/* Labour selection dropdown */}
                    <label
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "30px",
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
                          {labour.f_name}
                        </option>
                      ))}
                    </select>
                    <div style={{ margin: "30px 0" }}></div>
                    {/* Button to assign labour to the selected site */}
                    <button
                      onClick={assignLabourToSite}
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
                      style={{ backgroundColor: "#FFCC00" }}
                      type="button"
                    >
                      Assign to Site
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
            <div className="mt-2 ml-10 flex flex-col w-full h-full justify-center align-items-center gap-8 ">
              <Text className="text-center text-3xl font-bold">
                Allocated Sites
              </Text>

              <div className="dashboard items-center justify-center flex flex-wrap gap-2 p-2">
                {sites.map((site, index) => (
                  <div
                    className="flex justify-center"
                    onClick={() => openModal(site.site_id)}
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
        </div>
      </ChakraProvider>
    </>
  );
};

export default SiteDashboard;
