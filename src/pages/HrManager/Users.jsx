import React from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/HrManager/HeaderHr";
//import Dropdown from '../../components/Dropdown';
import RegFormHR from "../../components/HrManager/RegFormHR";

// dashboard common components
import Navbar from "../../components/HrManager/NavbarHr";
import Sidebar from "../../components/Sidebar";
import SidebarHR from "../../components/HrManager/SidebarHR";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import "../../App.css";

const Users = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const company_id = parseInt(
    decryptData(JSON.parse(localStorage.getItem("company_id")))
  );

  const [userRoles, setUserRoles] = useState([]);

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
            body: JSON.stringify({ id: company_id }),
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
  }, []);

  return (
    <div className="">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
          className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
        >
          <BsChatDots />
        </button>
      </div>
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarHR />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar />
        </div>
        {themeSettings && <ChatSpace />}
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          <div className="flex mb-8">
            <Header title="User Roles" category="gdfcgf" />
            {/* <Dropdown/> */}
          </div>

          {/* users grid */}
          <div className="grid grid-cols-3 gap-x-20 gap-y-14">
            {userRoles.map((user) => (
              <div className="relative h-[200px] w-[200px]">
                <div
                  className="absolute inset-0 bg-center bg-cover shadow-2xl rounded-[50%]"
                  style={{ backgroundImage: `url(http://localhost:4000/UserRoles/${user.photo_path})` }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-10">
                  <div className="bg-white bg-opacity-40 mt-10 text-2xl text-center">
                    {user.role_name}
                  </div>

                  <nav>
                    <div className="flex mx-16 mt-10 text-center border-black cursor-pointer border-1">
                      <span className="ml-3">More Info</span>
                      <span>
                        <KeyboardDoubleArrowRightIcon />
                      </span>
                    </div>
                  </nav>
                </div>
              </div>
            ))}
            ;{/* new site creation tile */}
          </div>
          {/* end of users grid */}
        </div>
      </div>
    </div>
  );
};

export default Users;
