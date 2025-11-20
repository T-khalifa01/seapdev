// import Link from "next/link";


//   const SOLID = 'solid';
//   const OUTLINED = 'outlined';

// const Button = ({ href, onClick, label, styles, type, btntype, ariaLabel, children, ...props }) => {

//   const baseClasses = `
//     font-poppins inline-flex items-center justify-center text-nowrap
//     rounded-full border border-solid transition-colors
//     focus:outline-none
//     px-4 py-2 gap-2 border-[1.5px] text-sm font-medium
//   `;
//   let typeClasses = '';

//   switch (type) {
//     case SOLID:
//       typeClasses = `
//         border-green-800 bg-green-accent
//         text-whitish-secondary hover:bg-bleus-secondary
//         focus:border-bleus-secondary
//       `;
//       break;
//     case OUTLINED:
//     default:
//       typeClasses = `
//         border-green-accent
//         hover:bg-green-accent hover:text-whitish-secondary
//         focus:bg-green-accent
//       `;
//       break;
//   }
//   const combinedClasses = `${baseClasses} ${typeClasses} ${styles}`;

//   if (href) {
//     return (
//       <Link href={href} className={combinedClasses} {...props}>
//         {label}
//         {children}
//       </Link>
//     );
//   }

//   // Otherwise, render a standard HTML button
//   return (
//     <button onClick={onClick} type={btntype} className={combinedClasses} {...props} aria-label={ariaLabel}>
//       {label}
//       {children}
//     </button>
//   );
// }

// export default Button;

// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Button = ({ href, onClick, label, styles = "", type, btntype, ariaLabel, children, ...props }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   // When navigation finishes, stop pulsing
//   useEffect(() => {
//     const stopLoading = () => setIsLoading(false);

//     router.events?.on("routeChangeComplete", stopLoading);
//     router.events?.on("routeChangeError", stopLoading);

//     return () => {
//       router.events?.off("routeChangeComplete", stopLoading);
//       router.events?.off("routeChangeError", stopLoading);
//     };
//   }, [router]);

//   const baseClasses = `
//     font-poppins inline-flex items-center justify-center text-nowrap
//     rounded-full border border-solid transition-colors
//     focus:outline-none
//     px-4 py-2 gap-2 border-[1.5px] text-sm font-medium
//   `;

//   const typeClasses =
//     type === "solid"
//       ? `border-green-800 bg-green-accent text-whitish-secondary hover:bg-bleus-secondary focus:border-bleus-secondary`
//       : `border-green-accent hover:bg-green-accent hover:text-whitish-secondary focus:bg-green-accent`;

//   const combinedClasses = `
//     ${baseClasses} ${typeClasses} ${styles}
//     ${isLoading ? "animate-pulse-loop" : ""}
//   `;

//   const handleClick = (e) => {
//     setIsLoading(true);
//     if (onClick) onClick(e);
//   };

//   if (href) {
//     return (
//       <Link href={href} className={combinedClasses} onClick={handleClick} {...props}>
//         {label}
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button
//       onClick={handleClick}
//       type={btntype}
//       className={combinedClasses}
//       aria-label={ariaLabel}
//       {...props}
//     >
//       {label}
//       {children}
//     </button>
//   );
// };

// export default Button;


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const Button = ({ href, onClick, label, styles = "", type, btntype, ariaLabel, children, ...props }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const baseClasses = `
//     font-poppins inline-flex items-center justify-center text-nowrap
//     rounded-full border border-solid transition-colors
//     focus:outline-none
//     px-4 py-2 gap-2 border-[1.5px] text-sm font-medium
//   `;

//   const typeClasses =
//     type === "solid"
//       ? `border-green-800 bg-green-accent text-whitish-secondary hover:bg-bleus-secondary focus:border-bleus-secondary`
//       : `border-green-accent text-green-accent
//     hover:border-green-700 hover:text-green-700
//     focus:border-green-700
//     bg-transparent`;

//   // const combinedClasses = `
//   //   ${baseClasses} ${typeClasses} ${styles}
//   //   ${isLoading ? "animate-pulse-loop" : ""}
//   // `;
// //   const combinedClasses = `
// //   ${baseClasses} ${typeClasses} ${styles}
// //   ${isLoading ? "animate-color-pulse" : ""}
// // `;
// const combinedClasses = `
//   ${baseClasses} ${typeClasses} ${styles}
//   ${isLoading ? "animate-ripple" : ""}
// `;

//   const handleClick = (e) => {
//     if (href) {
//       e.preventDefault();
//       setIsLoading(true);

//       // Stop animation after 5s regardless of load
//       setTimeout(() => setIsLoading(false), 5000);

//       router.push(href);
//     }

//     if (onClick) onClick(e);
//   };

//   if (href) {
//     return (
//       <button onClick={handleClick} className={combinedClasses} {...props}>
//         {label}
//         {children}
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={handleClick}
//       type={btntype}
//       className={combinedClasses}
//       aria-label={ariaLabel}
//       {...props}
//     >
//       {label}
//       {children}
//     </button>
//   );
// };

// export default Button;


"use client";

import Link from "next/link";
import { useState } from "react";

const SOLID = "solid";
const OUTLINED = "outlined";

const Button = ({
  href,
  onClick,
  label,
  styles = "",
  seoLabel,
  type,
  btntype,
  ariaLabel,
  children,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = `
    font-poppins inline-flex items-center justify-center text-nowrap
    rounded-full border border-solid transition-colors
    focus:outline-none
    px-4 py-2 gap-2 border-[1.5px] text-sm font-medium
  `;

  let typeClasses = "";
  switch (type) {
    case SOLID:
      typeClasses = `
        border-green-800 bg-green-accent
        text-whitish-secondary hover:bg-bleus-secondary
        focus:border-bleus-secondary
      `;
      break;
    case OUTLINED:
    default:
      typeClasses = `
        border-green-accent text-green-accent
        hover:border-green-700 hover:text-green-700
        focus:border-green-700
        bg-transparent
      `;
      break;
  }

  const combinedClasses = `
    ${baseClasses} ${typeClasses} ${styles}
    ${isClicked ? "animate-ripple" : ""}
  `;

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3500); // reset animation

    if (onClick) onClick(e);
  };

  // If href is passed → render Next.js <Link>
  if (href) {
    return (
      <Link
        href={href}
        prefetch
        aria-label={ariaLabel}
        className={combinedClasses}
        onClick={handleClick}
        {...props}
      >
        {label}
        {seoLabel && <span className="sr-only">{seoLabel}</span>}
        {children}
      </Link>
    );
  }

  // Otherwise → render normal <button>
  return (
    <button
      onClick={handleClick}
      type={btntype}
      className={combinedClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
