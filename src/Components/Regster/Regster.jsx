import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import {ColorRing} from 'react-loader-spinner'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
const mySchema = Yup.object({
  name : Yup.string().required('name must be valid').min(3 , "at least 3 charcter").max(10),
    email :Yup.string().email(),
    password : Yup.string().min(6).max(12),
    rePassword : Yup.string().oneOf([Yup.ref('password')]),
    phone : Yup.string().required().matches(/^01[0125][0-9]{8}$/),
})

export default function Login() {

  
  const [isSuccess , setisSuccess] = useState(false);
  const [isLoading , setisLoading] = useState(false);
  const [errMessage , seterrMessage] = useState(undefined);
  const navigate = useNavigate();
  const userDate = {
    email :'',
    password : '',
  };
  async function mySubmit(values){
    console.log('submited....' , values);
//   try{
//     const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
//     console.log(res.data);
//   }
//   catch(err){
// console.log("error " ,err);
//   }
    // console.log(res.data);
    setisLoading(true);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
    .then( (x)=> {
    console.log('in case of success: x' ,x);
    setisSuccess(true);
    setTimeout(function(){
      setisSuccess(false) 
    } , 2000)

    })
    .catch((x)=>{
      // console.log('in case of success: x' , x);
      seterrMessage(x.response.data.message);
      setTimeout(function(){
        seterrMessage(false) 
      
      } , 2000)
   
    })
    setisLoading(false);
    navigate('/login')
  }
 

 const myFormik = useFormik({
  initialValues : userDate,

 onSubmit : mySubmit,
 //or
//   onSubmit : function(values){


//   console.log(values);
//  },
//  validationSchema :  mySchema,
 validate : function(values){
  const errors ={};
  const nameRegex = /^[A-Z][a-z]{3,8}$/
  const phoneRegex = /^01[0125][0-9]{8}$/

  if ( nameRegex.test(values.name) === false) {
    errors.name= 'invalid name'
  }
  if (values.email.includes('@') !== true ||  values.email.includes('.') !== true) {
    errors.email = 'invalid email'
  }
if (phoneRegex.test(values.phone) === false ) {
  errors.phone = 'invalid phone'
}
if (values.password.length < 6 || values.password.length > 12 ) {
  errors.password = "invalid password"
}
// if (values.rePassword.length < 6 || values.rePassword.length > 12) {
//   errors.rePassword = "invalid rePassword"
// }

if (values.password !== values.rePassword) {
  errors.rePassword = "password dosnot match"
}
console.log(errors);
  return errors;
 },
  })
  return <>
  <div className="w-75 p-5 m-auto">
    <h2>Register Now :</h2>
    <form onSubmit={myFormik.handleSubmit} >

   <label htmlFor="name" className='p-1'>name:</label>
   <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' type="text" placeholder='name' className='form-control mb-3' />
   {myFormik.errors.name && myFormik.touched.name ?    <div className="alert alert-danger">{myFormik.errors.name}</div> : ""}


   <label htmlFor="email" className='p-1'>email:</label>
   <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
   {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ""}



   <label htmlFor="password" className='p-1'>password:</label>
   <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
   {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ""}



   <label htmlFor="rePassword" className='p-1'>rePassword:</label>
   <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' type="password" placeholder='rePassword' className='form-control mb-3' />
   {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ""}



   <label htmlFor="phone" className='p-1'>phone:</label>
   <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" placeholder='phone' className='form-control mb-3' />
   {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger">{myFormik.errors.phone}</div> : ""}



   <button type='submit' className='bg-main btn rounded-3 p-2 text-white'>
   {isLoading ? <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  /> : "Register" }
   
   
   </button>

   
   { isSuccess ? <div className="alert m-3 alert-success text-center">account created</div> : ""}
   { errMessage ? <div className="alert m-3 alert-danger text-center">{errMessage}</div> : ""}



    </form>
  </div>
  
  </>
}