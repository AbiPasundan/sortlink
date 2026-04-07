import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '#/index.css'
import App from '#/App.jsx'
import Login from '#/pages/Login.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/Login",
    Component: Login,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
