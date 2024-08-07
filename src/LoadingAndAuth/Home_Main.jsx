import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./authService";
import { login, logout, loadUserData } from "../Store/AuthSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer, LogoutUser, Loader } from "../Component";
import { ToastContainer } from 'react-toastify';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(login(JSON.parse(localStorage.getItem("userdata"))))
        const loadUser = async () => {
            const userData = await getCurrentUser();
            if (userData) {
                dispatch(login(userData));
            } else {
                dispatch(logout());
            }
            setLoading(false);
        };

        dispatch(loadUserData());
        loadUser();
    }, [dispatch]);


    const handleLogout = async () => {
        const success = await LogoutUser();
        if (success) {
            dispatch(logout());
        }
    };
    return !loading ? (
        <div className="bg-background-image">
            <ToastContainer />
            <Header onLogout={handleLogout} />
            <div className="line_pro_ani"></div>
            <main>
                <Outlet />
            </main>
            <div className="line_pro_ani"></div>
            <Footer />
        </div>
    ) : (
        <Loader />
    );
}

export default App;
