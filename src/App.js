import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {createTheme,ThemeProvider} from '@mui/material'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import FavouriteProducts from './pages/Favirote';
import Cart from './pages/Cart';
import ShippingOrder from './pages/ShippingOrder';
import PaymentOrder from './pages/OrderPayment';
import SuccessOrder from './pages/OrderSuccess';
import ShopDepartment from './pages/ShopByDepartment';
import MyOrders from './pages/MyOrder';
import SingleOrder from './pages/SingleOrder';

function App() {
  const {user} = useSelector((state)=>state.userLogin)
  
  const theme = createTheme({
    palette:{
      primary:{
        main:"#ff5252",
        contrastText:"white"
      },
      Black:{
        main:"#24292d",
        contrastText:"white"
      }
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/product/:productId' element={<SingleProduct/>}/>
          <Route path='favirotes' element={!user?<Navigate to={"/"}/>:<FavouriteProducts/>}/>
          <Route path='cart' element={!user?<Navigate to={"/login"}/>:<Cart/>}/>
          <Route path='order/shipping' element={!user?<Navigate to={"/login"}/>:<ShippingOrder/>}/>
          <Route path='order/payment' element={!user?<Navigate to={"/login"}/>:<PaymentOrder/>}/>
          <Route path='order/success' element={!user?<Navigate to={"/login"}/>:<SuccessOrder/>}/>
          <Route path='my-orders' element={!user?<Navigate to={"/login"}/>:<MyOrders/>}/>
          <Route path='my-orders/:orderId' element={!user?<Navigate to={"/login"}/>:<SingleOrder/>}/>
          <Route path='register' element={user?<Navigate to={"/"}/> :<Register/>}/>
          <Route path='login' element={user?<Navigate to={"/"}/>:<Login/>}/>
          <Route path='department/:title/:id' element={<ShopDepartment/>}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
