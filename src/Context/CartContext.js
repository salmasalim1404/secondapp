import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './Authontication';




export const cartContext =    createContext();


export default function CartContextProvider( {children} ) {
const {myToken} = useContext(authContext)
    const [numOfCartItems , setnumOfCartItems ] = useState(0)
    const [totalCartPrice , settotalCart ] = useState(0)
    const [allProducts , setallProducts] = useState(null)
    const [CartID , setCartID] = useState(null)
    console.log("crt", CartID);
    console.log(allProducts);


    async function ClearCart(){
        const boll = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
              headers:{
                  token : localStorage.getItem('tkn')
              },
          }).then((res)=>{
            // console.log("res.data" , res.data);
              setallProducts([]);
              setnumOfCartItems(0);
              settotalCart(0);
              return true;
          })
          .catch((err)=>{
              console.log("err" , err);
              return false;
          })
          return boll;
      }

   async function deleteItem(id) {
      const boll = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers:{
                token : localStorage.getItem('tkn')
            },
        }).then((res)=>{
            setallProducts(res.data.data.products);
            setnumOfCartItems(res.data.numOfCartItems);
            settotalCart(res.data.data.totalCartPrice);
            return true;
        })
        .catch((err)=>{
            console.log("err" , err);
            return false;
        })
        return boll;
    }

   async function updateCount(id , newCount){
      const bolean = await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            "count": newCount
        },{
            headers:{
                token : localStorage.getItem('tkn')
            },
        }).then(  (res)=> {
            setallProducts(res.data.data.products);
            setnumOfCartItems(res.data.numOfCartItems);
            settotalCart(res.data.data.totalCartPrice);
            return true;
        })
        .catch(  (err)=> {
            console.log("err" , err);
            return false;
        })
        return bolean;
    }




function getUserCart(){
   axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
        headers :{
            token : localStorage.getItem('tkn')
        },
    }).then((res)=>{
        console.log("res" , res.data);
        setCartID(res.data.data._id)
        localStorage.setItem('userID' , res.data.data.cartOwner)
        setallProducts(res.data.data.products);
        setnumOfCartItems(res.data.numOfCartItems);
        settotalCart(res.data.data.totalCartPrice);
      
            }).catch( (err)=>{
        console.log("err" , err);
            });
}

useEffect(()=>{
    console.log("getting user data");
    getUserCart()
} , [myToken])

function putDataInCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId} ,{
        headers : {
            token : localStorage.getItem('tkn')
        }
    }).then(({data})  => data , getUserCart ()).catch( err => err)
}

// let {counter , setCounter} =useState(0)
//  function putDataInCart(id) {
// return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
//         "productId": id 
//     }, {
//         headers : { token : localStorage.getItem('tkn')}
//     }).then((res)=>{
// console.log(res);
//     }).catch( (err)=>{
// console.log(err);
//     });
   
//   }

  return <cartContext.Provider value={{ 
    putDataInCart,
    numOfCartItems,
    totalCartPrice,
    allProducts,
    updateCount,
    deleteItem,
    ClearCart,
    CartID,
    getUserCart,
     
     
     }}>
  
  {children} 
  
  </cartContext.Provider>
}
