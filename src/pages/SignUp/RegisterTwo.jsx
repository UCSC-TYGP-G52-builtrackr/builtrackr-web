import '../../CSS/register.css';
import {Link} from "react-router-dom";
import {useState} from 'react';
import { useLocation } from 'react-router-dom';



export const RegisterTwo = () =>{
const location = useLocation();

    const [Email , setEmail] =  useState(" ");
    // const [name ,setName] = useState(" ");
    // const [regNo , setRegNo] = useState(" ");
    // const [line1 , setLine1] = useState(" ");
    // const [line2 , setLine2] = useState(" ");
    // const [contactNo , setContactNo] = useState(" ");

  
  const formData = location.state;

  if (!formData) {
    return <div>No form data found.</div>;
  }
  // Access the form values
  const { email, name, regNo, line1, line2, contactNo } = formData;


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(Email);
        console.log(email);
        console.log(name);
        console.log(regNo);
        console.log(line1);
        console.log(line2);
        console.log(contactNo);

    }
    return(


            //grid start
            <div className="grid-container">
            <div className="form_body">
            {/* left side grid image */}
            <div className="grid_left">
                <form>
            <h1>Sign Up To</h1>
            <h3>Builtrackr</h3>
            <span>If you already have an account <Link to  = "/Login"><b>Login Here !</b></Link></span><br/>
            <img className="image_1" src="./image_1.png"  alt  = "image_1"/>
            </form>
            </div>
            {/*right side grid form */}
            <div className="grid_right">
            <form className  = "register_form" onSubmit={handleSubmit}>
            <h1>Complete Registration</h1>
            <div className="form-info" >
            <label>Email Address</label>
            <input type  =  "email" placeholder="  email@gmail.com"  name = "Email"  id  =  "email"  value={Email} onChange={(e) =>setEmail(e.target.value)}  required></input> 
             <br/><button className='next_buttonOtp' >Send OTP</button>
            <label>Enter OTP</label>
            <input type  = "text" placeholder=" Enter OTP"  name = "OTP" id ="OTP"></input>
            <label>User Name</label>
            <input type  =  "text" name  = "uname" id = "uname" placeholder=" Enter User Name"></input>
            <label>Password</label>
            <input type  =  "text" placeholder="   Enter Your Password"  name = "pwd"  id = "pwd"></input><br/>
            <label>Confirm Password</label>
            <input type  =  "text" placeholder="   Re-Enter Your Password"  name = "cpwd"  id = "cpwd"></input><br/>
            <button className='next_button' type  ="submit">Register</button>
            </div>
            </form>
            </div>
            </div>
            </div>
        );
}