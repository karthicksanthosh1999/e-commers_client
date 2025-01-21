import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin_view/Layout";
import AdminDashboard from "./pages/admin_view/Dashboard";
import AdminOrder from "./pages/admin_view/Order";
import AdminProducts from "./pages/admin_view/Products";
import AdminFeatures from "./pages/admin_view/Features";
import ShoppingLayout from "./components/shopping_view/Layout";
import Not_found from "./pages/not_found/Not_found";
import ShoppingAccount from "./pages/shopping_view/Account";
import ShoppingListing from "./pages/shopping_view/Listing";
import ShoppingCheckout from "./pages/shopping_view/Checkout";
import Check_Auth from "./components/common/Check_Auth";
import Un_Auth from "./components/un_auth/Un_Auth";
import { useDispatch, useSelector } from "react-redux";
import ShoppingHome from "./components/shopping_view/Home";
import { useEffect } from "react";
import { checkAuth } from "./features/slices/auth_slices";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* COMMON ROUTES */}
        <Route
          path="/auth"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </Check_Auth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </Check_Auth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* SHOPPING ROUTES */}
        <Route
          path="/shop"
          element={
            <Check_Auth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Check_Auth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
        </Route>

        {/* PAGE NOT FOUND */}
        <Route path="unauth_page" element={<Un_Auth />} />
        <Route path="*" element={<Not_found />} />
      </Routes>
    </div>
  );
}

export default App;
