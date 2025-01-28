import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_Auth = ({ isAuthenticated, children, user }) => {
  console.log(isAuthenticated, user);
  const location = useLocation();
  const userRole = user?.data?.role;

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return userRole === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  if (
    isAuthenticated &&
    userRole !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth_page" />;
  }

  if (
    isAuthenticated &&
    userRole === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default Check_Auth;
