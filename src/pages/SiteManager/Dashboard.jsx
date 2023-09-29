import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { FaRegCalendarMinus } from "react-icons/fa";
import { ContextProvider } from "../../contexts/ContextProvider";
import { Pie, Line, Doughnut } from "react-chartjs-2";
import { AiOutlinePlus } from "react-icons/ai";
import { io } from "socket.io-client";
import { decryptData } from "../../encrypt";

import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  useToast,
  ChakraProvider,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SMDashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [completion, setCompletion] = useState(0);
  const [siteCount, setSiteCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [data1, setData1] = useState(null);
  const [llcount, setLLCount] = useState(0);
  const [laborData, setLabourData] = useState([]);

  // const [data3, setData3] = useState(null);

  const generatePDF = () => {
    const input = document.body; // Capture the entire page
    const pdf = new jsPDF("p", "px", "a4");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("page.pdf");
    });
  };

  const DetailBox = ({ title, value, borderColor, onClick }) => {
    // Define styles for the container
    const boxStyles = {
      width: "200px",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      border: `2px solid ${borderColor}`, // Border color is passed as a prop
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      transition: "border-color 0.5s", // Smooth color transition for the border
      cursor: "pointer", // Add a pointer cursor for interaction
    };

    // Define styles for the title and value
    const titleStyles = {
      fontSize: "24px",
      fontWeight: "bold",
    };

    const valueStyles = {
      fontSize: "48px",
      fontWeight: "bold",
    };

    return (
      <div
        style={boxStyles}
        onClick={onClick} // Handle the click event
      >
        <h1 style={valueStyles}>{value}</h1>
        <h2 style={titleStyles}>{title}</h2>
      </div>
    );
  };

  // Array of background colors
  const borderColors = ["#4169e1", "#fbec5d", "red", "lightgreen"];

  // State to track the current border color index
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Function to handle border color change
  const handleBorderColorChange = () => {
    // Cycle through the borderColor array
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % borderColors.length);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data3 = {
    labels,
    datasets: [
      {
        label: "Approved",
        data: [300, 50, 100, 200, 500, 250, 400],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Rejected",
        data: [100, 200, 150, 50, 200, 100, 300],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/labor/data")
      .then((response) => {
        setLabourData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/task/completion")
      .then((response) => {
        console.log(response.data.count);
        setCompletion(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching task completion:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/labourleave/leavecount")
      .then((response) => {
        setLLCount(response.data.count);
        console.log("countl", response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching leave count:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/labourleave/leavedata") // Replace with your actual backend API endpoint for leave count
      .then((response) => {
        // Assuming your API response contains the leave count
        setLeaveCount(response.data.count);
        console.log("count", response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching leave count:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sitemanager/countsites")
      .then((response) => {
        setSiteCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching site count:", error);
      });
  }, []);
  const [task, setTask] = useState({
    taskName: "",
    specialInformation: "",
    dueDate: "",
  });

  const employeeNo = decryptData(JSON.parse(localStorage.getItem("no")));
  const [socket, setSocket] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:4000/"));
  }, []);
  console.log(socket);

  useEffect(() => {
    socket?.emit("newUser", employeeNo);
  }, [socket]);

  const AddTask = async (e) => {
    socket.emit("sendTaskNotification", {
      reciver: 23,
      sender: employeeNo,
    });
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/task/addtask",
        {
          taskName: task.taskName,
          specialInformation: task.specialInformation,
          dueDate: task.dueDate,
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
        setTimeout(() => {
          navigate("/sitemanager/dashboard");
        }, 2000);
      } else {
        setIsErrorAlertOpen(true);
      }
    } catch (error) {
      setIsErrorAlertOpen(true);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/task/taskcount")
      .then((response) => {
        setTaskCount(response.data.count);
        console.log(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching task count:", error);
      });
  }, []);

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Dataset",
        data: [taskCount - completion, taskCount], // Removed .toString()
        backgroundColor: ["rgb(8, 143, 143, 0.9)", "rgb(255, 99, 71,0.9)"], // Red and green colors with higher opacity (0.5)

        borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/task/taskcount")
      .then((response) => {
        setTaskCount(response.data.count);
        console.log(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching task count:", error);
      });
  }, []);

  const data2 = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Dataset",
        data: [taskCount - completion, taskCount], // Removed .toString()
        backgroundColor: ["rgb(8, 143, 143, 0.9)", "rgb(255, 99, 71,0.9)"], // Red and green colors with higher opacity (0.5)

        borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
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

  const sendNotification = () => {
    socket.emit("sendTaskNotification", {
      reciver: 3,
      sender: employeeNo,
    });
  };

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <div className="flex">
          {/* {taskData.length > 0 ? (
              <Doughnut data={data} />
            ) : (
              <p>Loading data...</p>
            )} */}
          <Sidebar />
          <div className="flex flex-col w-full items-center justify-center ml-[400px]">
            <div className="flex w-full items-center justify-evenly p-5 mt-16 mx-4">
              <DetailBox
                backgroundColor={borderColors[0]}
                borderColor="green"
                onClick={handleBorderColorChange}
                title="Site Count"
                value={siteCount.toString()}
              />
              <DetailBox
                title="Total Tasks"
                borderColor="orange"
                value={taskCount.toString()}
                backgroundColor={borderColors[0]}
                onClick={handleBorderColorChange}
              />

              <DetailBox
                title="Completed Tasks"
                value={completion}
                borderColor="blue"
                backgroundColor={borderColors[0]}
                onClick={handleBorderColorChange}
              />
              <DetailBox
                title="Number of Leaves"
                value={llcount.toString()}
                backgroundColor={borderColors[0]}
                borderColor="red"
                onClick={handleBorderColorChange}
              />
            </div>
            <button
              style={{ marginLeft: "50px", height: "50px" }}
              onClick={sendNotification}
            >
              Send Notification
            </button>

            <div className="flex w-full gap-2 items-center justify-evenly">
              <div className="w-1/2 flex items-center justify-center mt-4">
                <div className="flex gap-4 flex-col w-2/5 items-center justify-center  mt-6">
                  <h1 className="text-2xl font-bold">Site Havelock</h1>
                  <div className="w-80 h-80">
                    {" "}
                    {/* Adjust the width and height as needed */}
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
                <div className="flex gap-4 flex-col w-2/5 items-center justify-center ml-10 mt-6 ">
                  <h1 className="text-2xl font-bold">Site Kumbuka</h1>
                  <div className="w-80 h-80">
                    {" "}
                    {/* Adjust the width and height as needed */}
                    <Doughnut data={data2} options={options} />
                  </div>
                </div>
                {/* <div className="flex gap-2 flex-col w-2/5 items-center justify-center">
                  <h1 className="text-2xl font-bold">Site 2</h1>
                  <Pie data={data2} className="w-1/2" />
                </div> */}
              </div>
              <div className="w-1/2 flex items-center p-3 justify-center">
                <Line options={options} data={data3} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Grid
            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={4}
            style={{ width: "70%", marginLeft: "25%", marginTop: "5%" }}
          >
            <Table variant="simple" size="lg">
              <TableCaption placement="top">
                <Text as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                  Site Labour Details
                </Text>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Labor Name</Th>
                  <Th>Labor Type</Th>
                  <Th>Site Name</Th>
                  <Th>Emergency Contact</Th>
                  <Th>Leave Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {laborData.map((row) => (
                  <Tr key={row.labor_id}>
                    <Td>{row.labourname}</Td>
                    <Td>{row.labourtype}</Td>
                    <Td>{row.site_id}</Td>
                    <Td>{row.site_id}</Td>
                    <Td>{row.site_id}</Td>

                    <Td>
                      <Button
                        colorScheme="green"
                        // Disable the button if status is approved
                        w="120px"
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Grid>
        </div>
      </ChakraProvider>
    </>
  );
};

export default SMDashboard;
