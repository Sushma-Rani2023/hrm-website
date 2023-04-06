import React from "react";
import { useLocation } from "react-router-dom";

function LogoutButton() {
  function eraseCookie(name) {
    console.log("deletingg");
    localStorage.removeItem("token")
  }
  console.log("log outtttttttt");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = JSON.parse(searchParams.get("user"));
  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        window.location.href = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${process.env.REACT_APP_BASE_URL}/login/auth/microsoft`;
      },eraseCookie("token"))
      .catch(console.error);
  };

  return (
    <button className="btn btn-info" onClick={handleLogout}>
      Logout {user}
    </button>
  );
}

export default LogoutButton;
