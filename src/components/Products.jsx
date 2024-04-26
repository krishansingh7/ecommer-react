import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  const dispatch = useDispatch();
  // const productsData1 = useSelector(store=>store?.products?.products)

  const fetchProducts = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const json = await data.json();
      setProductsData(json);
      // dispatch(addProducts(json));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col flex-wrap gap-10 overflow-hidden my-3">
      <div className="text-center border-2 border-b-black">
        <h1 className="text-3xl font-bold">Showing Now</h1>
        <p className="tracking-tighter text-lg font-medium my-2">
          Indulge in the epitome of elegance at our boutique, where each garment
          is a masterpiece of style, inviting you to explore the artistry of
          fashion.
        </p>
        <span className="text-xl">Products List</span>
      </div>
      <div className="flex justify-center flex-wrap gap-10">
        {productsData &&
          productsData.map((products, id) => (
            <ProductCard key={id} products={products} />
          ))}
      </div>
    </div>
  );
};

export default Products;
