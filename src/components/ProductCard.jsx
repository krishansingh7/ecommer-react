import React from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "../utils/productSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ products }) => {
  // console.log(products);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[20vmax] h-fit grid place-items-center cursor-pointer">
        <div className="w-fit h-fit overflow-hidden">
          <img
            src={products.image}
            alt="product-image"
            className="w-[18vmax] h-[18vmax] transition-all hover:scale-110"
          />
        </div>
        <div className="flex justify-between items-start gap-8 p-4">
          <h1>{products.title}</h1>
          <div className="">
            <h1>$-{products.price}</h1>
            <button
              onClick={() =>
                dispatch(
                  addProducts({
                    id: products.id,
                    title: products.title,
                    image: products.image,
                    price: products.price,
                    quantity: 1,
                    description: products.description,
                    rating: products.rating.rate,
                  })
                ) && toast("Add to Cart🚀")
              }
              className="px-2 py-1 bg-slate-700 text-white rounded-md hover:bg-slate-600"
            >
              Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
};

export default ProductCard;
