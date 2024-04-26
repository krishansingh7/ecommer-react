import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./components/Cart.";
import Login from "./components/Login";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children : [
        {
          path: "/",
          element: (<><Hero /> <Products /></>),
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ]
    },
    
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
