/**
 * @module index.js
 * @description entry point for application
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './reducers/exerciseReducer.js';
import userReducer from './reducers/userReducer.js';

import App from './App.jsx';

// Configure Redux store for state management
const store = configureStore({
    reducer: {
        // add reducers here
        exercises: exerciseReducer,
        user: userReducer,
    }
});

// Render React app off of 'root' element using DOM manipulation
const root = createRoot(document.getElementById('root'));

root.render(
    // Wrap app in Provider component to pass store (access to state)
    <Provider store={store}>
        <App />
    </Provider>
);