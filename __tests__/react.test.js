import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import App from '../src/App';
import Chat from '../src/components/Chat';
import Home from '../src/components/Home';
import Landing from '../src/components/Landing';
import Login from '../src/components/Login';
import Profile from '../src/components/Profile';
import Search from '../src/components/Search';
import SignUp from '../src/components/SignUp';

