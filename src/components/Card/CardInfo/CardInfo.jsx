import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
  Image,
  Tool,
  User,
} from "react-feather";

import { Modal } from "../../modal/Modal";
import { Editable } from "../../Editable/Editable";
import { Drop } from "../../DropDown/Drop";
import "./CardInfo.css";
import { CommentForm } from "../../Comment/commentForm";

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
  const [values, setValues] = useState({
    ...props.card,
    labors:[],
    equipments:[],
  });
  // const [feedback, setFeedback] = useState("");

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

 
  const addEquipment = (value) => {
    const equipment = {
      id: Date.now() + Math.random() * 2,
      text: value,
    };
    setValues({
      ...values,
      equipments: [...values.equipments, equipment],
    });
  };

  const removeTask = (id) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

 

  const removeEquipment = (id) => {
    const equipments = [...values.equipments];

    const tempEquipments = equipments.filter((item) => item.id !== id);
    setValues({
      ...values,
      equipments: tempEquipments,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...values.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };


  const updateEquipment = (id, value) => {
    const equipments = [...values.equipments];

    const index = equipments.findIndex((item) => item.id === id);
    if (index < 0) return;

    equipments[index].completed = value;

    setValues({
      ...values,
      equipments,
    });
  };



  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values, props]);

  const [selectedLabors, setSelectedLabors] = useState(() => {
    // Load the selected employees from localStorage for the current card
    const savedSelectedLabors = localStorage.getItem(`card_${values.id}_selectedLabors`);
    return savedSelectedLabors ? JSON.parse(savedSelectedLabors) : [];
  });


  // Function to save the selected employees in localStorage
  useEffect(() => {
    localStorage.setItem(`card_${values.id}_selectedLabors`, JSON.stringify(selectedLabors));
  }, [selectedLabors, values.id]);

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
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
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <User />
            <p>Labors</p>
          </div>
           <Drop
            cardId={values.id}
            selectedLabors={selectedLabors}
            onSelect={(cardId, selected) => setSelectedLabors(selected,cardId)}
          />

        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tool />
            <p>Equipments</p>
          </div>
          {values.equipments?.map((item) => (
            <div key={item.id} className="cardinfo_box_task_checkbox">
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={(event) =>
                  updateEquipment(item.id, event.target.checked)
                }
              />
              <p className={item.completed ? "completed" : ""}>{item.text}</p>
              <Trash onClick={() => removeEquipment(item.id)} />
            </div>
          ))}
          <Editable
            text={"Add an Equipment"}
            placeholder=""
            onSubmit={addEquipment}
          />
        </div>

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
              }}
            />
          </div>
          <div className="cardinfo_box_task_list">
            {values.tasks?.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <Editable
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
          <div className="cardinfo_box_image">
            <div className="cardinfo_box_title">
              <Image />
              <p>Add an image</p>
            </div>
            <input type="file" placeholder="Upload an image" />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <p>Feedback</p>
          </div>
          {/* <div className="writer_info">
            <p><span className ="user"><User/></span> <span className= "name">Mr.Gineth Karunanayake<br/>Site Manager <br/>just Now</span></p>
          </div> */}
          <div className="cardinfo_box_feedback">
            <CommentForm /> 
            {/* <textarea
              placeholder="Enter your feedback"
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea> */}
            {/* <button onClick={submitFeedback}>Submit</button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;