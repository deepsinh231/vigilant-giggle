import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authetication = true }) {
    const navigate = useNavigate();
    const [loader, setloader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    useEffect(() => {
        // f && f !==f
        if (authetication && authStatus !== authetication) {
            navigate("/login")
        } else if (!authetication && authStatus !== authetication) {
            navigate("/")
        }
        setloader(false)
    }, [authetication, navigate, authStatus])
    return loader ? <h1>Loding...</h1> : <>{children}</>
}


