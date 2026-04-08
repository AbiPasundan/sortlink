import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router";
import '#/index.css'
import LandingPage from '#/pages/LandingPage.jsx'
import Login from '#/pages/Login.jsx'
import Register from '#/pages/Register.jsx'
import { store } from '#/app/store.js'
import { Provider } from 'react-redux';
import Dashboard from '#/pages/Dashboard';
import NotFound from '#/pages/NotFound';
import SortLink from '#/pages/SortLink';
import Profile from '#/pages/Profile';

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
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/createlink",
    Component: SortLink,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </StrictMode>,
)
