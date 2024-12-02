import "./App.scss";
import "./styles/global.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createTheme } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./api/AuthProvider";
import { ApiContext } from "./api/Api";
import { ApiService } from "./api/ApiService";
import LogoutPage from "./pages/LogoutPage";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const apiService = new ApiService("http://localhost:35124/api", () => {});

const App = () => {
  return (
    <ApiContext.Provider value={apiService}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ApiContext.Provider>
  );
};

export default App;
