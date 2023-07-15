import {Link} from "react-router-dom";
import {React, useState} from "react";



export const Login = ()=>{
    const [email ,setEmail] = useState ("");
    const [password ,setPassword] = useState ("");

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="grid-container">
        <div className="form_body">
        {/* left side grid image */}
        <div className="grid_left">
            <form>
        <h1>Login To</h1>
        <h2>Builtrackr</h2>
        <span>If you don't  have an account  you can <Link to  = "/Register"><b>Register Here !</b></Link></span><br/>
        <img className="image_1" src="./login.jpg"  alt  = "image_1"/>
        </form>
        </div>

        {/*right side grid form */}
        <div className="grid_right">
        <form className  = "register_form"  onSubmit = {handleSubmit}>
        <h1>Sign In</h1>
        <div className="form-info" >
        <label>User Name</label>
        <input type  =  "email" placeholder="  email@gmail.com"  name = "email"  id  =  "email"  value  = {email}  onChange={(e) =>setEmail(e.target.value)}required></input>
        <label>Password</label>
        <input type  =  "text" placeholder="  Enter Your Password"  name = "pwd"  id = "pwd" value  = {password} onChange={(e) =>setPassword(e.target.value)}></input><br/>
        <button className='next_button' type  = "submit"> Login</button>
        </div>
        </form>
        </div>
        </div>
        </div>
    );

}