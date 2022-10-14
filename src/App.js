import React from 'react';
import { ToastContainer } from 'react-toastify';
import MakeRoutes from './routes';
import GlobalStyle from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/AuthContext';

export default function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={1500} closeOnClick theme="dark" />
            <GlobalStyle />
            <AuthProvider>
                <MakeRoutes />
            </AuthProvider>
        </>
    )
}