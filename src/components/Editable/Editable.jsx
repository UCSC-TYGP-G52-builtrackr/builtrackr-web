import React from 'react'
import { X} from "react-feather";
import { useState } from 'react';
import "./editable.css";
import { AiOutlinePlus } from 'react-icons/ai'
import { decryptData } from "../../encrypt";


export const Editable = (props)=> {
  const id  = decryptData (JSON.parse(localStorage.getItem("user_type")));



    const [isEditable, setIsEditable] = useState(false);
    const [inputText, setInputText] = useState(props.defaultValue || "");

    const submission = (e) => {
        e.preventDefault();
        if (inputText && props.onSubmit) {
          setInputText("");
          props.onSubmit(inputText);
        }
        setIsEditable(false);
      };



  return (
<div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
            isEditable={id===4? false:true}
          />
          <div className="editable_edit_footer">
            <button style={{display:"flex",justifyContent:"center"}} type="submit"
            isDisabled={id===5? true:false}
            >{props.buttonText || "Add"} <AiOutlinePlus style={{marginLeft:"10px", marginTop:"6px"}} size={32} /> </button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_input ${
            props.displayClass ? props.displayClass : ""
          }`}

          onClick={() => setIsEditable(id === "4"? false:true)}

        >
           <span ><span className='add_card' style={{display:"flex",justifyContent:"center"}}>{props.text || "Add card"}  </span></span>

        </p>
      )}
    </div>
  );
}



