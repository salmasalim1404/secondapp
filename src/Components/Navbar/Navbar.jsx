import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { authContext } from '../../Context/Authontication'
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {

 const {numOfCartItems}= useContext(cartContext)


  const {myToken , setToken} = useContext(authContext);
 const navigate = useNavigate()
  function logout() {
    setToken(null);
    localStorage.removeItem('tkn')
    navigate('/login')
  }



  console.log(myToken);
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   <Link className="navbar-brand" href="#">
    <img src={logo} alt="fresh cart" />
    </ Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {myToken ?   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link className="nav-link active" aria-current="page" to={'/products'}>Home</ Link>
        </li>
        {/* <li className="nav-item">
         <Link className="nav-link" to={''}>Cart</ Link>
        </li> */}
        <li className="nav-item">
         <Link className="nav-link" to={'/products'}>Products</ Link>
        </li>
        {/* <li className="nav-item">
         <Link className="nav-link" to={'/'}>Categores</ Link>
        </li> */}
        <li className="nav-item ">
         <Link className="nav-link" to={'/brands'}>Brands</ Link>
        </li>
        <li className="nav-item ">
         <Link className="nav-link" to={'/allorders'}>All Orders</ Link>
        </li>
        <li className="nav-item position-relative">
         <Link className="nav-link" to={'/cart'}>Cart  </ Link>
         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfCartItems ? numOfCartItems : ""}
    
  </span>
        </li>
        <li className="nav-item">
         <Link className="nav-link" to={'/category'}>Category</ Link>
        </li>
     
    
      </ul> : ""}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item">
        <ul className='list-unstyled d-flex '>
          <li>
            <i  className='me-2 fa-brands fa-instagram'></i>
          </li>
          <li>
            <i  className='me-2 fa-brands fa-facebook'></i>
          </li>
          <li>
            <i  className='me-2 fa-brands fa-linkedin'></i>
          </li>
          <li>
            <i  className='me-2 fa-brands fa-twitter'></i>
          </li>
        </ul>
        </li>
       
      {myToken ?   <li  className=" nav-item">
         <span role='button' onClick={logout} className="nav-link" >Logout</ span>
        </li> : <>
        <li  className=" nav-item">
         <Link className="nav-link" to={'/regster'}>Regster</ Link>
        </li>
        <li  className=" nav-item">
         <Link className="nav-link" to={'/login'}>Login</ Link>
        </li>
        </>}
       
     
    
      </ul>
    
    </div>
  </div>
</nav>
  
  
  
  </>
}
