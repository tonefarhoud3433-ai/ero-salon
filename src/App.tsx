import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./features/auth/components/Login/Login";
import Register from "./features/auth/components/Register/Register";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import NotFound from "./shared/notFound/NotFound";
import ForgetPassword from "./features/auth/components/Forget/ForgetPassword";
import ResetPassword from "./features/auth/components/Reset/ResetPassword";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget", element: <ForgetPassword /> },
        { path: "reset", element: <ResetPassword /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
