import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Favorites from './pages/Favorite.jsx';
import Info from './pages/Info.jsx';
import Register from './pages/Registrasi.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import Profile from './pages/Profil.jsx';

const router = createBrowserRouter([
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element :(
    <ProtectedRoute>
    <App/>
    </ProtectedRoute>
    ),
    children:[
      
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/about",
        element: <About/>
      },
      {
       path:"/info/:id",
       element:<Info />
    },
      {
        path:"/favorites",
        element: <Favorites/>

      },
      {
        path:"/profil",
        element:<Profile/>
      }



    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

