/**
 * @module App.jsx
 * @description Main page of application. Contains all routing info
 */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import React components for each route
import Main from './components/Main.jsx';

const App = () => {
    return(
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/login' element={<Main />}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;