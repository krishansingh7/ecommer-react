import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {
  clearCart,
  decQuantity,
  incQuantity,
  removeProduct,
} from "../utils/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store?.products?.products);
  const userInfo = useSelector((store) => store?.products?.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [pay, setPay] = useState(false)

  useEffect(() => {
    let totalPrice = 0;
    productsData.map((item) => {
      totalPrice += item.quantity * item.price;
      return totalPrice;
    });
    setTotalAmt(totalPrice.toFixed(2));
  }, [productsData]);

  const handleCheckout = () => {
    if(userInfo){
      setPay(true)
    }else{
      alert("Please Login First")
    }
  }

const payment = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {productsData.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>

            {productsData.map((products, index) => (
              <div
                key={index}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              >
                <div className="flex flex-col w-2/5">
                  <div className="w-28">
                    <img className="h-28 w-28" src={products.image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between gap-2 flex-grow">
                    <span className="font-bold flex flex-wrap text-sm">
                      {products.title}
                    </span>
                    <span className="text-violet-500 text-xs">
                      Rating - {products.rating}
                    </span>
                    <p
                      onClick={() => dispatch(removeProduct(index))}
                      className="font-semibold cursor-pointer hover:text-red-700 text-gray-500 text-xs"
                    >
                      Remove
                    </p>
                  </div>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${products.price}
                </span>
                <div className="flex justify-center w-1/5 gap-3 items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        decQuantity({
                          id: products.id,
                          title: products.title,
                          image: products.image,
                          price: products.price,
                          quantity: 1,
                          description: products.description,
                          rating: products.rating.rate,
                        })
                      )
                    }
                    className="bg-red-300 px-4 py-1 rounded-md"
                  >
                    -
                  </button>

                  <h1>{products.quantity}</h1>

                  <button
                    onClick={() =>
                      dispatch(
                        incQuantity({
                          id: products.id,
                          title: products.title,
                          image: products.image,
                          price: products.price,
                          quantity: 1,
                          description: products.description,
                          rating: products.rating.rate,
                        })
                      )
                    }
                    className="bg-green-300 px-4 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${products.quantity * products.price.toFixed(2)}
                </span>
              </div>
            ))}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-2"></div>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
            >
              Clear Cart
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-2 text-sm uppercase">
                <span>Total cost</span>
                <span>{totalAmt}</span>
              </div>
              <button onClick={handleCheckout} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
              {pay && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51OryOoSHlGbXOQvZLEgSJuxlS08driTSJR4GKxeAf9lZWvmpKOqlJ70AWXnDtakXsd4RDVa6Y3FA6DaGBJtK3s6Q00uOvuGNh0"
                  name="ZenX Online Shopping"
                  amount={totalAmt * 100}
                  label="Pay to bazar"
                  description={`Your Payment amount is $${totalAmt}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>


      {/* Another Cart Style Component */}

      {/* <div className=" w-full h-full">
          <div className="">
            <div className="pointer-events-none flex justify-center items-center max-w-full pl-10">
              <div>
                <div className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {productsData.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.image}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        className="font-medium text-indigo-600 hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                     <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{productsData.reduce((acc,curr)=>acc+=curr.price,0)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <Link
                          to={"/"}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
};

export default Cart;
