import React, {useState, useEffect} from "react";
import axios from "axios";
import { Box, Button, Text, VStack,Card, Center, SimpleGrid, Image ,ChakraProvider} from '@chakra-ui/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


 export const  ImageUpload = (props) => {

    const [file, setFile] = useState();
 
 

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = () => {

        const formData = new FormData();
        formData.append('image', file);

        const res= axios.post(`http://localhost:4000/api/imageUpload/uploads2`, formData)
        if (res.status === 200) {
            setFile(res.data);
            toast.success("Image upload successfully")
          }

          console.log(file.name)

       const  imageUrl  = file.name
       const  cardId  = props.cardId
          const data = {imageUrl, cardId}
            axios.post(`http://localhost:4000/api/image/updateImage`, data)
            .then(res => {
                console.log(res)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
}








    return(
        <>
        <div className="board">
            <Box
            >
            <input type  = "file"  id = "file" className = "inputfile"  onChange = {handleFile}  name= 'image'/>
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
              marginLeft: "78%",
              marginTop: "5%",
            }}
            
             
             onClick={handleUpload}>Upload</Button>
             </Box>
        </div>
        <ToastContainer />
       </>
    )


}

export default ImageUpload;