import React,{ useState } from 'react'
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

const products = [
  "https://m.media-amazon.com/images/I/61TrO1I-xUL._SX1500_.jpg",
  "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg",
];

const Hero = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleForward = () => {
    setCurrentSlide(currentSlide===5 ? 0 : (prev)=>prev+1)
  }

  const handleBackward = () => {
    setCurrentSlide(currentSlide===0 ? 5 : (prev)=>prev-1)
  }

  return (
    <div className="flex overflow-x-hidden">
      <div className="relative">
        <div style={{transform: `translateX(-${currentSlide*100}vw)`}} className='flex'>
          {
            products.map((product,index) =>(<img
            src={product}
            key={index}
            alt="images"
            className="w-full h-full object-cover object-center relative"
          />))
          }
        </div>
      </div>
      <div className="absolute w-[12vmax] flex justify-between items-center left-[43%] bottom-32">
        <button className='px-4 py-2 rounded-md bg-slate-400' onClick={handleBackward} ><IoMdArrowRoundBack /></button>
        <button className='px-4 py-2 rounded-md bg-slate-400' onClick={handleForward}><IoMdArrowRoundForward /></button>
      </div>
    </div>
  );
}

export default Hero