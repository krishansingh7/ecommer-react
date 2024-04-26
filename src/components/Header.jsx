import React from "react";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const {products,userInfo} = useSelector(store=>store.products)
  // console.log(userInfo);
  
  return (
    <>
      <header className="flex justify-between items-center px-10 py-4 shadow-xl border-b-black border-2">
       <Link to={"/"}> <h1 className="font-bold text-3xl cursor-pointer">ZenX</h1></Link>
        <nav className="flex items-center gap-8 font-medium text-xl">
          <Link to={"/"} className="cursor-pointer">
            Home
          </Link>
          <h2 className="cursor-pointer">Pages</h2>
          <h2 className="cursor-pointer">Shop</h2>
          <h2 className="cursor-pointer">Elements</h2>
          <h2 className="cursor-pointer">Blog</h2>
          <Link to={"/cart"} className="flex gap-1 items-center">
            <PiShoppingCartBold className="cursor-pointer" /> 
            ({products.length })
          </Link>
          <Link to={"/login"} className="cursor-pointer">
            {
              userInfo ? <img src={userInfo?.image} alt="user-img" className="w-10 rounded-3xl" /> || <h1>{userInfo?.name}</h1> : "Login"
            }
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
