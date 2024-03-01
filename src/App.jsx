import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Components/Layo/Layout';
import Regster from './Components/Regster/Regster';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import AuthonProvider from './Context/Authontication';
import Cart from './Components/Cart/Cart';
import Category from './Components/Category/Category';
import Protecter from './Components/Portecter/Protecter';
import {QueryClient, QueryClientProvider} from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import toast , {Toaster} from 'react-hot-toast'
import Payment from './Components/Payment/Payment';
import Allorders from './Components/Allorders/Allorders';
import Brands from './Components/Brands/Brands';



const myRouter = createBrowserRouter([
  {path : '/' , element : <Layout /> , children: [
    {index : true , element : <Regster />},
    {path : 'regster' , element : <Regster />},
    {path : 'login' , element : <Login />},
    {path : 'products' , element : <Products />},
    {path : '/cart' , element :<Protecter >
      <Cart />
    </Protecter> },
    {path : '/category' , element :   <Protecter>
     <Category />
    </Protecter> },
    {path : '/ProductDetails/:id' , element :   <Protecter>
     <ProductDetails />
    </Protecter> },
  
    {path : '/payment' , element :   <Protecter>
     <Payment />
    </Protecter> },
    {path : '/allorders' , element :   <Protecter>
     <Allorders />
    </Protecter> },
    {path : '/brands' , element :   <Protecter>
     <Brands />
    </Protecter> },
    {path : '/category' , element :   <Protecter>
     <Category />
    </Protecter> },
    {path : '*' , element : <Notfound/>},
  ]},
])


export default function App() {

  const myClient = new QueryClient();

  return <>
  <QueryClientProvider client={myClient}>
<AuthonProvider>
   <CartContextProvider>

  
    <RouterProvider  router={myRouter}/>
  


  </CartContextProvider>
  </AuthonProvider>
  </QueryClientProvider>
 <Toaster />
  
  </>
}
