import { LogOut, Menu, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div key={menuItem.id}>
          {menuItem.subItems ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Label className="text-sm font-medium cursor-pointer rounded-lg hover:underline hover:text-indigo-500">
                  {menuItem.label}
                </Label>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItem.subItems.map((subItem) => (
                  <DropdownMenuItem
                    key={subItem.id}
                    onClick={() => handleNavigate(subItem)}
                  >
                    {subItem.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Label
              onClick={() => handleNavigate(menuItem)}
              className="text-sm font-medium cursor-pointer rounded-lg hover:underline hover:text-indigo-500"
            >
              {menuItem.label}
            </Label>
          )}
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <span className="sr-only">User cart</span>
          <div className="relative cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              {cartItems?.items?.length || 0}
            </button>
          </div>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems?.items?.length > 0 ? cartItems.items : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-indigo-500 text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header className="fixed top-4 left-3 right-3 w-80% bg-slate-300 dark:bg-slate-800 shadow z-10 rounded-full">

      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img
            src="../../../public/analytics-hubbit.png"
            alt="Logo"
            className="h-6 w-6"
          />
          <span className="font-bold text-indigo-500 hover:text-indigo-800">
            Hubbit
          </span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs flex flex-col items-center gap-4">
          <form
  onSubmit={(e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim();
    if (searchQuery) {
      navigate(`/shop/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }}
  className="w-full px-2"
>
  <input
    type="text"
    name="search"
    placeholder="Search products..."
    className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
  />
</form>

            <MenuItems />
            {isAuthenticated ? (
  <HeaderRightContent />
) : (
  <div className="flex flex-col gap-2 w-full">
    <Button variant="outline" className="w-full">
      <Link to="/auth/login">Sign In</Link>
    </Button>
    <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
      <Link to="/auth/register">Sign Up</Link>
    </Button>
  </div>
)}

          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center">
        <form
  onSubmit={(e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim();
    if (searchQuery) {
      navigate(`/shop/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }}
  className="relative w-full max-w-md mx-4"
>
  <input
    type="text"
    name="search"
    placeholder="Search products..."
    className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
  />
</form>

          <MenuItems />
        </div>

        <div className="hidden lg:flex items-center gap-4">
        {isAuthenticated ? (
  <HeaderRightContent />
) : (
  <div className="flex gap-2">
    <Button variant="outline">
      <Link to="/auth/login">Sign In</Link>
    </Button>
    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
      <Link to="/auth/register">Sign Up</Link>
    </Button>
  </div>
)}

        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
