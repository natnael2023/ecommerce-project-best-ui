import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#0070FF]  border-b shadow-md">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block text-white hover:bg-blue-700"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end items-center gap-4">
        {/* Optional Profile Icon */}
        {/* <div className="hidden lg:flex items-center gap-2 text-white">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">Admin</span>
        </div> */}

        <Button className="mt-auto inline-flex gap-2 items-center px-4 py-3 text-sm font-semibold 
        rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700
         text-white transition-all duration-500 hover:shadow-lg hover:scale-[1.02] group"
         onClick={handleLogout}
         >
          <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="bg-gradient-to-r from-transparent via-white/50 to-transparent h-[1px] w-0 group-hover:w-16 transition-all duration-500" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
