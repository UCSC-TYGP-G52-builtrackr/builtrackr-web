import React from 'react'
import { X} from "react-feather";
import { useState } from 'react';
import "./editable.css";

export const Editable = (props)=> {

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
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_input ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
           <span><span className='add_card'>{props.text || "Add card"}</span></span>

        </p>
      )}
    </div>
  );
}



