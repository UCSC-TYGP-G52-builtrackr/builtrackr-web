import React, { useEffect, useRef } from "react";
import "./DropDown.css";

export const Dropdown = (props) => {
  const dropdownRef = useRef();

  const handleClickOutsideDropdown = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, );

  return (
    <div
      ref={dropdownRef}
      className={`dropdown custom-scroll ${
        props.class ? props.class : ""
      }`}
    >
      {props.children}
    </div>
  );
};
