

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
