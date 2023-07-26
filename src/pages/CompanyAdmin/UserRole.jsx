import { useLocation } from "react-router-dom";
import Navbar from "../../components/tmpSiteManager/Navbar";
import Sidebar from "../../components/tmpSiteManager/Sidebar";
import Button from "../../components/tmpSiteManager/Button";
import { useStateContext } from "../../contexts/ContextProvider";
import "./userRole.css";
import { useEffect, useState } from "react";

const UserRole = (props) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [rolePrivileges, setRolePrivileges] = useState([]);
  const [form, setForm] = useState(false);

  const location = useLocation();
  const propsData = location.state;

  const displayForm = () => {
    setForm(true);
  };

  useEffect(() => {
    const getRolePrivileges = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/user/rolePrivileges",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: propsData.role_id }),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          setRolePrivileges(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {}
    };
    getRolePrivileges();
  }, []);

  console.log(rolePrivileges);

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
        <div className={form? 'main inactive' : 'main'}>
          <h1 className="topic">{propsData.role_name}</h1>
          <div className="role-privileges">
            <h1>{`${propsData.role_name}'s All Common Privileges`}</h1>
            <div className="privileges-box">
              {rolePrivileges.map((element) => (
                <OnePrivilege key={element.no} privilege={element} form={form} />
              ))}
            </div>
          </div>
          <div className="employyes-box">
            <table className="employee-table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Employee No</td>
                  <td>Register date</td>
                  <td>Action</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nilshan Deemantha</td>
                  <td>10058</td>
                  <td>2020.02.03</td>
                  <td>
                    <button onClick={displayForm}>Edit Privileges</button>
                  </td>
                  <td>Working</td>
                </tr>
                <tr>
                  <td>Supun Dilshan</td>
                  <td>10058</td>
                  <td>2020.02.03</td>
                  <td>
                    <button>Edit Privileges</button>
                  </td>
                  <td>Working</td>
                </tr>
                <tr>
                  <td>Kalana Weranga</td>
                  <td>10058</td>
                  <td>2020.02.03</td>
                  <td>
                    <button onClick={displayForm}>Edit Privileges</button>
                  </td>
                  <td>Working</td>
                </tr>
                <tr>
                  <td>Anjana Silva</td>
                  <td>10058</td>
                  <td>2020.02.03</td>
                  <td>
                    <button>Edit Privileges</button>
                  </td>
                  <td>Working</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
        
      </div>
      {form && (
            <div className="user-privilege-form">
              <h2>Edit Nilshan's priviliges</h2>
              <form></form>
            </div>
          )}
    </>
  );
};

function OnePrivilege({ privilege,form }) {
  return (
    <div className={form? 'privilege inactive' : 'privilege'}>
      <h3>{privilege.privilege}</h3>
    </div>
  );
}

export default UserRole;
