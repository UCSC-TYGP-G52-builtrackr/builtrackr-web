import React from 'react'
import {X} from "react-feather";
import './labels.css';


export const labels =(props)=> {
  return (
     <div className="labels" style  ={{backgroundColor:props.color}}>
        {props.text}
        {props.close && <X /> }
     </div>
  );
}

// onClick = {props.onClose? props.onClose(): " "}>