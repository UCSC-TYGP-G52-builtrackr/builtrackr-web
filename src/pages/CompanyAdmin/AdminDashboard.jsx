import { useStateContext } from "../../contexts/ContextProvider";
import { BsChatDots } from "react-icons/bs";
import SideBar from "../../components/CompanyAdmin/SideBar";
import NavBar from "../../components/CompanyAdmin/NavBar";
import ChatSpace from "../../components/CompanyAdmin/ChatSpace";

const AdminDashboard = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  return (
    <>
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
        <SideBar />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <NavBar />
        </div>
        {themeSettings && <ChatSpace />}
        <div
          className="rest"
          style={{
            paddingTop: "80Px",
          }}
        >
            <h1>Admin Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
