import { Outlet } from "react-router-dom";
import ShoppingHeader from "../shopping-view/header";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Shopping Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-background shadow-sm">
        <ShoppingHeader />
      </div>

      {/* Left panel for branding - visible on large screens */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 relative overflow-hidden px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-800/30 to-black/40 backdrop-blur-md z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center items-center max-w-md space-y-6 text-center text-primary-foreground"
        >
          <img
            src="/analytics-hubbit.png"
            className="w-28 drop-shadow-md"
            alt="Hubbit Logo"
            loading="lazy"
          />
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-indigo-400">Hubbit Shopping</span>
          </h1>
          <p className="text-md text-muted-foreground">
            Discover a smarter way to shop — fast, fun, and personalized.
          </p>
        </motion.div>
      </div>

      {/* Right side for auth forms */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
