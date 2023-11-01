import React, { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
  Tool,
  User,
} from "react-feather";
import { Box, Button, Text, VStack,Card, Center, SimpleGrid, Image ,CardBody,Stack} from '@chakra-ui/react';
import { Modal } from "../../modal/Modal";
import { Editable } from "../../Editable/Editable";
import { Drop } from "../../DropDown/Drop";
import "./CardInfo.css";
import axios from "axios";
import "./comment.css"
import Select from "react-select";
import ImageUpload from "../../../pages/Supervisor/imageUpload";
import { BsClipboardPlusFill } from "react-icons/bs";
import { decryptData } from "../../../encrypt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CardInfo = (props) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

const [selectedColor, setSelectedColor] = useState();
const [values, setValues] = useState([]);
const [tasks, setTasks] = useState([]);  
const [taskCheckboxes, setTaskCheckboxes] = useState({});
const [desc , setDesc] = useState([])
const [equipmentArray, setEquipmentArray] = useState([]);
const [options, setOptions] = useState([]);
const [title, setTitle] = useState([]);
const [image, setImage] = useState([]);
const [TaskId , setTaskId] = useState([]);

const companyId = decryptData(JSON.parse(localStorage.getItem("company_id")));
const SupervisorId = decryptData(JSON.parse(localStorage.getItem("no")));
const id  =decryptData(JSON.parse(localStorage.getItem("user_type")));
const siteId = localStorage.getItem("site_id");

  const updateTitle = (value) =>{
    const title  = value;
    const cardId = props.card.id;
    const data  = {title,cardId}
    axios
    .post(`http://localhost:4000/api/cardInfo/updateTitle`,data)
    .then(() => {
      const updatedTitle = [...title];
      setTitle(updatedTitle);
    })
    .catch((err) => {
      console.error("Error updating title:", err);
    }
    );
    window.location.reload();

  };





  const addLabel =(Label) => {
    const cardId  = props.card.id;
    const label  = Label.text
    const color = Label.color

    const data = {cardId,label,color}
    console.log(data)
    axios
      .post(`http://localhost:4000/api/cardInfo/addLabel`,data)
      .then((res) => {
        const updatedLabels = [...values.labels, res.data.label];
        setValues({ ...values, labels: updatedLabels });
      })
      .catch((err) => {
        console.error("Error adding label:", err);
      });
      window.location.reload();
  };

  const removeLabel = (label) => {
    console.log("this is the label" ,label)
    axios
      .delete(`http://localhost:4000/api/cardInfo/removeLabel`, {
        data: { labelId: label },
      })
      .then(() => {
        const updatedLabels = values.labels.filter(
          (item) => item.id !== label.id
        );
        setValues({ ...values, labels: updatedLabels });
      })
      .catch((err) => {
        console.error("Error removing label:", err);
      });
      window.location.reload();
  };

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/cardInfo/getLabel`
        );
        if (response.status === 200) {
          console.log(response.data)
          setValues(response.data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCardInfo();
  }, []);


//add task function
   const addTask = (value) => {

    const cardId  = props.card.id;
    const task  = value
    const completed = false
    const data= {task,completed,cardId,companyId}


    console.log(data)
    axios
      .post(`http://localhost:4000/api/cardInfo//addCardInfoTask`,data)
      .then((res) => {
        const updatedLabels = [...values.labels, res.data.label];
        setTasks({ ...values, labels: updatedLabels });
        setTaskCheckboxes((prevState) => ({
          ...prevState,
        }));
        if(res.status === 201 ){
          toast.success("Task Added")
        }
        
      })
      .catch((err) => {
        console.error("Error adding label:", err);
      });
   window.location.reload();
  };
  useEffect(() => {
    const fetchCardInfoTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/cardInfo/getCardInfoTask`
        );
        
        if (response.status === 200) {
          setTasks(response.data);
          
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCardInfoTask();
  }, []);

  const handleTaskCheckboxChange = (taskId) => {
    setTaskCheckboxes((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId], // Toggle the checkbox state
    }));

    //update te completed column in database
    const completed = !taskCheckboxes[taskId];
    const CardtaskId = taskId;

    const data = {completed, CardtaskId}
    console.log("post data",data)
    axios
      .post(`http://localhost:4000/api/cardInfo/updateCardInfo`,data)
      .then((res) => {
        const updatedTasks = [...tasks];
        const index = updatedTasks.findIndex((item) => item.id === CardtaskId);
        updatedTasks[index].completed = completed;
        setTasks(updatedTasks);
        if(res.status === 201 ){
        toast.success("Task updated")
        }
      })

      .catch((err) => {
        console.error("Error updating task:", err); 
        if(err != null){
           toast.error("Error Sending Request")
        }
        
      }

      )

      window.location.reload();
    }
    const calculatePercent = () => {

      const filterCardTask =tasks.filter((card) => card.cardId === props.card?.id)
      if (!filterCardTask.length) return 0;
      const completed = filterCardTask.filter((item) => item.completed === 'true').length;
      const totalTasks = filterCardTask.length;
      return (completed / totalTasks) * 100;
    };


//update description of the card
  const updateDescription = (value) => {
    const desc  = value;
    const cardId = props.card.id;
    const data  = {desc,cardId}
    axios
    .post(`http://localhost:4000/api/cardInfo/updateDesc`,data)
    .then((res) => {
      const updatedDesc = [...desc];
      setDesc(updatedDesc);
      if(res.status === 201 ){
      toast.success("Updated description successfully")
      }
    })

    .catch((err) => {
      console.error("Error updating desc:", err);
    }
    );
    window.location.reload();
  };


 //save labours
 const [selectedLabors, setSelectedLabors] = useState(() => {
  // Load the selected employees from localStorage for the current card
  const savedSelectedLabors = localStorage.getItem(`card_${props.card.id}_selectedLabors`);
  return savedSelectedLabors ? JSON.parse(savedSelectedLabors) : [];
});

//save equipments
const [selectedEquipments, setSelectedEquipments] = useState(() => {
  // Load the selected employees from localStorage for the current card
  const savedSelectedEquipments = localStorage.getItem(`card_${props.card.id}_selectedEquipments`);
  return savedSelectedEquipments ? JSON.parse(savedSelectedEquipments) : [];
});

const [selectedMaterials, setSelectedMaterials] = useState(() => {
  // Load the selected employees from localStorage for the current card
  const savedSelectedMaterials = localStorage.getItem(`card_${props.card.id}_selectedMaterials`);
  return savedSelectedMaterials ? JSON.parse(savedSelectedMaterials) : [];
});




useEffect(() => {
  localStorage.setItem(`card_${props.card.id}_selectedLabors`, JSON.stringify(selectedLabors));
}, [selectedLabors, props.card.id]);

useEffect(() => {
  localStorage.setItem(`card_${props.card.id}_selectedEquipments`, JSON.stringify(selectedEquipments));
}, [selectedEquipments, props.card.id]);


useEffect(() => {
  localStorage.setItem(`card_${props.card.id}_selectedMaterials`, JSON.stringify(selectedMaterials));
}, [selectedMaterials, props.card.id]);

const handleSelectChange = (value) => {
  // const selected = Array.from(event.target.selectedOptions, (option) => option.value);
  // setSelectedOptions(selected);

  console.log(value.value)
  const cardId = props.card.id;
  const equip  =value.value;
  const data = {cardId,equip }
    console.log(data)
    axios
      .post(`http://localhost:4000/api/equipment/updateEquipment`,data)
      .then(() => {
        const updatedEquipment = [...equip];
        setEquipmentArray(updatedEquipment);
      })
      .catch((err) => {
        console.error("Error updating equipment:", err);
      }
      );
      window.location.reload();
};



useEffect(() => {
  const getEquipmentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/equipment/viewequipments"
      );
      console.log(response.data);
      if (response.status === 200) {
        setEquipmentArray(response.data);
        const formattedOptions = response.data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setOptions(formattedOptions);
      }
    } catch (error) {
      console.log(error);
    }
};
getEquipmentData ();
}, []);




// const deleteEquipment = (id) => {
//   axios
//     .delete(`http://localhost:4000/api/equipment/deleteEquipment/${id}`)
//     .then(() => {
//       const updatedEquipment = equipmentArray.filter((item) => item.id !== id);
//       setEquipmentArray(updatedEquipment);
//     })
//     .catch((err) => {
//       console.error("Error deleting equipment:", err);
//     });

//     window.location.reload();
// };




useEffect(() => {

  const getImage = async () => {
      try {
          const response = await axios.get(
          "http://localhost:4000/api/image/getImage"
          );
          console.log(response.data);
          if (response.status === 200) {
          setImage(response.data);
          }
      } catch (error) {
          console.log(error);
          console.error("Error fetching board data:", error);
      }
      };
      getImage();

},[]);




  const [content, setContent] = useState("");
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      content: content,
      cardId: props.card.id,
      date: new Date().toISOString().substr(0, 10),
      companyID:companyId,
      userId:SupervisorId,
    };

    if(feedback !== null){
      toast.success("Comment Pending")
    }

    axios
      .post("http://localhost:4000/api/comment/addComment", feedback)
      .then((res) => {
        console.log(res);
        setContent("");
        setIsTextareaDisabled(true);
        if(res.status === 201 ){
        toast.success("Comment Added")

      }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Sending Request");
      });

    console.log(feedback);
  };

  useEffect(() => {
    if (content.length > 0) {
      setIsTextareaDisabled(false);
    } else {
      setIsTextareaDisabled(true);
    }
  }, [content]);

  console.log(content)


  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/comment/getComment"
        );
        if (response.status === 200) {
          setComments(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }

      console.log(comments);
    };
    fetchComments();
  }, []);



  const handleComplete = () => {
    const cardId = props.card.id;
    const boardId  = 2

   
    const data = { cardId , boardId};
    axios
      .post(`http://localhost:4000/api/kanbanbord/cardCompleted`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

        const taskId = props.card.taskId;
        console.log(taskId)

        const data1 = {taskId}
        axios
        .post(`http://localhost:4000/api/card/updateId`, data1)
        .then((res) => {
          console.log(res);
        }
        )
        .catch((err) => {
          console.log(err);
        }
        );




  };


  const updatetaskID = (value) => {
    const taskId  = value;
    const id = props.card.id;
    console.log(taskId)

    const data  = {taskId,id}
    axios
    .post(`http://localhost:4000/api/kanbanbord/updateTaskId`,data)
    .then(() => {
      const updatedtaskId = [...taskId];
      setTaskId(updatedtaskId);
    }
    )
    .catch((err) => {
      console.error("Error updating taskId:", err);
    }
    );

  };


  console.log("card",image);

const filteredCards =values.filter((card) => card.CardId === props.card?.id);
const filterCardTask =tasks.filter((card) => card.cardId === props.card?.id);
const filterEquipment =equipmentArray.filter((card) => card.cardId === props.card?.id);
const filterImage =image.filter((card) => card.id === props.card?.id);
const filterComment =comments.filter((card) => card.cardId === props.card?.id);
 

 console.log(filterImage)
 console.log(filterEquipment)

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <Editable
            text={props.card.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
          </div>
          <Editable
            text={props.card.description}
            placeholder="Enter description"
            onSubmit ={updateDescription}

          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Task Id</p>
          </div>
          <Editable
            defaultValue={props.card.taskId}
            text={props.card.taskId || "Add the task ID"}
            placeholder="Enter  task Id"
            onSubmit ={updatetaskID}

          />
        </div>
        
        

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={props.card.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(e) => {
              const date = e.target.value;
              const cardId = props.card.id;
              const data = { date, cardId };
              axios
                .post(`http://localhost:4000/api/cardInfo/updateDate`, data)
                .then(() => {
                  const updatedDate = [...date];
                  setValues(updatedDate);
                })
                .catch((err) => {
                  console.error("Error updating date:", err);
                });


            }}
          />
        </div>

{/* adding labels to the card */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {filteredCards?.map((item) => (
              <label
                key={item.id}
                style={{ backgroundColor: item.color , fontSize:"13.5px" , paddingLeft :"8px"}}>
                {item.label}
                <X onClick={() => removeLabel(item.id)} />
              </label>
            ))}
          </div>
          <ul>
            {colors?.map((item) => (
              <li
                key={ item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            isDisabled={id===5}
            onSubmit={(value) =>
                 addLabel({ color: selectedColor, text: value })
            }

          />
        </div>

        {/* add task to the card */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                fontSize:"11px",
              }}
            >
              {calculatePercent()}%
              </div>
          </div>
          {filterCardTask.map((item) => (
          <div   key={item.id}className="cardinfo_box_task_list">

              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  checked={taskCheckboxes[item.id]}
                  onChange={() => handleTaskCheckboxChange(item.id)}
                />
                <p className={(item.completed)}>{item.task}</p>
              </div>
              </div>
            ))}
          <Editable
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
            isDisabled={id===4}
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <User />
            <p>Labors</p>
          </div>
           <Drop
            cardId={props.card.id}
            description="labour"
            selectedLabors={selectedLabors}
            isDisabled={id===4}
            onSelect={(cardId, selected) => {
              setSelectedLabors(selected);
            }}
            />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tool />
            <p>Tools</p>
          </div>
          <div className="select-container">
          <Drop
            cardId={props.card.id}
            description="equipment"
            selectedEquipment={selectedEquipments}
            isDisabled={id===4}
            onSelect={(cardId, selected) => {
              setSelectedEquipments(selected);
            }}
            />

     </div>
     <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tool />
            <p>Material</p>
          </div>
          <div className="select-container">
          <Drop
            cardId={props.card.id}
            description="material"
            selectedEquipment={selectedMaterials}
            isDisabled={id===4}
            onSelect={(cardId, selected) => {
              setSelectedMaterials(selected);
            }}
            />

     </div>
     </div>.
      {filterEquipment.map((item) => (
          <div   key={item.id}className="cardinfo_box_task_list">

              <div key={item.id} className="cardinfo_box_task_checkbox">
                <p>{item.name}</p>
                <Trash />
              </div>
              </div>
            ))}

      </div>
    {id === "5" ? (
          <div className="cardinfo_box_image">

            <div className="cardinfo_box_title">
            <p>Upload an image</p>
          </div>
              <ImageUpload
              cardId  = {props.card.id}
              />

          </div>
    ):(<p>Image</p>)}

        </div>
  
        <div className="task_image">
        {filterImage.map((item) => (
                  <>
                  <Image src={`http://localhost:4000/Supervisor/uploads/${item.image}`} alt="image" />
                  </>
                ))}
          </div>

        <div className="cardinfo_box_feedback" >
            <div className="cardinfo_box_title">
            <User />
            <p>Feedback</p>
          </div>
          <div className="cardinfo_box_feedback">
            {id === "4" ? (
        <form onSubmit={onSubmit}>
            <textarea  className ="comment-form-textarea" value={content} onChange={(e) => setContent(e.target.value)} name  = "content" />
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
            }}
            isDisabled={isTextareaDisabled}
             onClick={onSubmit}
             >Submit</Button>
        </form>
            ):(<p><b>Feedback From site Manager</b></p>)}

        {/* comment show */}
        <div className="comment-section">
          <div className="cardinfo_box">
          <div className="cardinfo_box_title"><p>Comment</p></div>
 
          <Card>
        {filterComment.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-user">
              <User />
              </div>
                {comment.content}<br/> 
                <div className="comment-date"><br></br>
                {comment.date}
               </div>
               </div>
               ))}
          </Card>
         </div>
          </div>
        </div>
        <div className="cardinfo_box" style={{padding:"5%"}}>
          <div className="cardinfo_box_title">

            
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
              marginTop: "50%",
            }}

             onClick={handleComplete}>Complete</Button>
        </div>
        </div>
    </div>
    <ToastContainer />
    </Modal>
  );

};

export default CardInfo;