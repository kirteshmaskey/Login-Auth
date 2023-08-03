import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [isValid, setIsValid] = useState(false);

// to logout user
  const userLogout = async() => {
    let token = localStorage.getItem("usertoken");

    const req = await fetch("/logout", {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "authorize": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await req.json();

    if(data.status !== 201) {
      // console.log("Error while logging out");
    }else {
      // console.log("Log out sucessfully");
      localStorage.removeItem("usertoken");
      setIsValid(false);
      navigate("/");
    }
  } 

// to validate the user
  const validate = async () => {
    let token = localStorage.getItem("usertoken");
    // console.log(token);
    const res = await fetch("/validuser", {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "authorize": token
      }
    });
    
    const data = await res.json();
    
    if(data.status === 401 || !data) {
      navigate("/");
    }else {
      setUserData(data.user);
      setIsValid(true);
      navigate("/landingpage");
    }
  }
  // validate();
  useEffect(()=> {
    validate();
  })



  return (
   
    <>
    {
      isValid ? 
        <>
          <div style={{textAlign: "center"}}>
            <button onClick={userLogout}>Logout</button>
            <h1>Login Successful</h1>
            <br />
            <h3>Name: {userData.name}</h3>
            <br />
            <h3>Email: {userData.email}</h3>
          </div>
        </>
      :
        <>
          Loading ...
        </>
    }
    
    </>
  )
}

export default LandingPage