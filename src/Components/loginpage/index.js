import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import LoginWithGoogle from './loginWithGoogle';
import './login.css'
import $ from 'jquery'
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { DOMAIN } from '../../env';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from 'semantic-ui-react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {  Input, Space } from 'antd';
const Login = () => {
  const [forgetPass, setForgetPass] = useState(false)
  const [enterOtp, setEnterOtp] = useState('')
  const [signup, setSignup] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPssword] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState(true)
  const [invalid, setInvalid] = useState(false)
  const [otp, setOtp] = useState(false)
  const navigate = useNavigate()
  const[update,setUpdate]=useState(false)
  const[confirmPassword,setConfirmPassword]=useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const errors = {
    username: { required: false, invalid: false },
    password: { required: false, eightDigit: false },
    confirmPassword: { required: false, eightDigit: false },
    email: { required: false, check: false,length:false },
    mobile: { required: false, less: false }
  }
  const [err, setErr] = useState(errors)
  const handlesubmit = (e) => {
    e.preventDefault()
    let error = errors
    if (userName == '') {
      error.username.required = true
    }
    if (password == '') {
      error.password.required = true
    }
    if (e.target.innerHTML == 'SIGNUP' && confirmPassword == '') {
      error.confirmPassword.required = true
    }
    if (email == '') {
      error.email.required = true
    }
    if (mobile == '') {
      error.mobile.required = true
    }
    if (mobile.length < 10 || mobile.length > 10) {
      error.mobile.less = true
    }
     if (!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      error.email.check = true
    }
    setErr({ ...error })
    if (email && password && e.target.innerHTML == "LOGIN") {
      handleLogin(e)
    } 
    if (userName && String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && confirmPassword && password && mobile.length == 10 && e.target.innerHTML == 'SIGNUP') {
      if (password != confirmPassword) {
        alert("Password And Confirm password not matched!!!");
        return;
      }
      handleSignup(e)
    }
  }

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }, [])

  const handleSignup = async (e) => {

    e.preventDefault();
    $.ajax({
      url: "https://you.strackit.com/ALUMNI/loginandsignup/signup.php",
      data: { mobile: mobile, email: email, userName: userName, password: password }, method: "POST",
      success: (data) => {
        if (data) {
          if (data == '2') {
            alert("Email not available!!");
            return;
          }
          if (data == '3') {
            alert("UserName not available!!");
            return;
          }
          if (data == '0') {
            alert("Error to register");
            return;
          }
          alert('Registered Successfully')
          setLogin(true)
          setSignup(false)
          setEmail('')
          setPssword('')
        }
      }, error: (e) => {
        alert(e)
      }
    }
    );
  };

  const updatedPassword=(e)=>{
    if(password!=confirmPassword){
      alert('password not matched')
    }
    else {
      $.ajax({
        url:"https://you.strackit.com/ALUMNI/loginandsignup/changepassword.php",
        data:{ mobile, password },
        method:"POST",
        success:(data)=>{
          if(data=='1') {
            toast.success('Password changed Successfully')
            setUpdate(false)
          } else{
            alert('somthing went wrong')
          }
        },
        error:(e)=>{
          alert(e)
        }
      })
    }
  }


  const verifyOtp = () => {
    if (enterOtp) {
      $.ajax({
        url: "https://you.strackit.com/ALUMNI/loginandsignup/verifyotp.php",
        data: { mobile, otp: enterOtp },
        method: "POST",
        success: (data) => {
          if (data == '1') {
            setOtp(false)
            setUpdate(true)
          } else {
            alert('Invalid Otp')
          }
        },
        error: (e) => {
          alert(e)
        }
      });
    } else {
      alert('please enter otp to verify')
    }
  }

  const handleLogin = async (e) => {
    $.ajax({
      url: "https://you.strackit.com/ALUMNI/loginandsignup/loginwithpassword.php",
      data: { email: email, password: password,mobile:mobile }, method: "POST",
      success: (data) => {
        if(data=="Invalid Credentials"){
          alert('Invalid Credentials Please Check your Fields')
          return
        }
        if (data != "Invalid Credentials") {
         
          setInvalid(false)
          toast.success('LogedIn Successfully')
          Cookies.set("stayyoung", data)
          window.location.href = DOMAIN
        } else {
          setInvalid(true)
        }
      }, error: (e) => {
        alert(e)
      }
    }
    );
  };


  const handleForgetPassword = () => {
    if (mobile) {
      $.ajax({
        url: "https://you.strackit.com/ALUMNI/loginandsignup/verifymobilenumber.php",
        data: { mobile, field: "trouble" },
        method: "POST",
        success: (data) => {
          if (data) {
            setForgetPass(false)
            setTimeout(() => {
              setOtp(true)
            }, 2000)
          } else {
            alert("Invalid Credentials")
          }
        },
        error: (e) => {
          alert(e)
        }
      });
    } else {
      alert('enter valid mobile number')
    }
  }

  return (
    <div  className={`w-screen h-full ${login ? "pt-20 pb-24" : "py-4"} flex items-center bg justify-center`} >

      <div className='border border-1  bg-white px-4   rounded-lg overflow-hidden flex flex-col'>
        <div className={` flex flex-col py-7 transition duration-500   gap-4 rounded-lg`}>
          <div>
            <h1 className='font-bold text-center text-2xl'>{signup ? "SIGN UP" : "LOGIN"}</h1>
          </div>
          <div>
            <form className='p-4 flex flex-col gap-4'>
              {signup && <div className='flex flex-col w-full  px-4 gap-1'>
                <div>
                  <label >Username</label>
                  <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center items-center relative px-10  border-b py-3 gap-4'>
                    <p className='text-18  absolute top-5 left-2'><FaRegUser /></p>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} className='py-2   outline-none' placeholder='Type your username' />
                  </div>
                </div>
                {<p className='text-red-600'>{err.username.required ? "Please fill this field" : err.username.invalid ? "Invalid Credentials" : ""}</p>}
              </div>}
             { signup?<div className='flex flex-col w-full  px-4 gap-1'>
                <label >Email</label>
                <div>
                  <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center items-center relative px-10  border-b py-3 gap-4'>
                    <p className='text-18  absolute top-5 left-2'><MdOutlineMail /></p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='py-2   outline-none' placeholder='Type your Email' />
                  </div>
                </div>
                {err.email.required ? <p className='text-red-600'>Please Fill This Field</p> :err.email.length?<p className='text-red-600'>Invalid Mobile number</p>: err.email.check ? <p className='text-red-600'>Invalid email</p> : ""}
              </div>:<div className='flex flex-col w-full  px-4 gap-1' >
              <label >Email / Mobile</label>
                <div>
                  <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center items-center relative px-10  border-b py-3 gap-4'>
                    <p className='text-18  absolute top-5 left-2'><MdOutlineMail /></p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='py-2   outline-none' placeholder='Type your Email / Mobile' />
                  </div>
                  </div>
                </div>}

              <div className='flex flex-col  w-full px-4 gap-1'>
                <label>Password</label>
                
   
     
                <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center px-10  items-center border-b relative  py-3 gap-4'>
                  <div>
                    <p className='text-18 absolute top-5 left-2'><IoMdLock /></p>
                    {/* <input type="password" value={password} onChange={(e) => setPssword(e.target.value)} className='py-2  outline-none' placeholder='Type your password' /> */}
                    <Input.Password
        placeholder="input password"
        style={{border:"none",outline:"none",boxShadow: "none"}}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
                 
                  </div>
                </div>
                {<p className='text-red-600'>{err.password.required ? "Please Fill This Field" : invalid ? "invalid Credentials" : ""}</p>}
              </div>
              
              {signup && <div className='flex flex-col  w-full px-4 gap-1'>
                <div>
                  <label>Confirm Password</label>
                  <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center px-10  items-center border-b relative  py-3 gap-4'>
                    <p className='text-18 absolute top-5 left-2'><IoMdLock /></p>
                    <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='py-2  outline-none' placeholder='Type your confirm passwordr' />
                  </div>
                </div>
                {<p className='text-red-600'>{err.confirmPassword.required ? "Please Fill This Field" : "" }</p>}
              </div>}

              {signup && <div className='flex flex-col  w-full px-4 gap-1'>
                <div>
                  <label>Mobile</label>
                  <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center px-10  items-center border-b relative  py-3 gap-4'>
                    <p className='text-18 absolute top-5 left-2'><FaPhoneAlt /></p>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className='py-2  outline-none' placeholder='Enter your mobile number' />
                  </div>
                </div>
                {err.mobile.required ? <p className='text-red-600'>Please Fill This field</p> : err.mobile.less ? <p className='text-red-600'>Invalid Mobile Number</p> : ""}
              </div>}

              {login && <div className='w-full text-end px-4'>
                <p className='cursor-pointer' onClick={() => setForgetPass(true)}>Forgot Password?</p>
              </div>}
              <div className='w-full flex justify-center'>
                <button className='border w-full py-2 rounded-full font-bold text-white bg' onClick={(e) => handlesubmit(e)}>{login ? "LOGIN" : "SIGNUP"}</button>
              </div>
            </form>
          </div>
          <div className='flex flex-col mt-4 gap-10 justify-center items-center px-4'>
            <div className='flex flex-col justify-center items-center'>
              <p>Or Sign Up Using </p>
              <LoginWithGoogle />
            </div>
            {login && <div className='flex flex-col justify-center items-center'>
              <p>Or Sign Up Using </p>
              <button className='cursor-pointer' onClick={(e) => {
                setSignup(true)
                setLogin(false)
                setUserName('')
                setPssword('')
                setMobile('')
                setEmail('')
              }}>Create New Account</button>
            </div>}
            {signup && <div className='flex flex-col justify-center items-center'>
              <p>Already have an account please </p>
              <button className='cursor-pointer' onClick={() => {
                setSignup(false)
                setLogin(true)
                setPssword('')
                setEmail('')
              }}>Login</button>
            </div>}
          </div>
        </div>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={forgetPass}
        onClose={() => setForgetPass(false)}
      >
        <DialogTitle id="responsive-dialog-title">Enter Mobile Number</DialogTitle>
        <DialogContent>
          <TextField id="Mobile" onChange={(event) => setMobile(event.target.value)}
            label="Mobile" type="text" margin="normal" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgetPass(false)} basic color='red'>Close</Button>
          <Button onClick={(e) => handleForgetPassword(e)} basic color='blue'>Send Otp</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={otp}
        onClose={() => setOtp(false)}
      >
        <DialogTitle id="responsive-dialog-title">Enter Your Otp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField id="OTP" onChange={(event) => setEnterOtp(event.target.value)}
              label="OTP" type="text" margin="normal" fullWidth /><br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtp(false)} basic color='red'>Close</Button>
          <Button onClick={(e) => verifyOtp(e)} basic color='blue'>Verify Otp</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={update}
        onClose={() => setUpdate(false)}
      >
          <DialogTitle id="responsive-dialog-title">Enter Your New Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField id="New Password"  onChange={ (event) => setPssword(event.target.value) } 
                label="New Password" type="password" margin="normal" fullWidth />
              <TextField id="Confirm Password" value={confirmPassword} 
              onChange={ (event) => setConfirmPassword(event.target.value) } label="Confirm Password" type="password" margin="normal" fullWidth /><br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdate(false)} basic color='red'>Close</Button>
            <Button onClick={(e)=>updatedPassword(e)} basic color='blue'>Update Password</Button>
          </DialogActions>
        </Dialog>

      <Toaster />
    </div>

  )
}

export default Login