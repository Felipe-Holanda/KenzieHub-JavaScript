import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register'
import Dashboard from '../Pages/Dashboard';
import ErrorPage from '../Pages/Error';


export default function MakeRoutes() {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}