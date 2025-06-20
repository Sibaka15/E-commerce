import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from 'sonner'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductsDetails from "./components/Products/ProductsDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* User Layout */}
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/collection/:collection' element={<CollectionPage/>}/>
          <Route path='/product/:id' element={<ProductsDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
          <Route path='/order/:id' element={<OrderDetailsPage/>}/>
          <Route path='/my-orders' element={<MyOrderPage/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          {/* Admin Layout */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
