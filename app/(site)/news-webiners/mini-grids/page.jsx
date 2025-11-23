'use client'
import Image from "next/image";

import allData from "../../../(common)/lib/data/webdata.json";
import Link from "next/link";
import NewsletterSub from "../../../(common)/commponents/specific/NewsletterSub";

const page = () => {
  const {icons} = allData
    const iconlink = icons.link;
    const iconArray = Object.values(iconlink);
  return (
    <main id={2} className="w-full font-sans leading-relaxed">
      {/* HEADER */}
      <header className="flex w-full flex-col gap-4  px-12 pt-16
                         md:px-16 md:py-16 
                         lg:px-20 lg:py-28">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center pt-6 gap-2 md:flex-nowrap">
          <Link href={`/news-webiners`} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="flex justify-center items-center self-center justify-self-center w-6 h-6 "  >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 "*/}
              <path d={icons.arrowBack} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth={2} className=""/>
            </svg>
            <span className="font-fira-sans font-medium pb-2"> All Posts</span> {/* add arrowleft svg*/}
          </Link>
        </div>

        {/* Category and Read Time */}

        <div className="font-fira-sans flex flex-wrap items-center gap-x-4 text-sm font-semibold md:flex-nowrap">
          <div className="flex items-center justify-center rounded-full  px-3 py-1">
            <span className="text-center">Updates</span>
          </div>
          <div>
            <time dateTime="PT5M"> {`${4} min read`}</time>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-font-poppins text-3xl leading-tight mt-4 
                       md:text-4xl md:mt-8 
                       lg:text-5xl lg:leading-[1.2]">
          Nigeria Joins Forces with WeLight to Power Rural Communities with $200M Mini-Grids
        </h1>

        {/* Featured Image */}
        <figure className="relative w-full h-[300px] mx-auto py-8 
                           md:h-[400px] md:pt-16 
                           lg:h-[600px]">
          <Image
            src="/images/news/minigrid.jpg"
            alt="Overhead view of a power generation facility at sunset."
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-xl md:rounded-2xl" // Rounded corners adjust slightly
            
          />
        </figure>

        {/* Author + Date + Share */}
        <div className="flex flex-wrap items-start justify-between gap-y-8 pt-4 md:flex-nowrap">
          <div className="font-fira-sans flex flex-col gap-4 text-gray-700 
                          sm:flex-row sm:gap-12"> {/* Sm: for small screens, stack to row */}
            <div className="flex flex-col items-start gap-2">
              <div>Written by</div>
              <div className="font-medium font-font-poppins">SEAP Blog Analyst</div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-center">Published on</div>
              <time dateTime="2025-04-08" className="font-medium">{ `-- Month 2-`}</time>
            </div>
          </div>

          <nav aria-label="Share this post" className="flex items-center gap-2">
             <a href="#" className="h-8 w-8 " aria-label="Copy Link">
              <svg width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">

                          <path d={"M1.95805 17.7689C2.42192 18.2335 2.97301 18.6018 3.57966 18.8527C4.18631 19.1036 4.83656 19.2321 5.49305 19.2309C6.14967 19.2321 6.80006 19.1035 7.40687 18.8526C8.01368 18.6017 8.56495 18.2335 9.02905 17.7689L11.857 14.9399L10.443 13.5259L7.61505 16.3549C7.05152 16.9159 6.28872 17.2309 5.49355 17.2309C4.69837 17.2309 3.93558 16.9159 3.37205 16.3549C2.81055 15.7917 2.49525 15.0288 2.49525 14.2334C2.49525 13.4381 2.81055 12.6752 3.37205 12.1119L6.20105 9.28393L4.78705 7.86993L1.95805 10.6979C1.02185 11.6364 0.496094 12.9078 0.496094 14.2334C0.496094 15.559 1.02185 16.8305 1.95805 17.7689ZM17.514 9.28393C18.4498 8.34521 18.9752 7.07385 18.9752 5.74843C18.9752 4.42301 18.4498 3.15164 17.514 2.21293C16.5756 1.27674 15.3041 0.750977 13.9785 0.750977C12.653 0.750977 11.3815 1.27674 10.443 2.21293L7.61505 5.04193L9.02905 6.45593L11.857 3.62693C12.4206 3.06592 13.1834 2.75096 13.9785 2.75096C14.7737 2.75096 15.5365 3.06592 16.1 3.62693C16.6615 4.1902 16.9768 4.9531 16.9768 5.74843C16.9768 6.54376 16.6615 7.30666 16.1 7.86993L13.271 10.6979L14.685 12.1119L17.514 9.28393Z"}  />
                          <path d={"M6.20003 14.941L4.78503 13.527L13.272 5.04102L14.686 6.45602L6.20003 14.941Z"}  />
              </svg>
            </a>
            <a href="#" className="h-8 w-8  " aria-label="LinkedIn">

              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.23438 0.233887C1.40595 0.233887 0.734375 0.905457 0.734375 1.73389V16.7339C0.734375 17.5623 1.40595 18.2339 2.23438 18.2339H17.2344C18.0628 18.2339 18.7344 17.5623 18.7344 16.7339V1.73389C18.7344 0.905457 18.0628 0.233887 17.2344 0.233887H2.23438ZM6.25513 4.23661C6.26076 5.19286 5.54498 5.78208 4.6956 5.77786C3.89544 5.77364 3.19795 5.13661 3.20217 4.23802C3.20639 3.39286 3.87435 2.71364 4.74201 2.73333C5.62232 2.75302 6.26076 3.39849 6.25513 4.23661ZM10.0141 6.99565H7.49409H7.49267V15.5555H10.1561V15.3558C10.1561 14.9759 10.1558 14.5959 10.1555 14.2158C10.1547 13.202 10.1538 12.1871 10.159 11.1736C10.1604 10.9275 10.1716 10.6716 10.2349 10.4367C10.4725 9.55919 11.2615 8.99249 12.1418 9.13179C12.7071 9.22029 13.0811 9.54799 13.2386 10.081C13.3357 10.4142 13.3793 10.7728 13.3835 11.1202C13.3949 12.1678 13.3933 13.2154 13.3917 14.2631C13.3911 14.6329 13.3905 15.0029 13.3905 15.3727V15.5541H16.0624V15.3488C16.0624 14.8968 16.0622 14.4449 16.0619 13.993C16.0614 12.8635 16.0608 11.734 16.0638 10.6041C16.0652 10.0936 16.0104 9.59019 15.8852 9.09659C15.6982 8.36249 15.3115 7.75499 14.6829 7.31629C14.2371 7.00408 13.7477 6.80299 13.2007 6.78049C13.1384 6.7779 13.0756 6.77451 13.0125 6.7711C12.7328 6.75598 12.4485 6.74062 12.1811 6.79455C11.4161 6.94783 10.744 7.29799 10.2363 7.91529C10.1773 7.98609 10.1196 8.05799 10.0335 8.16529L10.0141 8.18959V6.99565ZM3.41602 15.5583H6.0668V7.00122H3.41602V15.5583Z" fill="black"/>
              </svg>

            </a>
            <a href="#" className="h-8 w-8" aria-label="X">
              <svg width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                          <path d={icons.x} />
              </svg>
            </a>
            <a href="#" className="h-8 w-8" aria-label="Facebook">
              <svg width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                          <path d={icons.facebook} />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN BLOG CONTENT */}
      <article className="max-w-5xl mx-auto px-8 sm:px12 md:px-16 lg:px20 py-4 gap-2 space-y-10
                          text-base
                          md:text-lg">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold font-font-poppins mb-4">
            Reliable Power for Rural Nigerians at Scale
          </h2>
          <p>
            In a landmark collaboration, the <b>Rural Electrification Agency (REA)</b> signed a $200 million Memorandum of Understanding (MoU) with <b>WeLight</b>, a pan-African distributed renewable energy firm, on <b>March 10, 2025</b>, to deploy <b>400 mini-grids and 50 larger MetroGrids</b> across Nigeria&apos;s underserved rural and peri-urban regions
          </p>

          <blockquote className="mt-6 font-font-poppins border-l-4 border-green-600 bg-grayish-primary px-6 py-4 italic  rounded-md
                       flex flex-col items-start"> {/* Changed items-start to items-end */}
              &quot;This MOU not only represents a leap toward providing clean electricity to millions in Nigeria but also supports WeLight's ambition to become a truly pan-African company,&quot;
              <footer className="text-sm text-gray-700 mt-2 self-end flex">&mdash; Romain de Villeneuve, CEO, WeLight</footer>
          </blockquote>

          <p className="mt-6 font-font-fira-sans">
            Backed by critical support from the <b>World Bank and African Development Bank (AfDB)</b>, the project aligns with Nigeria&apos;s ambition to raise renewables from <b>22% to 50% of its energy mix</b>, delivering clean and consistent power to an estimated <b>1.52 million residents</b>
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold font-font-poppins mb-4">
            Project Impact & Significance
          </h2>
          <ul className="list-disc list-inside font-font-fira-sans space-y-3">
            <li><strong>Rural Electrification Boost:</strong> Instantly expands access in locations formerly too remote for grid extension.</li>
            <li><strong>Economic Revitalization:</strong> Enables businesses and critical services—schools, clinics, cold storage—to function predictably.</li>
            <li><strong>Investor Momentum:</strong>Aligns with SEAP&apos;s PPP-aligned models for hybrid power, smart cooking, and e-mobility solutions.</li>
          </ul>

          <div className=" p-6 sm:p-8 md:p-10 lg:p-8 max-w-3xl w-full"> {/*rounded-lg shadow-md */}
            <div className="relative pl-8 sm:pl-6">
                <span className="absolute left-0 top-0 text-6xl leading-none text-green-accent font-sans">“</span>
                <p className="font-bold font-font-fira-sans italic text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug text-bleus-secondary">
                    This is a pivotal step in Nigeria&apos;s energy transition, demonstrating that clean, renewable infrastructure can scale with private capital.
                </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="pb-12 sm:pb-8">
          <h2 className="text-2xl md:text-3xl font-font-poppins font-semibold mb-4 ">
            SEAP&apos;s Strategic Next Steps
          </h2>
          <ol className="list-decimal list-inside space-y-3 font-font-fira-sans">
            <li><strong>Developer Integration</strong> - SEAP is evaluating how its hybrid mini-grid and clean cooking offerings can build on these PPP frameworks.</li>
            <li><strong>Financier Alignment</strong> - Invitations are out to DFIs and impact investors to co-finance rollouts anchored in SEAP&apos;s proven project templates.</li>
            <li><strong>Webinar Invite</strong> - <b>Join our session on July 2, 2025,</b> to explore how PPP infrastructure platforms like this open avenues in energy, agri, and mobility for SEAP stakeholders.</li>
          </ol>
        </section>

      </article>
      {/* Section 4 */}
       <NewsletterSub />
    </main>
  );
}

export default page;