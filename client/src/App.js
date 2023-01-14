import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Auth/Signup";
import SignIn from "./components/Auth/Signin";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";

const App = () => {
    
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
	const globalLogin = () => setUser(JSON.parse(localStorage.getItem('profile')));
    const globalLogout = () => {
        setUser(null);
		localStorage.removeItem('profile');
        navigate('/');
    }

    return(
        <>
            <Navbar user={user} globalLogout={globalLogout}/>
            <Routes>
                <Route path='/' exact element={user?<Navigate to='/home'/>:<LandingPage />}/>
                <Route path='/signin' exact element={<SignIn globalLogin={globalLogin}/>} />
                <Route path='/signup' exact element={<SignUp globalLogin={globalLogin}/>} />
                <Route path='/home' exact element={<Home />} />
                {/* <Route path='/inventory' exact element={<Inventory />} /> */}
            </Routes>
        </>
    );
}

export default App;