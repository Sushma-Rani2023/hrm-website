import React from "react";
import { useLocation } from "react-router-dom";



function LogoutButton() {
    function eraseCookie(name) {   
        document.cookie = name+'=; Max-Age=-99999999;';  
    }
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
                   
                ), eraseCookie('token')
            }`;
            })
            .catch(console.error);
    };



    return <button  className="btn btn-info" onClick={handleLogout}>Logout {user}</button>;
}



export default LogoutButton;