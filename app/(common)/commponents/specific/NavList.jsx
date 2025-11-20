import Link from "next/link";



const NavList = ({ iconSrc, title, desc, href, onClick, big }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group block text-blackish-primary no-underline transition-colors duration-200 hover:text-green-accent focus:outline-none focus:ring-2 focus:ring-green-accent rounded-lg"
    >
      <div className="flex items-start gap-3 py-2 px-3 text-green-accent">
        {/* Icon slot: Render the provided IconComponent if it exists, otherwise a placeholder className="h-6 w-6 text-current"*/}
        {iconSrc ? (
          <svg width="24" height="24" viewBox={big ? "0 0 48 48" : "0 0 24 24"} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path  d={iconSrc} />
          </svg>
        ) : (
          // Optional: A simple div placeholder or a generic icon if no specific icon is provided
          <div className="h-6 w-6 bg-gray-200 rounded-full flex-shrink-0"></div>
        )}
        <div className="flex flex-col flex-grow leading-normal">
          <h4 className=" font-semibold text-lg leading-normal group-hover:text-green-accent transition-colors duration-200">
            {title}
          </h4>
          <p className=" text-sm leading-normal text-bleus-secondary">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NavList;