import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Box, Grid, Image, Text, Button } from "@chakra-ui/react";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";

const SMSupervisor = () => {
  const [supervisors, setSupervisors] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]">
          <div className="mt-2 flex flex-col w-full h-full justify-start items-center">

          <Box p={8}>
            <Grid
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              gap={4}
            >
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
                    src={supervisor.photo}
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
                      transition: "background-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    Select as the <br />
                    Supervisor
                  </Button>
                </Box>
              ))}
            </Grid>
          </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMSupervisor;
