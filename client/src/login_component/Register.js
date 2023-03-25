import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {

// to store new user's credentials
  const [newUser, setNewUser] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
  });

// to set new user's credentials
  const setVal = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;

    setNewUser(()=> {
      return {
        ...newUser,
        [name] : value
      }
    })
  }

// register validation
  const addNewUser = async (e) =>{
    e.preventDefault();
    const {name, email, password, confirmPassword } = newUser;

    if(name === "") {
      alert("Please Enter Name");
    }else if(email === "") {
      alert("Please Enter Email");
    }else if(password === "") {
      alert("Please Enter Password");
    }else if(password.length < 6) {
      alert("Password must be atleast 6 Character")
    }else if(confirmPassword === "") {
      alert("Please Enter Confirm Password");
    }else if(password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
    }else {
      // alert("Registered Successfully");
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, confirmPassword
        })
      });

      const res = await data.json();
      console.log(res);
    }
  }


  return (
    <>
      <div className='container'>
        <div className='form-container'>
          <div className='form-heading'>
            <h1>Sign up</h1>
          </div>
          
          <form>
            <div className='input-form'>
              <label htmlFor='name'>Name:</label>
              <input type='text' name='name' onChange={ setVal } value={ newUser.name } placeholder='Enter Email' className='text-box'/>
            </div>
            <div className='input-form'>
              <label htmlFor='email'>Email:</label>
              <input type='email' name='email' onChange={ setVal } value={ newUser.email } placeholder='Enter Email' className='text-box'/>
            </div>
            <div className='input-form'>
              <label htmlFor='password'>Password:</label>
              <input type='password' name='password' onChange={ setVal } value={ newUser.password } placeholder='Enter Password' className='text-box'/>
            </div>
            <div className='input-form'>
              <label htmlFor='confirm-password'>Confirm Password:</label>
              <input type='password' name='confirmPassword' onChange={ setVal } value={ newUser.confirmPassword } placeholder='Confirm Password' className='text-box'/>
            </div>
            
            <button className='btn' onClick={ addNewUser}>Sign up</button>

            <p>Already have account? <NavLink to='/'>Login</NavLink></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register