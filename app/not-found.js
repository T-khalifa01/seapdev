// // app/not-found.js

// import Image from "next/image";
// import Link from "next/link";
// import { headers } from "next/headers";

// export default function NotFound() {
//   const headersList = headers();
//   const referer = headersList.get('referer');
  
//   return (
//     <main className="relative flex w-full h-screen bg-[#2d2a35] justify-center items-center">
//       <div className="absolute z-0 flex w-full h-2/4 sm:h-3/4 lg:w-3/4">
//         <Image 
//           src={'/images/404-image.jpg'}
//           alt="page not found background image"
//           fill
//           style={{ objectFit: "cover", objectPosition: "center" }} 
//         />
//       </div>
//       <div className="relative z-10 flex flex-col items-center p-8 text-white text-center">
//         <h1 className="text-4xl sm:text-6xl font-bold mb-4">404 - Not Found</h1>
//         <p className="text-lg sm:text-xl mb-8">
//           Oops! The page you are looking for does not exist.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link href="/">
//             <p className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300">
//               Return to Home
//             </p>
//           </Link>
//           {referer && (
//             <button
//               onClick={() => window.history.back()}
//               className="px-6 py-3 bg-gray-500 rounded-full hover:bg-gray-600 transition-colors duration-300"
//             >
//               Go Back
//             </button>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

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