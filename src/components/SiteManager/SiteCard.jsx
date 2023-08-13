import React from "react";
import {
  Box,
  Text,
  Grid,
  Image,
  Card,
  CardBody,
} from "@chakra-ui/react";
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
      >
        <Image src={imagePath} alt="Site Image" h="150px" objectFit="cover" />
        <CardBody>
          <Text fontSize="xl" fontWeight="bold">
            {site.name}
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default SiteCard;
