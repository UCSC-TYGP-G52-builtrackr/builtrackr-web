import React from "react";
import { Box, Text, Grid, Image, Card, CardBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SiteCard = ({ site, imagePath }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        width="300px"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        cursor="pointer"
        _hover={{ bg: "gray.100" }}
        className="max-h-[400px] min-h-[400px]"
      >
        <Image src={imagePath} alt="Site Image" h="150px" objectFit="cover" />
        <CardBody>
          <Text fontSize="2xl" fontWeight="bold">
            {site.site_name}
          </Text>
          <Text fontSize="large" fontWeight="bold">
            {site.site_desc}
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default SiteCard;
