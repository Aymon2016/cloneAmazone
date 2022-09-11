import React from 'react'
import './signin-signup.css'
import logo from '../../img/header/amazon_black.png'
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [logged,setData]=useState({
    fname:'',
    email:'',
    mobile:'',
    password:'',
    cpassword:''
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
  const sendData = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = logged;
    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
       

        if (res.status === 422 || !data) {
            toast.error("not signup 👎!", {
                position: "top-center"
            });
        } else {
            setData({
                ...logged, fname: "", email: "",
                mobile: "", password: "", cpassword: ""
            });
            toast.success("Registration Successfully done 😃!", {
                position: "top-center"
            });
            navigate('/login');
        }
    } catch (error) {
        console.log("front end ka catch error hai" + error.message);
    }
}
  
   

  return (
    <>
      <section className='signup_section'>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src={logo} className='img-fluid' alt='amazone logo'/>

          </div>
          <div className='sign_form'>
            <form method='post'>
              <h1>Create account</h1>
              <div className='form_data'>
                <label htmlFor='fname'>Your name</label>
                <input type='text'placeholder='Your name' name='fname' value={logged.fname}onChange={addData} id='fname' />
              </div>
              <div className='form_data'>
                <label htmlFor='email'>email</label>
                <input type='text'placeholder='email' name='email'value ={logged.email}onChange={addData} id='email' />
              </div>
              <div className='form_data'>
                <label htmlFor='mobile'>mobile</label>
                <input type='text'placeholder='mobile' name='mobile'value ={logged.mobile} onChange={addData} id='mobile' />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='at least 8 charackter' name='password' value ={logged.password} onChange={addData} id='password' />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Re-enter password</label>
                <input type='password' placeholder='at least 8 charackter' name='cpassword' value ={logged.cpassword} onChange={addData} id='password' />
              </div>
              <button className="signin_btn " onClick={sendData}>Continue</button>
            </form>

          </div>
          <div className="create_accountinfo">
                    <p>Already have an account? <NavLink to="/login">Signin</NavLink></p>
                    
                </div>
          <ToastContainer />
        </div>
      </section>
    </>
  )
}

export default Signup