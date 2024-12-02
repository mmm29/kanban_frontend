import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
    useEffect(() => {
        // TODO: send api logout
    }, []);

    return <Navigate to='/login'></Navigate>;
};

export default LogoutPage;