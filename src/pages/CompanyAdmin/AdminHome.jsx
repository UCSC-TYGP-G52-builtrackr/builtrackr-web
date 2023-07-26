import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/tmpSiteManager/Navbar";
import Sidebar from "../../components/tmpSiteManager/Sidebar";
import Button from "../../components/tmpSiteManager/Button";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaTimes } from "react-icons/fa";
import "./adminHome.css";
import { Select } from "@mui/material";
import cheif from "../../assets/images/cheif.jpeg";

// const privileges = [
//   "Create user Profile",
//   "Create Siets",
//   "Add Task",
//   "Assign labourars",
//   "Review Task",
//   "Decline Task",
//   "Remove Tasks",
//   "Upload Documents",
//   "Request Inventory",
// ];

const AdminHome = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [displayForm, setDisplayForm] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const idToSend = 1;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  const selectPrivilege = (index) => {
    if (!selectedPrivileges.includes(privileges[index])) {
      setSelectedPrivileges([...selectedPrivileges, privileges[index]]);
    }
  };
  const handleRemove = (element) => {
    const updatedArray = selectedPrivileges.filter((item) => item !== element);
    setSelectedPrivileges(updatedArray);
  };

  const handleCreate = (e) => {
    setIsConfirmed(true);
    e.preventDefault();
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  const handelClose = () => {
    setIsConfirmed(false);
  };

  useEffect(() => {
    const viewUserRoles = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/user/getUserRoles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idToSend }),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          setUserRoles(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewUserRoles();
  }, [displayForm]);

  useEffect(() => {
    const viewPrivileges = async () => {
      try {
        const data = await fetch("http://localhost:4000/api/user/privileges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data.status === 200) {
          const jsonData = await data.json();
          setPrivileges(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {}
    };
    viewPrivileges();
  }, [displayForm,selectedPrivileges]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log("1");
    try {
      const data = await fetch("http://localhost:4000/api/user/addUserRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          photo: image,
          roles: selectedPrivileges,
        }),
      });
      console.log("2");
      console.log(image);
      if (data.status === 200) {
        const jsonData = await data.json();
        console.log(jsonData);
      } else {
        console.log(data.status);
      }
    } catch (err) {
      console.log("3");
      console.error(err.message);
    }
    setDisplayForm(false);
    setIsConfirmed(false);
    setSelectedPrivileges([]);
    setName("");
    setImage("");
  };

  return (
    <>
      {activeMenu ? (
        <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div className="fixed w:100% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
        <Navbar />
      </div>
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <h1>Admin Dashboard</h1>
        {!displayForm && (
          <div className="button">
            <button className="add-button" onClick={() => setDisplayForm(true)}>
              Add user roles
            </button>
          </div>
        )}
        {!displayForm && (
          <div className="user-roles">
            {userRoles.map((element, i) => (
              <UserRole role={element} key={element.role_id} />
            ))}
          </div>
        )}

        {displayForm && (
          <>
            <div
              className={
                isConfirmed
                  ? "user-role-create-from inactive"
                  : "user-role-create-from"
              }
            >
              <h2>Add user roles</h2>
              <form onSubmit={handleCreate} encType="">
                <div className="input-field">
                  <label>User role name</label>
                  <input
                    type="text"
                    placeholder="Enter user role name ..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <label>Cover Photo</label>
                  <input
                    id="photo"
                    type="file"
                    placeholder="Enter user role name ..."
                    onChange={handleFileChange}
                    hidden
                  />
                  <div className="selcet-photo">
                    <label
                      className="photo-select-btn"
                      htmlFor="photo"
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Select a photo
                    </label>
                    <p>
                      {/* {image.name.length > 20
                        ? `${image.name.substring(0, 14)}...${image.name.substring(
                            image.name.length - 6
                          )}`
                        : image.name} */}
                      {image.name}
                    </p>
                  </div>
                </div>
                <div className="input-field">
                  <label>User privileges</label>
                </div>
                <div className="selected-privileges">
                  {selectedPrivileges.map((element, i) => (
                    <OnePrivilege
                      name={element}
                      key={i}
                      removeItem={() => handleRemove(element)}
                    />
                  ))}
                </div>
                <div className="all-privileges">
                  <h3 style={{ margin: "10px 10px 0 10px" }}>
                    Select Privileges
                  </h3>
                  <div className="privileges-box">
                    {privileges.map((element, i) => (
                      <SinglePrivilege
                        key={i}
                        index={i}
                        value={element}
                        onSelect={() => selectPrivilege(i)}
                      />
                    ))}
                  </div>
                </div>
                <div className="two-btns">
                  <Buttons
                    type={"button"}
                    color={"red"}
                    text={"Cancel"}
                    onClick={closeForm}
                  />
                  <Buttons type={"submit"} color={"green"} text={"Create"} />
                </div>
              </form>
            </div>
            {isConfirmed && (
              <Modal
                title={`Are you sure want to create ${name} user role`}
                onClose={handelClose}
                onAdd={handelSubmit}
              />
            )}
          </>
        )}
      </div>
      <Button />
    </>
  );
};

function SinglePrivilege({ index, value, onSelect }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => {
        onSelect(index);
        setIsSelected(true);
      }}
      className="single-privilege"
    >
      <h4>{value.privilege}</h4>
      {isSelected && (
        <span style={{ color: "green", fontSize: "16px" }}>&#10004;</span>
      )}
    </div>
  );
}
function OnePrivilege({ name, removeItem }) {
  return (
    <div className="one-privilege">
      <h2>{name.privilege}</h2>
      <FaTimes
        color="red"
        style={{ margin: "auto", cursor: "pointer" }}
        onClick={removeItem}
      />
    </div>
  );
}

function Buttons({ type, color, text, onClick }) {
  return (
    <button
      type={type}
      style={{ backgroundColor: color }}
      className="normal-btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Modal({ title, onClose, onAdd }) {
  return (
    <div className="popup-modal">
      <h2>{title}</h2>
      <div className="two-btns">
        <Buttons color={"red"} text={"Cancel"} onClick={onClose} />
        <Buttons color={"green"} text={"Create"} onClick={onAdd} />
      </div>
    </div>
  );
}

function UserRole({ role }) {
  return (
    <div className="user-role">
      <Link to="/userRole" state={role}>
      <img
        src={`http://localhost:4000/UserRoles/${role.photo_path}`}
        alt="cheif engineer"
      />
      </Link>
      <span>{role.role_name} </span>
    </div>
  );
}

export default AdminHome;
