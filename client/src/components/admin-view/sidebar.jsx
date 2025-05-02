import {
  BadgeCheck,
  Baseline,
  ChartNoAxesCombined,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  School,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import logo from "../../../public/analytics-hubbit.png";
import { Button } from "../ui/button";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "instructor",
    label: "Instructor",
    path: "/admin/instructor",
    icon: <Baseline />,
  },
  {
    id: "courses",
    label: "Course",
    path: "/admin/courses",
    icon: <School />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-white hover:bg-blue-500 transition duration-300 hover:scale-105"
        >
          <div className="text-white">{menuItem.icon}</div>
          <span className="font-semibold">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 bg-[#0070FF]">
          <div className="flex flex-col h-full">
            <SheetHeader className="pb-4">
              <SheetTitle
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-3 mb-6 border-b cursor-pointer group transition-all duration-300 hover:bg-slate-700/30 rounded-lg p-2"
              >
                <img
                  src={logo}
                  className="w-9 h-9 rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
                <h1 className="text-2xl font-bold text-white transition-all duration-500 group-hover:translate-x-2">
                  Hubbit Seller
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-60 flex-col border-r bg-[#0070FF] from-blue-600 to-blue-700 p-6 lg:flex shadow-2xl backdrop-blur-lg border-slate-700">
        {/* Header with hover animation */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 mb-6 border-b cursor-pointer group transition-all duration-300 hover:bg-slate-700/30 rounded-lg p-2"
        >
          <img
            src={logo}
            className="w-9 h-9 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-2xl font-bold text-white transition-all duration-500 group-hover:translate-x-2">
            Hubbit Seller
          </h1>
        </div>

        {/* Animated Menu Items with Scroll */}
        <div className="flex-grow overflow-hidden custom-scrollbar">
          <MenuItems
            className="transition-all duration-300 hover:bg-slate-700/20 rounded-lg"
            itemClassName="px-4 py-3 text-slate-300 hover:text-white flex items-center gap-3 hover:translate-x-2 transition-all duration-300"
            activeClassName="bg-slate-700/40 !text-white"
          />
        </div>

        {/* Enhanced Logout Button with Interactive Animation */}
        {/* <Button className="mt-auto inline-flex gap-2 items-center px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white transition-all duration-500 hover:shadow-lg hover:scale-[1.02] group">
          <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="bg-gradient-to-r from-transparent via-white/50 to-transparent h-[1px] w-0 group-hover:w-16 transition-all duration-500" />
          Logout
        </Button> */}

        {/* Sidebar Toggle Button */}
        <button
          className="absolute -right-3 top-6 bg-slate-800 rounded-full p-2 shadow-xl hover:bg-slate-700 transition-all duration-300 hover:-translate-x-1 border border-slate-700 backdrop-blur-sm"
          onClick={() => setOpen((prev) => !prev)} // Toggle the sidebar open/close state
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
