import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/styles.css";
import HomePage from './homePage.jsx';
import LoginPage from './loginPage.jsx';
import UserPage from './userPage.jsx';
import UserHome from './userContent/userHome.jsx';
import UserProfile from './userContent/userProfile.jsx';
import EditProfile from './userContent/editProfile.jsx';
import ForgotPassword from './loginContent/forgotPassword.jsx';
import EditSetting from './userContent/editSetting.jsx';
import DeletePage from './deletePage';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// router use to navigate between pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/password",
    element: <ForgotPassword />,
  },
  {
    path: "/delete",
    element: <DeletePage />
  },
  {
    path: "/user",
    element: <UserPage />,
    children: [
      {
        path: "/user",
        element: <UserHome />,
      },
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
      {
        path: "/user/edit",
        element: <EditProfile />,
      },
      {
        path: "/user/setting",
        element: <EditSetting />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
