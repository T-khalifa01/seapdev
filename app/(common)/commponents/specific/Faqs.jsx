'use client'
// next react
import { useState } from "react";
// data local not needed here



const Faqs = ({ Questions, answers, icons}) => {

  const [isOpen, setIsOpen] = useState(false);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <details className={`cursor-pointer w-full group`} open={isOpen}>
      <summary
        className={`
          flex items-center justify-between 
          gap-x-4 gap-y-3
          border-t border-solid border-x-black/10 border-y-black/10 
          py-4
          min-[1270px]:flex-nowrap

          w-full

          list-none
          [&::-webkit-details-marker]:hidden
          
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
        onClick={toggleOpen} // Toggle our state when summary is clicked
      >
        {/* Question */}
        <h3
          className={`
            w-full max-w-full font-font-poppins
            text-base leading-normal
            sm:text-lg
            lg:max-w-[1224px]
            text-left
          `}
        >
          {Questions}
        </h3>

        {/* Conditional Icon Rendering */}
        <span className="shrink-0 h-6 w-6 ">
          {isOpen ? (
            <svg className="h-6 w-6 "  stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path   d={icons.chevron.up}></path>
            </svg>
          ) : (
            <svg className="h-6 w-6" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path  d={icons.chevron.down}></path>
            </svg>
          )}
        </span>
      </summary>

      {/* Answer content - displayed when <details> is open */}
      <div
        className={`
          flex w-full items-start pb-4 pt-2 font-font-fira-sans
          text-sm leading-normal
          sm:text-base
          text-left
        `}
      >
        <p>{answers}</p>
      </div>
    </details>
  );
}

export default Faqs;