import React, { useState } from "react";
import './CSS/LoginSignup.css'
import {useTranslation} from "react-i18next";

const LoginSignup = () =>
{
    const {t} = useTranslation();
    const[state,setState]=useState("Login");
    const [formDate, setFormData] = useState({
        username:"",
        password:"",
        email : "",
    });

    const changeHandler = (e) => {
        setFormData({...formDate,[e.target.name]:e.target.value})
    }

    const login = async()=>{
        console.log("Login Function Executed",formDate);
        let responseDate;
        await fetch("http://localhost:4000/login",{
            method:'POST',
            headers:{
                Accept : 'application/form-data',
                'Content-Type':'application/json'
            },
            body : JSON.stringify(formDate)
        }).then((response)=>response.json()).then((data)=>responseDate=data);
        if (responseDate.success) {
            localStorage.setItem('auth-token',responseDate.token)
            window.location.replace("/");
        }
        else {
            alert(responseDate.errors);
        }
    }
    const signup = async()=>{
        console.log("Signup Function Executed",formDate);
        let responseDate;
        await fetch("http://localhost:4000/signup",{
            method:'POST',
            headers:{
                Accept : 'application/form-data',
                'Content-Type':'application/json'
            },
            body : JSON.stringify(formDate)
        }).then((response)=>response.json()).then((data)=>responseDate=data);
        if (responseDate.success) {
            localStorage.setItem('auth-token',responseDate.token)
            window.location.replace("/");
        }
        else {
            alert(responseDate.errors);
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{t(state)}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name='username' value={formDate.username} onChange={changeHandler} type = "text" placeholder={t("Your name")} />:<></>}
                    <input name = 'email' value={formDate.email} onChange={changeHandler} type="email" placeholder={t("Email Address")} />
                    <input name = 'password' value={formDate.password   } onChange={changeHandler} type="password" placeholder={t("Password")}/>
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>{t("Continue")}</button>
                {state==="Sign Up"
                ?<p className="loginsignup-login">{t("Already have an account?")} <span onClick={()=>{setState("Login")}}>{t("Login here")}</span></p>
                :<p className="loginsignup-login">{t("Create an account?")} <span onClick={()=>{setState("Sign Up")}}>{t("Click here")}</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="id="/>
                    <p>{t("By continuing, i agree to the terms of use & privacy policy")}</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup