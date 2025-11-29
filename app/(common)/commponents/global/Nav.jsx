'use client'
//react and next
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// data local
// import allData from "../../lib/data/webdata.json";
//components specific
import NavList from '../specific/NavList';
import Button from '../ui/Button';



const Nav = ({navitems1, navitems, icons}) => {

  // const {navitems1, navitems, icons} = allData  //nalist data

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For "Investors" dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For full mobile menu

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null); // Ref for the "Investors" link that triggers the dropdown
  const mobileMenuButtonRef = useRef(null); // Ref for the hamburger/close button
  const mobileDropdownRef = useRef(null);

  // Logic to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target) &&
        (!mobileDropdownRef.current || !mobileDropdownRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logic to manage body scroll and close mobile menu on resize
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) { // MD breakpoint is 768px by default
        setIsMobileMenuOpen(false); // Close mobile menu if screen resizes to MD or larger
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);


  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsDropdownOpen(false); // Close dropdown if mobile menu is toggled
  };

  // Function to close both menus when a link is clicked
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);// used to be false
    setIsDropdownOpen(false);// used to be false
  };
  return (
    <header className="fixed z-20 w-full bg-whitish-secondary border-b border-solid border-gray-300">
      <nav className={`w-full leading-[normal]`}>
        {/* Desktop (MD & LG) Navigation */}
        <div className={`hidden md:flex
                        items-center justify-between
                        px-8 py-4
                        lg:px-16 lg:py-4`}>

          {/* Logo and Main Links (MD & LG) */}
          <div className="flex items-center gap-x-8 lg:gap-x-12"> 
            <Link href="/" className="shrink-0 "  >
              <Image src="/images/Normal-SEAP-logo.svg" alt="SEAP logo" width="84" height="24" priority={true} />
            </Link>
            <ul className="flex items-center gap-x-6 text-blackish-primary font-poppins text-sm lg:text-base"> {/* Smaller font for MD */}
              <li><Link className="transition-colors duration-200 hover:text-green-accent" href={`/`} onClick={handleNavLinkClick}>Home</Link></li>
              <li><Link className="transition-colors duration-200 hover:text-green-accent " href={`/who-we-are`} onClick={handleNavLinkClick}>Who we are</Link></li>
              <li><Link className="transition-colors duration-200 hover:text-green-accent" href={`/projects`} onClick={handleNavLinkClick}>Projects</Link></li>
              <li><Link className="transition-colors duration-200 hover:text-green-accent" href={`/lga`} onClick={handleNavLinkClick}>LGA</Link></li>
              <li className="relative">
                <button
                  ref={triggerRef}
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-green-accent focus:outline-none focus:text-green-accent"
                  aria-expanded={isDropdownOpen}
                  aria-controls="investors-dropdown"
                >
                  Investors
                  {isDropdownOpen ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 "*/}
                      <path d={icons.chevron.up} className=""/>
                    </svg>
                  ) : (
                    // <ChevronDownIcon className="w-4 h-4" />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center " >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 "*/}
                      <path d={icons.chevron.down} className=""/>
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Placeholder for Desktop Button (MD & LG) */}
          <div className="shrink-0">
            <Button href="/contact-us" type='solid' label={'Contact Us'} seoLabel={`to discuss your envolvement in Nigeria's sustainable future `} ariaLabel={`nav contact us button`} />
          </div>
        </div>

        {/* Mobile (SM) Navigation */}
        <div className={`flex md:hidden justify-between content-center px-5 py-3`}>
    {/* Menu Icon (Left) */}
    <button
        ref={mobileMenuButtonRef}
        onClick={toggleMobileMenu}
        className="shrink-0 flex items-center justify-center rounded-md"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
    >
        {isMobileMenuOpen ? (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={icons.cancel} />
            </svg>
        ) : (
            <svg
                width="42"
                height="24"
                viewBox="0 0 42 28"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={icons.menu} />
            </svg>
        )}
    </button>

    {/* Logo (Middle) */}
    <Link href="/" className="shrink-0">
        <Image src="/images/Normal-SEAP-logo.svg" alt="SEAP-logo" width="84" height="24" priority={true} />
    </Link>

    {/* Placeholder for spacing */}
    <div className="shrink-0 w-10 md:hidden"></div>
  </div>
      </nav>

      {/* Dropdown Menu for Investors (Desktop MD & LG) */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          id="investors-dropdown"
          className="hidden md:flex
                    fixed top-16 left-0 z-20 bg-whitish-secondary shadow-md
                    lg:flex-row justify-center items-start gap-8 md:gap-12 lg:gap-16
                    py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-12 w-full border-t border-b border-solid border-gray-300"
        >
          <div key={'navsec1'} className="flex flex-col items-start gap-4 w-full md:w-1/2 lg:max-w-[500px]  mx-auto">{/*lg:max-w-none*/}
            <h3 className="font-bold font-headingFont text-xl md:text-2xl text-blackish-primary mb-2">{`Explore Our Sectors`}</h3> {/* Semantic h3 */}
            <div className="flex flex-col gap-2 w-full">
              {navitems.map((item, index) => (
                <NavList key={`nav-${index}`} title={item.title} desc={item.desc} href={item.href} iconSrc={item.icon} big={item.big} onClick={handleNavLinkClick} />
              ))}
            </div>
          </div>
          <div key={'navsec2'} className="flex flex-col items-start gap-4 w-full md:w-1/2 lg:max-w-[500px]  mx-auto">{/*lg:max-w-none*/}
            <h3 className="font-bold font-headingFont text-xl md:text-2xl text-blackish-primary mb-2">{`Investment Opportunities`}</h3> {/* Changed heading for clarity */}
            <div className="flex flex-col gap-2 w-full">
              {navitems1.map((item, index) => (
                <NavList key={`nav1-${index}`} title={item.title} desc={item.desc} href={item.href} iconSrc={item.icon} big={item.big} onClick={handleNavLinkClick} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Full-Screen Menu (SM) */}
      {isMobileMenuOpen && (
        <div className="fixed top-12 inset-0 bg-whitish-secondary z-10 flex flex-col pt-4 px-5  overflow-y-auto md:hidden">
          <ul className="font-poppins flex flex-col gap-4 font-headingFont text-blackish-primary text-lg mt-4 border-b border-b-gray-500">
            <li><Link href={`/`} className="block  hover:text-green-accent border-b border-b-gray-500" onClick={handleNavLinkClick}>Home</Link></li>
            <li><Link href={`/who-we-are`} className="block py- hover:text-green-accent border-b border-b-gray-500" onClick={handleNavLinkClick}>Who we are</Link></li>
            <li><Link href={`/projects`} className="block py- hover:text-green-accent border-b border-b-gray-500" onClick={handleNavLinkClick}>Projects</Link></li>
            <li><Link href={`/lga`} className="block py- hover:text-green-accent border-b border-b-gray-500" onClick={handleNavLinkClick}>LGA</Link></li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 hover:text-green-accent focus:outline-none focus:text-green-accent"
                aria-expanded={isDropdownOpen}
                aria-controls="mobile-investors-dropdown"
              >
                Investors
                {isDropdownOpen ? (
                  // <ChevronUpIcon className="w-5 h-5" />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 "*/}
                    <path d={icons.chevron.up} className=""/>
                  </svg>
                ) : (
                  // <ChevronDownIcon className="w-5 h-5" />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 "*/}
                    <path d={icons.chevron.down} className=""/>
                  </svg>
                )}
              </button>
              {isDropdownOpen && (
                <div id="mobile-investors-dropdown" ref={mobileDropdownRef} className="flex flex-col gap-4 py-4 px-2 border-t border-b border-gray-200 mt-2">
                  {/* Reuse the structure for dropdown content */}
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h4 className="font-bold font-poppins text-lg text-blackish-primary mb-2">{`Explore Our Sectors`}</h4> {/* Semantic h4 */}
                    <div className="flex flex-col gap-2 w-full">
                      {navitems.map((item, index) => (
                        <NavList key={`mob-nav-${index}`} title={item.title} desc={item.desc} href={`${item.href}`} icon={item.icon} onClick={handleNavLinkClick}  />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h4 className="font-bold font-poppins text-lg text-blackish-primary mb-2">{`Investment Opportunities`}</h4>
                    <div className="flex flex-col gap-2 w-full">
                      {navitems1.map((item, index) => (
                        <NavList key={`mob-nav1-${index}`} title={item.title} desc={item.desc} href={`${item.href}`} icon={item.icon} onClick={handleNavLinkClick}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
          <div className="mt-8">
            <Button href="/contact-us" type='solid' label={'Contact Us'} styles='w-full' seoLabel={`to discuss your envolvement in Nigeria's sustainable future `} ariaLabel={`nav contact us button`} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;