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

  const [siteAddForm, setSiteAddForm] = useState(false);
  const handleCloseSiteAddForm = () => {
    setNoOfSites("");
    setAmount(0);
    setNoOfSitesErr("");
    setSiteAddForm(false);
  };

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
        setAmount(parsedValue * 1000);
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
    setPaymentForm(true);
    setNoOfSitesErr("");
  };

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPayment, setCurrentPayment] = useState([]);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const viewCurrentePlan = async () => {
      try {
        const data = await fetch(
          "http://localhost:4000/api/payment/currentPayment",
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
          setCurrentPayment(jsonData);
          console.log(jsonData);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewCurrentePlan();
  }, []);

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
                  {currentPayment.sites === 5 && "Basic"}{" "}
                  {currentPayment.sites === 10 && "Standard"}{" "}
                  {currentPayment.sites === 20 && "Premium"}
                </span>
                <span className="plan-values">{currentPayment.sites}</span>
                <span className="plan-values">3</span>
                <span className="plan-values">{currentPayment.sites + 3}</span>
                <span className="plan-values">1</span>
              </div>
            </div>
            <div className="second-box">
              <div className="key-words">
                <span className="plan-word">Last Subscription Date</span>
                <span className="plan-word">Next Subscription Date</span>
              </div>
              <div className="values-of-keys">
                <span className="plan-values">
                  {String(currentPayment.payment_date).split("T")[0]}{" "}
                  {
                    String(
                      String(currentPayment.payment_date).split("T")[1]
                    ).split(".")[0]
                  }
                </span>

                <span className="plan-values"></span>
              </div>
            </div>
            <div className="third-box" onClick={() => setSiteAddForm(true)}>
              <h1>Add more sites to plan </h1>
              <AiOutlinePlus style={{ margin: "5px 0 0 10px" }} />
            </div>
          </div>
          <div className="subscription-plans">
            <div
              className={currentPayment.sites === 5 ? "plan currente" : "plan"}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  marginTop: "15px",
                }}
              >
                Basic
              </span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "36px",
                  marginTop: "20px",
                }}
              >
                RS.5,000
              </span>
              <span className="yearly">Yearly</span>
              <span className="site-amount">5 Sites</span>
              <button className="select-button">
                {currentPayment.sites === 20 && "Downgrade"}
                {currentPayment.sites === 10 && "Downgrade"}
                {currentPayment.sites === 5 && "Currente"}
              </button>
            </div>
            <div
              className={currentPayment.sites === 10 ? "plan currente" : "plan"}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  marginTop: "15px",
                }}
              >
                Standard
              </span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "36px",
                  marginTop: "20px",
                }}
              >
                RS.10,000
              </span>
              <span className="yearly">Yearly</span>
              <span className="site-amount">10 Sites</span>
              <button className="select-button">
                {currentPayment.sites === 20 && "Downgrade"}
                {currentPayment.sites === 10 && "Current"}
                {currentPayment.sites === 5 && "Upgrade"}
              </button>
            </div>
            <div
              className={currentPayment.sites === 20 ? "plan currente" : "plan"}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  marginTop: "15px",
                }}
              >
                Premium
              </span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "36px",
                  marginTop: "20px",
                }}
              >
                RS.20,000
              </span>
              <span className="yearly">Yearly</span>
              <span className="site-amount">20 Sites</span>
              <button className="select-button">
                {currentPayment.sites === 20 && "Current"}
                {currentPayment.sites === 10 && "Upgrade"}
                {currentPayment.sites === 5 && "Upgrade"}
              </button>
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
                        <tr>
                          <td>1</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>2022.10.13 14.12.24</td>
                          <td>10,000.00</td>
                          <td>Subscription a Plan</td>
                          <td>Visa 123xxxxx123</td>
                        </tr>
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
        <Modal
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
        </Modal>
      </div>
    </>
  );
};

export default AdminDashboard;
