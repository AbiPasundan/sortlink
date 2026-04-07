import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router";
import '#/index.css'
import LandingPage from '#/pages/LandingPage.jsx'
import Login from '#/pages/Login.jsx'
import Register from '#/pages/Register.jsx'
import { store } from '#/app/store.js'
import { Provider } from 'react-redux';

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
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </StrictMode>,
)
