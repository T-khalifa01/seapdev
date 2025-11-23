

import Image from "next/image";
import NotfoundButtons from "./(common)/commponents/specific/GoBackbtn"; // Import the new component

export default async function NotFound() {
  return (
    <main className="flex flex-col w-full h-screen bg-[#2d2a35] justify-center items-center">
      <div className="relative flex flex-col w-full h-screen bg-[#2d2a35] justify-center items-center">
        <div className="absolute z-0 flex w-full h-4/4 sm:h-4/4 lg:w-4/4 lg:h-4/4">
          <Image 
            src={'/images/404-image.jpg'}
            alt="page not found background image"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center" }}
            // style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
      {/* <div className="absolute z-10 flex flex-col  p-8 text-white text-center">
        {/* <h1 className="text-4xl sm:text-6xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg sm:text-xl mb-8">
          Oops! The page you are looking for does not exist.
        </p> /}
        <NotfoundButtons />
      </div> */}
      <div className="relative -mt-40 sm:-mt-20 md:-mt-30"> {/* Kept relative z-index for clarity */}
        <NotfoundButtons />
      </div>
    </main>
  );
}