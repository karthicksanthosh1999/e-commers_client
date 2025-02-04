import { ChartNoAxesCombined } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    const adminSideBarMenus = [
      {
        id: "dashboard",
        lable: "Dashboard",
        path: "/admin/dashboard",
        icons: <LayoutDashboard />,
      },
      {
        id: "products",
        lable: "Products",
        path: "/admin/products",
        icons: <ShoppingBasket />,
      },
      {
        id: "orders",
        lable: "Orders",
        path: "/admin/orders",
        icons: <BadgeCheck />,
      },
    ];

    return (
      <nav>
        {adminSideBarMenus.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground ${
              currentLocation === menuItem.path &&
              "bg-muted text-foreground text-black"
            } hover:bg-muted hover:text-foreground hover:cursor-pointer`}
          >
            {menuItem.icons}
            <span>{menuItem.lable}</span>
          </div>
        ))}
      </nav>
    );
  }
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 mb-5 "
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
