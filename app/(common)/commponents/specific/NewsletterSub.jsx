'use client'
import Button from "../ui/Button";
import { useNewsletterForm } from "../hooks/useNewsletterForm";



const NewsletterSub = () => {
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
    <section className={` flex w-full flex-col leading-[normal] bg-Lighter-BlueShade px-4 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-16`}
          aria-labelledby="subscribe-title">
      <div className={`flex flex-col items-center gap-y-8 w-full lg:flex-row lg:justify-center lg:items-start lg:gap-x-16 lg:gap-y-0`}>
        <div className={` font-font-poppins w-full text-center leading-[1.2] text-4xl md:text-5xl lg:w-[600px] lg:text-left`}>
          <h2 id="subscribe-title">Stay Updated on SEAP</h2>
        </div>

        <div className={` flex w-full flex-col items-center gap-8 lg:w-[600px] lg:items-start `}>
          <div className={`flex w-full items-start text-base leading-[1.6] text-center md:text-lg lg:text-left`}>
            <p>
              Subscribe to our newsletter to receive the latest updates on SEAP
              projects and investment opportunities. Join us in driving sustainable
              energy solutions across Nigeria.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 sm:flex-row">
            <div className="relative w-full">
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                aria-label="Enter your email address to subscribe"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                className={` ${inputBorderClass} w-full rounded-[100px] border border-gray-300 bg-white px-6 pb-1.5 pt-2.5 text-black placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-2">{errors.email}</p>}
            </div>
            <Button  label={buttonText} disabled={feedback === 'submitting'} styles={buttonClass} btntype={'submit'} type={'solid'} ariaLabel={'submit subsciption form'} seoLabel={'submit to our montly news letter for the latest insights in seaps '} />
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSub;