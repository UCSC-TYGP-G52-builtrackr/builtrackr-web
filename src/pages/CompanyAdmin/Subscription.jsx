import { useStateContext } from "../../contexts/ContextProvider";
import { BsChatDots } from "react-icons/bs";
import SideBar from "../../components/CompanyAdmin/SideBar";
import NavBar from "../../components/CompanyAdmin/NavBar";
import ChatSpace from "../../components/CompanyAdmin/ChatSpace";
import "./subscription.css";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Buttons from "../../components/CompanyAdmin/Buttons";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { decryptData } from "../../encrypt";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const lkrFormatter = new Intl.NumberFormat("si-LK", {
  style: "currency",
  currency: "LKR",
});

const AdminDashboard = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const style = {
    position: "absolute",
    marginLeft: "150px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    p: 4,
  };
  const company_id = parseInt(
    decryptData(JSON.parse(localStorage.getItem("company_id")))
  );
  const navigate = useNavigate();

  const [siteAddForm, setSiteAddForm] = useState(false);
  const handleCloseSiteAddForm = () => {
    setNoOfSites("");
    setAmount(0);
    setNoOfSitesErr("");
    setSiteAddForm(false);
  };

  const [firstExecuted, setFirstExected] = useState(false);

  const [noOfSites, setNoOfSites] = useState("");
  const [noOfSitesErr, setNoOfSitesErr] = useState("");
  const [amount, setAmount] = useState(0);

  const [paymentForm, setPaymentForm] = useState(false);

  const siteChanges = (e) => {
    // setNoOfSites(e.target.value);
    // noOfSites !== 0 && setAmount(noOfSites*1000)
    const inputValue = e.target.value;
    setNoOfSites(inputValue);

    if (inputValue !== "") {
      const parsedValue = parseInt(inputValue);
      if (!isNaN(parsedValue)) {
        setAmount(parsedValue * 5000);
      }
    } else {
      setAmount(0);
    }
  };

  const displayPayment = () => {
    if (noOfSites === "") {
      setNoOfSitesErr("Enter no of sites");
      return;
    } else if (noOfSites <= 0) {
      setNoOfSitesErr("Number of sites should be grater than 0");
      return;
    }
    setNoOfSitesErr("");
    navigate("/paycheckout", { state: {plan:parseInt(noOfSites)+10 , type:2, company_id:company_id} });
    
  };

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPayment, setCurrentPayment] = useState([]);
  const [nextDate, setNextDate] = useState("");
  const [additionalSites, setAdditionalSites] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [sites, setSites] = useState(0);

  const [paymentUI, setPaymentUI] = useState(false)

  const istDatetime = currentPayment.payment_date?.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true, // Display time in 12-hour format
  });

  const selectPlan = (type) => {
    console.log(type);
  };

  useEffect(() => {
    const viewPaymetDetails = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/payment/paymentDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ company_id: company_id }),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          setPaymentDetails(jsonData);
          setCurrentPayment(
            jsonData.filter((el) => el.type === 1 && el.currente === 1)
          );

          const filteredData = jsonData.filter(
            (el) => el.type === 2 && el.currente === 1
          );
          setAdditionalSites(
            filteredData.reduce((total, el) => total + el.sites, 0)
          );

          const initialDate = new Date(
            jsonData
              .filter((el) => el.type === 1 && el.currente === 1)
              .map((el) => el.payment_date)[0]
          );
          initialDate.setFullYear(initialDate.getFullYear() + 1);
          setNextDate(initialDate.toISOString());
        }
        setFirstExected(true);
      } catch (err) {
        console.error(err.message);
      }
    };
    viewPaymetDetails();
  }, []);

  // useEffect(() => {
  //   setCurrentPayment(
  //     paymentDetails.filter((el) => el.type === 1 && el.currente === 1)
  //   );
  // }, []);
  console.log(firstExecuted);
  useEffect(() => {
    if (firstExecuted) {
      const siteCountOfPeriod = async () => {
        console.log("hellll");
        try {
          const data = await fetch(
            "http://localhost:4000/api/site/siteCountOfPeriod",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                company_id: company_id,
                f_date: currentPayment
                  .map((el) => el.payment_date)[0]
                  .split("T")[0],
                t_date: nextDate.split("T")[0],
              }),
            }
          );
          const jsonData = await data.json();
          setSites(jsonData);
          console.log(jsonData);
        } catch (err) {
          console.log(err);
        }
      };
      siteCountOfPeriod();
    }
  }, [firstExecuted]);

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
            padding: "80px 20px 20px 20px",
          }}
        >
          <h1
            style={{ textAlign: "left", fontWeight: "600", fontSize: "18px" }}
          >
            Current Plan
          </h1>
          <div className="cuurrnt-plan">
            <div className="first-box">
              <div className="key-words">
                <span className="plan-word">Plan</span>
                <span className="plan-word">No of Sites</span>
                <span className="plan-word">Additonal Sites</span>
                <span className="plan-word">Total Sites</span>
                <span className="plan-word">Remaning No of Sites</span>
              </div>
              <div className="values-of-keys">
                <span className="plan-values">
                  {currentPayment.map((el) => el.sites)[0] === 2 && "Basic"}{" "}
                  {currentPayment.map((el) => el.sites)[0] === 5 &&
                    "Recomended"}{" "}
                  {currentPayment.map((el) => el.sites)[0] === 20 &&
                    "Enterpise"}
                </span>
                <span className="plan-values">
                  {currentPayment.map((el) => el.sites)[0]}
                </span>
                <span className="plan-values">{additionalSites}</span>
                <span className="plan-values">
                  {currentPayment.map((el) => el.sites)[0] + additionalSites}
                </span>
                <span className="plan-values">
                  {currentPayment.map((el) => el.sites)[0] +
                    additionalSites -
                    sites}
                </span>
              </div>
            </div>
            <div className="second-box">
              <div className="key-words">
                <span className="plan-word">Last Subscription Date</span>
                <span className="plan-word">Next Subscription Date</span>
              </div>
              <div className="values-of-keys">
                <span className="plan-values">
                  {
                    String(
                      currentPayment.map((el) => el.payment_date)[0]
                    ).split("T")[0]
                  }{" "}
                  {
                    String(
                      String(
                        currentPayment.map((el) => el.payment_date)[0]
                      ).split("T")[1]
                    ).split(".")[0]
                  }
                </span>

                <span className="plan-values">{nextDate.split("T")[0]}</span>
              </div>
            </div>
            <div className="third-box" onClick={() => setSiteAddForm(true)}>
              <h1>Add more sites to plan </h1>
              <AiOutlinePlus style={{ margin: "5px 0 0 10px" }} />
            </div>
          </div>
          <div className="subscription-plans">
            <div className="background-box">
              <div className="container">
                <div className="panel pricing-table">
                  <div className="pricing-plan">
                    <img
                      src="https://i.postimg.cc/mrcYNX5X/6895861.jpg"
                      alt=""
                      className="pricing-img"
                    />
                    <h2 className="pricing-header">Basic</h2>
                    <ul className="pricing-features">
                      <li className="pricing-features-item">
                        Only 2 Site Mangement
                      </li>
                      <li className="pricing-features-item">Future Addons</li>
                    </ul>
                    <span
                      style={{ marginTop: "70px" }}
                      className="pricing-price"
                    >
                      LKR 10000{" "}
                    </span>
                    {currentPayment.map((el) => el.sites)[0] === 2 ? (
                      <button
                        style={{ cursor: "default" }}
                        className="pricing-button"
                      >
                        Currente
                      </button>
                    ) : (
                      <button
                        onClick={() => selectPlan(1)}
                        className="pricing-button"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                  <div className="pricing-plan">
                    <img
                      src="https://i.postimg.cc/K8jBxpxG/4334841.jpg"
                      alt=""
                      className="pricing-img"
                    />
                    <h2 className="pricing-header">Recommended</h2>
                    <ul className="pricing-features">
                      <li className="pricing-features-item">
                        5 Site Mangement
                      </li>
                      <li className="pricing-features-item">24 / 7 Support </li>
                      <li className="pricing-features-item">Future Addons</li>
                    </ul>
                    <span className="pricing-price"> LKR 20000</span>
                    {currentPayment.map((el) => el.sites)[0] === 5 ? (
                      <button
                        style={{ cursor: "default" }}
                        className="pricing-button"
                      >
                        Currente
                      </button>
                    ) : (
                      <button
                        onClick={() => selectPlan(2)}
                        className="pricing-button"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                  <div className="pricing-plan">
                    <img
                      src="https://i.postimg.cc/NFTQwHj7/bridge-construction-amico-copy.png"
                      alt=""
                      className="pricing-img"
                    />

                    <h2 className="pricing-header">Enterprise</h2>
                    <ul className="pricing-features">
                      <li className="pricing-features-item">
                        20 Site Mangement
                      </li>
                      <li className="pricing-features-item">24 / 7 Support </li>
                    </ul>
                    <span
                      style={{ marginTop: "70px" }}
                      className="pricing-price"
                    >
                      LKR 30000
                    </span>
                    {currentPayment.map((el) => el.sites)[0] === 20 ? (
                      <button
                        style={{ cursor: "default" }}
                        className="pricing-button"
                      >
                        Currente
                      </button>
                    ) : (
                      <button
                        onClick={() => selectPlan(3)}
                        className="pricing-button"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-history">
            <h1 style={{ fontWeight: "600", fontSize: "18px" }}>
              Payment History
            </h1>
            {paymentHistory && (
              <>
                <div className="payment-history-table">
                  <Sheet sx={{ height: 200, overflow: "auto" }}>
                    <Table
                      aria-label="table with sticky header"
                      stickyHeader
                      stripe="even"
                      hoverRow
                    >
                      <thead>
                        <tr>
                          <th>Payment No</th>
                          <th>Date Time</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Payment Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentDetails.map((el) => (
                          <tr>
                            <td>{el.payment_id}</td>
                            <td>
                              {el.payment_date.split("T")[0]}{" "}
                              {el.payment_date.split("T")[1].split(".")[0]}
                            </td>
                            <td>{lkrFormatter.format(el.amount)}</td>
                            <td>
                              {el.type === 1
                                ? "Subscription Plan"
                                : "Site Addons"}
                            </td>
                            <td>Visa 123xxxxx123</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Sheet>
                </div>
              </>
            )}
          </div>
        </div>
        {siteAddForm && (
          <div className="sites-add-to-plan">
            <Modal
              open={siteAddForm}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div>
                <Box sx={style} style={{ width: "550px" }}>
                  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Add No of Sites
                  </h2>
                  <form>
                    <TextField
                      error={noOfSitesErr !== "" && true}
                      className="outlined-basic"
                      label="No of Sites"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "20px" }}
                      // value={!isNaN(noOfSites)  ? parseInt(noOfSites) : noOfSites === "" ? "" : ""}
                      value={
                        noOfSites === ""
                          ? ""
                          : !isNaN(noOfSites)
                          ? parseInt(noOfSites)
                          : ""
                      }
                      onChange={siteChanges}
                      helperText={noOfSitesErr !== "" && noOfSitesErr}
                    />
                    <TextField
                      className="outlined-basic"
                      label="Amount"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", marginBottom: "20px" }}
                      value={amount}
                      disabled
                    />
                  </form>
                  <div className="two-btns">
                    <Buttons
                      type={"button"}
                      color={"red"}
                      text={"Cancel"}
                      onClick={handleCloseSiteAddForm}
                    />
                    <Buttons
                      type={"button"}
                      color={"green"}
                      text={"Proceed"}
                      onClick={displayPayment}
                    />
                  </div>
                </Box>
              </div>
            </Modal>
          </div>
        )}
        {/* <Modal
          open={paymentForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <Box sx={style} style={{ width: "550px" }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Payment UI
              </h2>

              <div className="two-btns">
                <Buttons
                  type={"button"}
                  color={"red"}
                  text={"Cancel"}
                  onClick={() => setPaymentForm(false)}
                />
                <Buttons type={"button"} color={"green"} text={"Done"} />
              </div>
            </Box>
          </div>
        </Modal> */}
      </div>
    </>
  );
};

export default AdminDashboard;
