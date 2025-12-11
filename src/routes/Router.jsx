import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import PetSupplies from "../pages/PetSupplies";
import Profile from "../pages/Profile"; 
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/supplies", 
        element: <PetSupplies />, 
        
      },

      // Protected Pages
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },

      // Dynamic Route
      { path: "/listing/:id", element: <ListingDetails /> },
    ],
  },

  // Public auth routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
