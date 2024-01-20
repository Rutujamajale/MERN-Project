import React, { useEffect, useState } from "react";
import '../CSS/SignUp.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user'); 
        if(auth){
            navigate('/');
        }
    },)

    const collectData= async ()=>{
        console.warn(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result));
        if(result){
            navigate('/');
        }
    }

    return (
        <>
            <div>
                <h2 className="rhead">Register</h2>
                <div className="rbox">
                    <input className="signBox" type="text" placeholder="Enter Name" 
                    value={name} onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    <input className="signBox" type="email" placeholder="Enter Username" 
                    value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                    <input className="signBox" type="Password" placeholder="Enter Password" />
                    <input className="signBox" type="Password" placeholder="Confirm Password" 
                    value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                    <button className="signBox" id="signbtn" onClick={collectData}>SignUp</button>
                </div>
            </div>
        </>
    )
}

export default SignUp;