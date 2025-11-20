'use client'
import Image from "next/image";
import Link from "next/link";
//hooks
import { useNewsletterForm } from "../hooks/useNewsletterForm";




const Footer = () => {
    //subscription logic
    const {
      email,
      errors,
      feedback,
      handleChange,
      handleSubmit,
    } = useNewsletterForm('newsletter'); // Pass a unique type for this instance
  
    const buttonText = feedback === 'submitting'
      ? 'Submitting...'
      : feedback === 'success'
      ? 'Submitted'
      : 'Subscribe';
  
    const inputBorderClass = feedback === 'success'
      ? 'focus:border-green-500 border-green-500'
      : feedback === 'error'
      ? 'focus:border-red-500 border-red-500'
      : 'focus:border-green-500 border-gray-300';
  
    const buttonClass = feedback === 'success'
      ? 'bg-green-500 border-green-700 hover:bg-green-600'
      : 'bg-[seagreen] border-green-800 hover:bg-green-700 hover:border-green-900';
      //end of subs logic

  return (
    <footer
  className="flex w-full flex-col gap-2 bg-grayish-primary px-12 pb-10 pt-2 leading-[normal] md:gap-8 md:p-8 lg:gap-8 lg:p-12 lg:font-fira-sans"
  aria-label="Site Footer"
>
  <div className="flex flex-col md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-8 md:gap-y-8 lg:flex-nowrap lg:gap-x-12 lg:gap-y-8">
    <div className="flex w-full flex-col gap-2 pb-6 pt-2 md:flex-row md:flex-wrap md:justify-between md:gap-x-4 md:gap-y-8 md:text-sm lg:flex-nowrap lg:gap-x-8 lg:gap-y-[18px]">
      <div className="hidden md:block md:order-first md:w-auto lg:w-auto">
        <Image
          type="svg"
          src="/images/Normal-SEAP-logo.svg"
          alt="SEAP logo"
          width="84"
          height="36"
          priority={true}
        />
      </div>

      <div className="flex w-full flex-col gap-2 pt-4 md:w-auto md:gap-4 md:pt-0 lg:w-40 lg:pt-0">
        <h4 className="font-semibold leading-[1.6]">About SEAP</h4>
        <div className="text-sm leading-[1.6] md:pt-2 md:[max-width:158px]">
          <Link href={'/who-we-are'}>Who are we</Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={'/projects'}>Projects</Link>
        </div>
        <div className="hidden text-sm leading-[1.6] md:block">
          <Link href={'/'}>Contact Us</Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={'/news-webiners'}>FAQs</Link>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 pt-4 md:w-40 md:gap-4 md:pt-0 lg:w-40 lg:pt-0">
        <h4 className="font-semibold leading-[1.6]">Key Sectors</h4>
        <div className="text-sm leading-[1.6] md:pt-2 md:[max-width:158px]">
          <Link href={'invest-Opportunities/e-Mobility'}>E-Mobility</Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={``}>Clean Cooking</Link>
        </div>
        <div className="flex items-start text-sm leading-[1.6]">
          <Link href={'invest-Opportunities/agric-agriBusiness'}>
            Agriculture & Agribusiness
          </Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={'invest-Opportunities/utility-scale'}>
            Utility-Scale Solar
          </Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={'invest-Opportunities/mining'}>Mining</Link>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 pt-4 md:w-40 md:gap-4 md:pt-0 lg:w-40 lg:pt-0">
        <h4 className="font-semibold leading-[1.6]">Investor Tools</h4>
        <div className="text-sm leading-[1.6] md:pt-2 md:[max-width:158px]">
          <Link href={``}>Register Interest</Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={'/news-webiners'}>News & Webinars</Link>
        </div>
        <div className="text-sm leading-[1.6]">
          <Link href={`/`}>Download Briefs</Link>
        </div>
      </div>
    </div>

    {/* NEW SECTION */}
    <div className="flex w-full flex-col gap-2 md:w-full lg:w-[450px] xl:w-[600px]">
      <div className="font-semibold leading-[1.6] md:self-stretch">
        <h4 id="newsletter-title">Subscribe to our Newsletter</h4>
      </div>

      <div className="pt-1 md:pt-2 md:self-stretch md:[max-width:401px]">
        <p className="flex items-center text-sm leading-[1.6]">
          Join our newsletter to stay informed on the latest updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col  gap-2 pt-2 md:flex-row md:items-start md:gap-4 md:pt-4"
        aria-labelledby="newsletter-title"
      >
        <div className="relative flex-1 ">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={handleChange}
            aria-label="Enter your email address to subscribe"
            placeholder="Enter your email"
            className={`${inputBorderClass} h-11 w-full rounded-full border border-solid  bg-white px-3 py-2 text-black placeholder-gray-500  transition-colors duration-200 focus:outline-none`} 
            required
          />{/*focus:border-green-500  focus:ring-1 focus:ring-green-500 border-gray-300*/}
          {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-2">{errors.email}</p>}
        </div>
        <button
          type="submit"
          disabled={feedback === 'submitting'}
          className={` ${buttonClass} flex items-center justify-center rounded-[100px]  px-6 pb-2.5 pt-2.5 border-[1.5px] border-solid border-green-accent transition-colors hover:text-whitish-secondary  hover:bg-green-accent  focus:outline-none focus:ring-2 focus:ring-green-accent focus:ring-offset-2`}
        >
          <span className=" text-center font-medium leading-normal text-white">
            {buttonText}
            <span className="sr-only">to our news letter</span>
          </span>
        </button>
      </form>

      <p className="flex items-center pt-2 text-xs leading-[1.6] md:self-stretch">
        By subscribing, you agree to our Privacy Policy and consent to updates.
      </p>
    </div>
    {/* END NEW SECTION */}
  </div>

  <div className="flex flex-col justify-end border-b-2 pt-2 md:pt-2"></div>

  <div className="flex flex-col pt-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-4 md:pt-6 lg:gap-[11px] lg:min-[1270px]:flex-nowrap">
    <div className="order-1 flex items-center justify-center gap-3 md:order-none">
      <Link href="https://facebook.com" aria-label="Visit us on Facebook">
        <Image
          type="svg"
          src="/icons/facebook.svg"
          alt=""
          width="24"
          height="24"
          priority={true}
        />
      </Link>
      <Link href="https://instagram.com" aria-label="Visit us on Instagram">
        <Image
          type="svg"
          src="/icons/instagram.svg"
          alt=""
          width="24"
          height="24"
          priority={true}
        />
      </Link>
      <Link href="https://twitter.com" aria-label="Visit us on X (Twitter)">
        <Image
          type="svg"
          src="/icons/x.svg"
          alt=""
          width="24"
          height="24"
          priority={true}
        />
      </Link>
      <Link href="https://linkedin.com" aria-label="Visit us on LinkedIn">
        <Image
          type="svg"
          src="/icons/linkedIn.svg"
          alt=""
          width="24"
          height="24"
          priority={true}
        />
      </Link>
    </div>

    <div className="order-2 flex flex-col pt-6 md:order-none md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-4 md:gap-y-2 md:pt-0 md:self-stretch md:text-sm md:leading-[1.6] lg:flex-nowrap lg:gap-x-6 lg:gap-y-[11px] lg:min-[1270px]:">
      <p className="pt-2 text-sm leading-[1.6] md:pt-0">
        © 2025 S.E.A.P All rights reserved.
      </p>

      <Link
        href="#"
        className="pt-2 text-sm leading-[1.6] underline md:pt-0"
      >
        Privacy Policy
      </Link>

      <Link
        href="#"
        className="pt-2 text-sm leading-[1.6] underline md:pt-0"
      >
        Terms of Use
      </Link>

      <Link
        href="#"
        className="pt-2 text-sm leading-[1.6] underline md:pt-0"
      >
        Cookies Settings
      </Link>
    </div>
  </div>
</footer>
  );
}

export default Footer;