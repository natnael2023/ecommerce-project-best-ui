import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import  AuthContext  from "./context/auth-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <InstructorProvider>
        <AuthContext>
          <App />
          <Toaster />
        </AuthContext>
      </InstructorProvider>
    </Provider>
  </BrowserRouter>
);
