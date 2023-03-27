import React from "react";
import { useLocation } from "react-router-dom";



function LogoutButton() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = JSON.parse(searchParams.get("user"));
    const handleLogout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        })
            .then(() => {
                window.location.href = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${encodeURIComponent(
                    window.location.origin
                )}`;
            })
            .catch(console.error);
    };



    return <button onClick={handleLogout}>Logout {user}</button>;
}



export default LogoutButton;