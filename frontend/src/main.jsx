import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '#/index.css'
import LandingPage from '#/pages/LandingPage.jsx'
import Login from '#/pages/Login.jsx'
import Register from '#/pages/Register.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
