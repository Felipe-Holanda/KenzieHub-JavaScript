import { ToastContainer } from 'react-toastify';
import MakeRoutes from './routes';
import GlobalStyle from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={1500} closeOnClick theme="dark" />
            <MakeRoutes />
            <GlobalStyle />
        </>
    )
}