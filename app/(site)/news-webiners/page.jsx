'use client'
//next react
import Image from "next/image";
// components specific
import { useNewsletterForm } from "../../(common)/commponents/hooks/useNewsletterForm";
// data local
import allData from "../../(common)/lib/data/webdata.json";
import NewsSec from "../../(common)/commponents/specific/NewsSec";
import Button from "../../(common)/commponents/ui/Button";
import ProjectAccordion from "../../(common)/commponents/specific/ProjectAccordion";



const NewsWebiners = () => {
  const { news, icons, FAQs} = allData;
    const news1 = news[0];
    const news2 = news[1];
    const news3 = news[2];
    const news4 = news[3];

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
    <main>
      <section
      className={`
        flex w-full flex-col items-center leading-[normal] bg-bleus-secondary text-white
        py-12 gap-12
        sm:py-16 sm:gap-16
        md:py-16 md:gap-20
        lg:pb-20
        max-w-screen-2xl mx-auto
      `}
      aria-labelledby="news-heading"
    >
      {/* Full-width Image Section */}
      <div
        className={`
          relative w-full overflow-hidden shrink-0
          h-[300px]
          sm:h-[400px]
          md:h-[500px]
          lg:h-[640px]
        `}
      >
        <Image
          src={`/images/seap-team/seap-team-1.jpg`}
          alt="SEAP's team at an event"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }} // If this image is above the fold
        />
      </div>

      {/* Text Content Block (Left: Heading, Right: Description + Button) */}
      <div
        className={`
          flex flex-wrap items-start justify-center
          w-full
          px-4
          sm:px-12
          md:px-16
          lg:px-20
          gap-12
          md:gap-20
          min-[1430px]:flex-nowrap
        `}
      >
        {/* Left Text Column: Main Heading */}
        <div
          className={`
            flex w-full items-start leading-[1.2]
            text-center
            md:text-left
            lg:w-[calc(50%-40px)]
            min-[1430px]:w-[600px]
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-[56px]
          `}
        >
          <h2 id="news-heading" className={`
                self-stretch leading-[1.2] font-semibold
                text-lg
                sm:text-lg
                md:text-xl
                lg:text-3xl
              `}> {/* Semantic: Main heading for the section */}
            Stay Updated on SEAP&apos;s Latest Developments
          </h2>
        </div>

        {/* Right Text Column: Description and Button */}
        <div
          className={`
            flex w-full flex-col items-center gap-8 leading-normal
            md:items-start
            lg:w-[calc(50%-40px)]
            min-[1430px]:w-[600px]
          `}
        >
          {/* Description Paragraph */}
          <p className="self-stretch text-base leading-normal text-center md:text-left sm:text-lg">
            Our News & Media page is your go-to source for the latest updates on SEAP&apos;s initiatives and achievements. Stay informed about our progress in delivering sustainable energy solutions across Nigeria.
          </p>
        </div>
      </div>
    </section>

    <NewsSec/>


    <section className={`font-fira-sans flex w-full flex-col leading-[normal] px-4 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-16`}
          aria-labelledby="subscribe-title">
      <div className={`flex flex-col items-center gap-y-8 w-full lg:flex-row lg:justify-center lg:items-start lg:gap-x-16 lg:gap-y-0`}>
        <div className={` font-font-poppins w-full text-center leading-[1.2] text-4xl md:text-5xl lg:w-[600px] lg:text-left`}>
          <h2 id="subscribe-title">Stay Updated on SEAP</h2>
        </div>

        <div className={` font-fira-sans flex w-full flex-col items-center gap-8 lg:w-[600px] lg:items-start `}>
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
            <Button  label={buttonText} disabled={feedback === 'submitting'} styles={buttonClass} btntype={'submit'} type={'solid'} ariaLabel={'submit subsciption form'} />
          </form>
        </div>
      </div>
    </section>
  
        <section
      className={`
        flex w-full flex-col leading-[normal]
        px-4 py-12 gap-6
        sm:px-8 sm:py-16 sm:gap-8
        md:px-12 md:py-16 md:gap-10
        lg:px-20 lg:py-16 lg:gap-12
        max-w-screen-2xl mx-auto
      `}
      aria-labelledby="faqs-heading"
    >
      {/* Main Section Heading */}
      <h2
        id="faqs-heading"
        className={`
          font-comfortaa leading-[1.2]
          w-full
          text-center
          md:text-left
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:w-3xl
          lg:mx-auto
        `}
      >
        FAQs
      </h2>

      {/* Description Paragraph */}
      <div
        className={`
          flex w-full justify-center
          pr-0 pt-0
          text-center
          md:text-left
          lg:w-full lg:max-w-3xl
           lg:pt-2
          lg:mx-auto
        `}
      >
        <p className="text-base leading-normal sm:text-lg">
          Find quick answers to your questions about our projects, partnerships, community impact, and how SEAP is driving sustainable energy access across Nigeria.
        </p>
      </div>

      <div className=" lg:max-w-3xl w-full
          lg:mx-auto  pt-4 md:pt-0">
        {/* Mobile/Tablet Accordion (below lg)xl:block flex flex-col*/}
        <div className="  ">
          {FAQs.map((faq) => (
            <ProjectAccordion key={faq.id} Milestone={faq.question} tdate={faq.answer} />
          ))}
        </div>
        <div
            className={`
              relative flex w-full flex-col items-start justify-end gap-2 md:gap-6 leading-[normal]
               py-6

            `}
            aria-labelledby="contact-us-section"
          >
              {/* Main Heading */}
              <h1
                id="contact-us-heading"
                className={`
                  z-2 md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2]
                `}
              >
                Still have questions?
              </h1>

              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6]
                `}
              >
                Reach out to us anytime for further assistance.
              </p>
              <div className={` flex`}>
        <Button
          href={'/investment-form'}
          label={"Our teams are eager to hear from you" }
          type={'solid'}
          ariaLabel={'invest-in-clean-cooking-solution'}
        />
      </div>
            </div>
      </div>


    </section>

    </main>
  );
}

export default NewsWebiners;