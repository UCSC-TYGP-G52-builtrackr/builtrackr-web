import {React, useState } from 'react';
import '../../CSS/register.css';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';





export const Register = () =>{

const navigate = useNavigate();

    const [email , setEmail] =  useState(" ");
    const [name ,setName] = useState(" ");
    const [regNo , setRegNo] = useState(" ");
    const [line1 , setLine1] = useState(" ");
    const [line2 , setLine2] = useState(" ");
    const [contactNo , setContactNo] = useState(" ");

 
    const handleSubmit = (e) =>{
        e.preventDefault();

        const formData = {
            name,
            regNo,
            email,
            line1,
            line2,
            contactNo,
          };
      
          //Pass the form values to the next page using location state
          navigate('/RegisterTwo', { state: formData });
    }

   
    // function NextPage(){
    //   navigate("/RegisterTwo")
    // }

    return(

        //grid start
        <div className="grid-container">
        <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left">
            <form>
        <h1>Sign Up To</h1>
        <h2>Builtrackr</h2>
        <span>If you already have an account <Link to  = "/Login"><b>Login Here !</b></Link></span><br/>
        <img className="image_1" src="./register.jpg"  alt  = "image_1"/>
        </form>
        </div>

        {/*right side grid form */}
        <div className="grid_right">
        <form className  = "register_form" onSubmit = {handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-info" >
        <label>Company Name</label>
        <input type  =  "text" name  = "companyName" id = "name"  value ={name} onChange={(e) =>setName(e.target.value)}></input>
        <label>Company Register Number</label>
        <input type  = "text" placeholder="   PVXXXXX"  name = "regNo" id ="regNo" value ={regNo} onChange={(e) =>setRegNo(e.target.value)}></input>
        <label>Email Address</label>
        <input type  =  "email" placeholder="  email@gmail.com"  name = "email"  id  =  "email" value ={email} onChange={(e) =>setEmail(e.target.value)} required></input>
        <label>Company Address</label>
        <input type  =  "text" placeholder="   No/10A"  name = "line1"  id = "line1" value ={line1} onChange={(e) =>setLine1(e.target.value)}></input><br/>
        <input type  =  "text" placeholder="   Queens road"  name = "line2" id= "line2" value ={line2} onChange={(e) =>setLine2(e.target.value)}></input>
        <label>Fixed Line Number</label>
        <input type= "tel" maxLength= "10"  name  =  "contactNo"  id ="contactNo" value ={contactNo}  onChange={(e) =>setContactNo(e.target.value)}></input><br/>
        <button className='next_button'type="submit">Next Page</button>
        </div>
        </form>
        </div>

        </div>
        </div>
    );
}


