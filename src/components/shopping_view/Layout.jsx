import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "../../pages/shopping_view/Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* COMMON HEADER */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
