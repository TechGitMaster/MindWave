import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Page/Login';
import Home from './Page/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={ <App /> } />
                <Route element={ <App /> }>
                    <Route path='/Login' element={ <Login /> }></Route>
                </Route>

                <Route element={ <App /> }>
                    <Route path='/Home' element={ <Home /> }></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
