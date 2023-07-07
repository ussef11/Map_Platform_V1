import React, { useState } from 'react'
import AuthService from '../../services/auth.service'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
	const host = process.env.REACT_APP_HOST;

    let navigate = useNavigate();

    const [username , setusername] = useState()
    const [password , setpassword] = useState()
	const [errMsg , setErrorMsg] = useState()
	const [iferr , setiferr] = useState(false)

    const handlelogin = (e)=>{
        e.preventDefault()
		if(username === "" || password === ""){
			setErrorMsg("Champs is obligatoire ! ")
			setiferr(true)
			return
		}
        AuthService.login(username, password).then(
            ()=>{
                // alert("login with username " +username+ " "+password)
				setErrorMsg("Welcome")
                navigate("/")
				setiferr(false)
            },
            (error)=>{
                const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(resMessage)
				setiferr(true)
				setErrorMsg(resMessage)
            }
        )

            console.log(username , password)
       
        
    }





const [isSignUp, setIsSignUp] = useState(false);

const handleSignUp = () => {
  setIsSignUp(true);
};

const handleSignIn = () => {
  setIsSignUp(false);
};

    
  return (
<div className='Bodylogin'>  

<div className={`containerLogin ${isSignUp ? 'right-panel-active' : ''}`} id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			<h1 className='titr'>Change Password</h1>
			<div className="social-container">
				{/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
			</div>
			{/* <span>or use your email for registration</span> */}
			<input required type="text" placeholder="Username" />
			<input required type="password" placeholder="Old Password" />
			<input required type="password" placeholder="New Password" />
			<input required type="password" placeholder="Confirm New Password" />
			<button onClick={handlelogin}>Change Password</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form >
			{iferr &&<div className='divmsg'>
				<p> {errMsg}</p>
			</div>}
			<h1>Sign in</h1>
			<div className="social-container">
				{/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
			</div>
			{/* <span>or use your account</span> */}
			<input  required  value={username  || ""} onChange={(e)=>{setusername(e.target.value)}} placeholder="Username" />
			<input required value={password  || ""} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Password" />
			<a href="#"  onClick={handleSignUp}>Forgot your password?</a>
			<button  onClick={handlelogin}>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome !</h1>
				<p>To keep connected with Insight Solutions please login </p>
				<button onClick={handleSignIn} className="ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello!</h1>
				<img src={host+"/images/logo_login.png"} />
				<p>Enter your personal details and start journey with Insight Solutions</p>
				{/* <button  onClick={handleSignUp} className="ghost"  id="signUp">Sign Up</button> */}
				<div className='copy'> 
		<p >Copyright (C) 2020-2021 by VELOVOLT</p>
	</div>
			</div>

		
		</div>
	</div>
	
</div>


</div> 
  )
}

export default Login