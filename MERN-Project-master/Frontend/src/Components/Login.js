import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user'); 
        if(auth){
            navigate('/');
        }
    },)

    const handleLogin = async ()=>{
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert('Please enter correct details');
        }
    }

    return(
        <>
           <div>
                <h2 className="rhead">LogIn</h2>
                <div className="rbox">
                    <input className="signBox" type="email" placeholder="Username" 
                    value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}  
                    />
                    <input className="signBox" type="Password" placeholder="Password" 
                    value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} 
                    />
                    <button className="signBox" id="signbtn"  onClick={handleLogin}>LogIn</button>
                </div>
            </div>
        </>
    )
}

export default Login;