/**
 * @module App.jsx
 * @description Main page of application. Contains all routing info
 */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import React components for each route
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import Search from './components/Search.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
    return(
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/chat' element={<Chat />}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;