import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ManageBooks from './components/ManageBooks';
import ManageUsers from './components/ManageUsers';
import ManageOrders from './components/ManageOrders';
import ManageReviews from './components/ManageReviews';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ManageCategory from './components/ManageCategory';
import OrderDetail from './components/OrderDetail';
function App() {
    const location = useLocation();
    const noNavbar = ['/', '/signup'];
    const noSidebar = ['/', '/signup'];
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
     const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
     }
  return (
    <div className="flex min-h-screen bg-slate-50">
        {!noSidebar.includes(location.pathname) && <>{isSidebarOpen && <Sidebar />} </>}
        <div className='flex-1'>
            {!noNavbar.includes(location.pathname) && <Navbar toggleSidebar={toggleSidebar}/>}
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/manage-category' element={<ManageCategory />} />
            <Route path="/manage-books" element={<ManageBooks />} />
            <Route path="/manage-users" element={<ManageUsers />}/>
            <Route path='/manage-orders' element={<ManageOrders />}/>
            <Route path='/manage-reviews' element={<ManageReviews />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/order-detail/:id' element={<OrderDetail />}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
