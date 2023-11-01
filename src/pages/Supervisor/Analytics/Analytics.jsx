import React, { useState, useEffect } from "react";
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa";
import { Progress } from "antd";

// kpi card icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EngineeringIcon from "@mui/icons-material/Engineering";

// dashboard common components
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import PieComponent from "../../../components/PieComponents";
import { useStateContext } from "../../../contexts/ContextProvider";
import "../../../App.css";
import axios from "axios";

const Analytics = () => {
  const [taskcards, settaskCards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [cards, setCards] = useState([]);

  const siteId = localStorage.getItem("site_id");

  //get task

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/card/viewTaskname?siteId=${siteId}`
        );
        // Replace with your API endpoint to fetch card data

        if (response.status === 200) {
          settaskCards(response.data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCards();
  }, [siteId]);

  console.log(taskcards);

  const calculatePercent = () => {
    const filterCardTask = taskcards.filter((card) => card.status === 1);
    if (!filterCardTask.length) return 0;
    const completed = filterCardTask.length;
    const totalTasks = taskcards.length;
    return (completed / totalTasks) * 100;
  };

  const filterCardTask = taskcards.filter((card) => card.status === 1);
  const persent = calculatePercent();
  console.log(persent);

  //subtask
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

  //get card
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/kanbanbord/getCard?siteId=${siteId}`
        );
        console.log(response.data);
        if (response.status === 200) {
          setCards(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching card data:", error);
      }
    };
    getCards();
  }, [siteId]);

  console.log(cards);

  const calculatePercent2 = () => {
    if (!filterCardTask.length) return 0;
    const completed = tasks.filter((item) => item.completed === "true").length;
    console.log(completed);
    console.log(tasks.length);
    const totalTasks = tasks.length;
    return (completed / totalTasks) * 100;
  };

  const percentage = calculatePercent2();

  const groupedTasks = tasks.reduce((acc, task) => {
    const key = task.cardId;

    if (!acc[key]) {
      acc[key] = {
        count: 0,
        completedCount: 0,
      };
    }

    acc[key].count++; // Increment the count for each task.cardId

    if (task.completed === "true") {
      acc[key].completedCount++; // Increment the count of completed tasks
    }
    return acc;
  }, {});

  const data = Object.keys(groupedTasks).map((key) => {
    const taskGroup = groupedTasks[key];
    const percentages = (taskGroup.completedCount / taskGroup.count) * 100;
    const data2 = { percentages, key };
    return data2;
  });
  console.log("data key",data);

  //get the title from card that id equal to data key

  const data3 = data.map((data) => {
    const data4 = cards.map((card) => {
      if (card.id === data.key) {
        return card.title;
      }
    });
    return data4;
  });
  console.log("data3", data3);
  

  console.log(groupedTasks);

  const { themeSettings, setThemeSettings } = useStateContext();

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
        <Sidebar />
      </div>

      {/* navbar and page content */}
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar />
        </div>
        {themeSettings && <ChatSpace />}
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          {/* horizontal KPI cards list */}
          <div className="grid grid-cols-3 gap-[20px] mt-[25px] pb-[15px]">
            <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-[3px] border-[#B589DF] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#B589DF] text-sm font-bold">
                  Total task
                  <br />
                  Index
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {taskcards.length}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-[3px] border-[#1CC88A] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#1cc88a] text-sm font-bold">
                  Completed task Percentage <br />
                  Rate
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {(filterCardTask.length / taskcards.length) * 100}%
                </h1>
              </div>
              <div className="text-4xl">
                <AttachMoneyIcon fontSize="inherit" />
              </div>
            </div>
            <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-[3px] border-[#36B9CC] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#4bc0c0] text-sm font-bold">
                  Ongoing task percentage <br />
                  Rate
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {100 - (filterCardTask.length / taskcards.length) * 100}%
                </h1>
              </div>
              <div className="text-4xl">
                <EngineeringIcon fontSize="inherit" />
              </div>
            </div>
          </div>
        </div>

        {/* last row of charts */}
        <div className="flex mt-[22px] w-full gap-[30px]">
          <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
              <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
                Projects Overview
              </h2>
              <FaEllipsisV color="gray" className="cursor-pointer" />
            </div>
            <div className="px-[25px] space-y-[15px] py-[15px]">
            {data.map((data) => (
  <div key={data.key}> 
  {cards.map((card) => (
  <>
           <h2>{card.id === data.key?card.title:data.kay}</h2>
          <Progress key={data.key} percent={data.percentages} strokeColor="#2dc78e"  strokeWidth='12px'/>
          </>
      ))} 
    </div>
              ))}
              {/* <div>
                            <h2>Task 2</h2>
                            <Progress percent={50} status="active" strokeColor="#F6C23E" />
                        </div>
                        <div>
                            <h2>Task 3</h2>
                            <Progress percent={70} status="active" strokeColor="#4E73DF" />
                        </div>
                        <div>
                            <h2>Task 4</h2>
                            <Progress percent={100} strokeColor="#36B9CC" />
                        </div>
                        <div>
                            <h2>Task 5</h2>
                            <Progress percent={50} status="exception" strokeColor="#1CC88A" />
                        </div> */}
            </div>
          </div>

          {/* piechart */}
          <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
              <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
                Sites Resources
              </h2>
              <FaEllipsisV color="gray" className="cursor-pointer" />
            </div>
            <div className="items-center justify-center">
              <PieComponent />
            </div>
          </div>
        </div>

        {/* end of sites grid */}
      </div>
    </div>
  );
};

export default Analytics;
