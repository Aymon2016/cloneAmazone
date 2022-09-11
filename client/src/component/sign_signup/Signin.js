import React from 'react'
import './signin-signup.css'
import logo from '../../img/header/amazon_black.png'
import {NavLink} from 'react-router-dom';
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Logincontext } from "../context/Contextprovider";
import{ useContext } from 'react';
import { useNavigate } from 'react-router-dom';


function Signin() {
  const { account, setAccount } = useContext(Logincontext);

  const [logged,setData]=useState({
    email:'',
    password:''
  })

  const addData=(e)=>{
    const {name,value}=e.target;
    setData(()=>{
      return{
        ...logged,
        [name]:value

      }

    })
  }
  let navigate = useNavigate();


  const sendData=async(e)=>{
    e.preventDefault();
    const {email,password}=logged;

    const res = await fetch("/login",{
      method:'POST',
      headers:{
          "content-Type":"application/json"
      },

      body:JSON.stringify({
        email,password
      })
  });
  const data = await res.json()
  

  if (res.status === 400 || !data) {
    console.log("invalid details");
    toast.error("Invalid Details 👎!", {
        position: "top-center"
    });
}else {
    setData({ ...logged, email: "", password: "" })
    toast.success("Login Successfully done 😃!", {
    position: "top-center"
    });
    setAccount(data)
     navigate('/');
}
}


  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src={logo} className='img-fluid' alt='amazone logo'/>

          </div>
          <div className='sign_form'>
            <form method='post'>
              <h1> Sign-in</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input type='text'placeholder='your email' name='email' id='email'value={logged.email} onChange={addData} />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='at least 8 charackter' name='password' value={logged.password} id='password' onChange={addData} />
              </div>
              <button className="signin_btn " onClick={sendData}>Continue</button>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <NavLink to="/register"><button>Create your Amazon Account</button></NavLink>
                </div>
                
        </div>

      </section>
    </>
  )
}

export default Signin