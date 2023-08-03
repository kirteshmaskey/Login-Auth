import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

// to store user's login credentials
  const [user, setUser] = useState({
    email : "",
    password : ""
  });
  const [isUserValid, setIsUserValid] = useState(true);

  const navigate = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;
// to set users credentials
    setUser(()=> {
      return {
        ...user,
        [name] : value
      }
    })
  }

// login validation
  const loginUser = async (e) => {
    e.preventDefault();

    const {email, password} = user;

    if(email === "") {
      alert("Please Enter Email");
    }else if(password === "") {
      alert("Please Enter Password");
    }else {
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

      const res = await data.json();
      // console.log(res);

// common alert for all
      // alert(res.message);
      if(res.status === 201) {
        localStorage.setItem("usertoken", res.isUser.token);
        navigate("/landingpage");
        setUser({
          ...user,
          email : "",
          password : ""
        })
        setIsUserValid(true);
      }else {
        setIsUserValid(false);
      }
      
    }
  }

  const checkPreLogin = async () => {
    const token = localStorage.getItem("usertoken");

    const res = await fetch("/validuser", {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "authorize": token
      }
    });
    
    const data = await res.json();

    if(data.status === 401 || !data) {
    }else {
      navigate("/landingpage");
    }
  }

  useEffect(()=>{
    checkPreLogin();
  }, [])


  return (
    <>
      <div className='container'>
        <div className='form-container'>
          <div className='form-heading'>
            <h1>Welcome to Login</h1>
          </div>
          
          <form>
            <div className='input-form'>
              <label htmlFor='email'>Email:</label>
              <input type='email' name='email' onChange={ setVal } value={ user.email } placeholder='Enter Your Email' className='text-box'/>
            </div>
            <div className='input-form'>
              <label htmlFor='password'>Password:</label>
              <input type='password' name='password' onChange={ setVal } value={ user.password } placeholder='Enter Your Password' className='text-box'/>
            </div>
            
            <button className='btn' onClick={ loginUser }>Login</button>
            { !isUserValid ? <p id='incorrect-password' style={ {color : 'red'} }>Password or username is invalid</p> : <p></p>}
            <p>Don't have account?<NavLink to='/register'>Create New</NavLink></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
