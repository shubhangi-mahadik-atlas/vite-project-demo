import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IRender {
    children: ReactNode
}

const ProtectedRoute: React.FC<IRender> = ({children}) => {
    const isLoggedIn: boolean = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            return <>{children}</>
        } else {
            return <Navigate to="/login" replace={true} />
        }
}

export default ProtectedRoute;