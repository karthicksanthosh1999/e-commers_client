import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* admin Sidebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        <main className="flex-1 flex bg-green-300 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
