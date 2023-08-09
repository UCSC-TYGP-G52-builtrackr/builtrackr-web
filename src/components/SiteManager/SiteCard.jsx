import React from "react";
import { Box, Text, Grid, Image, Card, CardBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SiteCard = ({ site }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/${site.id}`);
  };

  return (
<Card
      width="500px"
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      onClick={handleCardClick}
    >
      {/* You can customize the image source and other image properties here */}
      <Image src={site.imageSrc} alt="Site Image" h="150px" objectFit="cover" />
      <CardBody>
        <Text fontSize="xl" fontWeight="bold">
          {site.name}
        </Text>
      </CardBody>
    </Card>
  );
};


const SiteCardGrid = () => {
  const citiesData = [
    {
      id: 1,
      name: "New York",
      imageSrc: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "San Francisco",
      imageSrc: "https://via.placeholder.com/300",
    },
    // Add more city data objects here
  ];

  return (
    <Grid
      templateColumns="repeat(3, 1fr)" // Three Card components in one row
      gap={4} // Customize the gap between grid items here
    >
      {citiesData.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </Grid>
  );
};

export default SiteCard;
