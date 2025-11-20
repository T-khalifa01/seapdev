import Image from "next/image";
// data local
import allData from "../../(common)/lib/data/webdata.json";
// components specific
import ProjectCard from "../../(common)/commponents/specific/ProjectCard";
import Button from "../../(common)/commponents/ui/Button";


// meta data for seo
export const metadata = {
  title: "Projects ",
  description:
    "Explore SEAP projects driving Nigeria's energy transformation — hybrid solar & gas mini-grids, GIS mapping, and clean cooking solutions for every LGA.",
  keywords: [
    "SEAP projects",
    "sustainable energy Nigeria",
    "hybrid solar gas mini-grid",
    "GIS mapping Nigeria",
    "clean cooking Nigeria",
    "biogas",
    "LPCNG cylinders",
    "renewable energy Nigeria",
    "energy access projects",
  ],
  openGraph: {
    title: "SEAP Projects | Transforming Nigeria's Energy Access",
    description:
      "From 5MW hybrid solar-gas mini-grids to clean cooking solutions and GIS mapping, SEAP delivers scalable, inclusive energy projects across all 774 LGAs.",
    url: "https://seap.com.ng/projects",
    images: [
      {
        url: "https://seap.com.ng/projects-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP hybrid solar-gas and clean cooking projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP Projects | Hybrid Solar, Clean Cooking & GIS Mapping",
    description:
      "Discover SEAP projects powering Nigeria's future — hybrid mini-grids, clean cooking tech, and data-driven energy mapping.",
    images: ["https://seap.com.ng/projects-og.jpg"],
  },
};


const page = () => {
    const {projectsCardData, icons} = allData;
  return (
    <main className="pt-12">
            <section
            className={`
              relative flex w-full flex-col items-start justify-end gap-2 md:gap-6 leading-[normal] text-white overflow-hidden h-[50vh] md:h-[70vh]
              md:px-12 md:py-12 px-4 py-4
      
            `}
            aria-labelledby="about-us-heading"
          >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/projects/solar-2.jpg"
                  alt="Abstract background representing sustainable energy"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="pointer-events-none"
                />
                {/* Overlay for Readability */}
                <div className="absolute inset-0 z-1 bg-black/50" />
              </div>
              {/* <BgCarousel images={images}/> */}
      
              {/* Main Heading */}
              <h1
                id="about-us-heading"
                className={`
                  z-[2] md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Empower Nigeria's Future
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-[2] md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Unlock transformative investment opportunities that drive sustainable energy access and economic growth in Nigeria.
              </p>
            </section>
      
      <section 
      className={`
        flex w-full flex-col items-center justify-center leading-[normal] bg-grayish-primary
        gap-8 px-5 py-16
        sm:px-8 sm:py-8 sm:gap-14
        md:gap-12 md:px-10 md:py-8
        lg:gap-20 lg:px-20 lg:py-28
      `}
      aria-labelledby="projects-title"
    >
      {/* Section Title */}
      <div
        className={`
          flex flex-col items-center w-full text-center
          gap-6
          md:gap-8
          min-[1270px]:flex-row
          min-[1270px]:items-start min-[1270px]:justify-center
          min-[1270px]:gap-x-20 min-[1270px]:gap-y-11
          min-[1270px]:flex-nowrap
          min-[1270px]:w-auto
        `}
      >
        {/* New Sub-heading */}
        <h3 
          className={`
            font-poppins leading-[1.3]
            text-2xl
            md:text-3xl
            min-[1270px]:text-[40px] min-[1270px]:w-[600px] min-[1270px]:text-left
          `}
        >
          Powering Nigeria's Future, One LGA at a Time
        </h3>

        {/* New Paragraph */}
        <p 
          className={`
            font-fira-sans leading-[1.6]
            text-base
            md:text-lg
            min-[1270px]:w-[600px] min-[1270px]:text-left
          `}
        >
          SEAP is transforming energy access across Nigeria with data-driven mapping, hybrid power, and clean cooking solutions - delivering inclusive, scalable infrastructure to all 774 LGAs.
        </p>
      </div>

      {/* Existing Project Cards Container */}
      <div 
        className={`
          flex flex-grow flex-col gap-4 leading-[1.6] justify-center items-center
          md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:justify-items-center md:items-start md:leading-normal
          lg:gap-x-4 lg:gap-y-4
          min-[1270px]:flex min-[1270px]:flex-row min-[1270px]:flex-nowrap min-[1270px]:justify-center min-[1270px]:items-start min-[1270px]:gap-4
        `}
      >
        {projectsCardData.map((data) => (
          <ProjectCard
            title={data.title}
            desc1={data.description1}
            desc2={data.description2}
            key={data.id}
            id={data.id}
            link={data.links}
            img={data.img}
          />
        ))}
      </div>
    </section>

    <section 
      className={`
        flex w-full flex-col leading-[normal]
        px-4 py-16 gap-8
        sm:px-8 sm:py-20 sm:gap-10
        md:px-12 md:py-24 md:gap-16
        lg:px-16 lg:py-28 lg:gap-20
        min-[1270px]:px-20 min-[1270px]:py-28
      `}
      aria-labelledby="statistics-main-heading"
    >
      {/* Main Content Wrapper - This div handles the overall layout from stacked to two columns */}
      <div 
        className={`
          flex w-full
          flex-col items-center text-center
          gap-6
          sm:gap-8
          md:gap-10
          lg:gap-12
          min-[1270px]:flex-row
          min-[1270px]:flex-nowrap
          min-[1270px]:items-start
          min-[1270px]:justify-center
          min-[1270px]:gap-x-20 min-[1270px]:gap-y-20
          min-[1270px]:w-auto
        `}
      >
        {/* Left Column: Main Section Heading */}
        <h2 
          id="statistics-main-heading"
          className={`
            font-poppins leading-[1.3]
            text-3xl max-w-sm mx-auto
            sm:text-4xl sm:max-w-md
            md:text-[36px] md:max-w-xl
            lg:text-[40px] lg:max-w-2xl
            min-[1270px]:w-[600px]
            min-[1270px]:text-[40px]
            min-[1270px]:text-left
            min-[1270px]:mx-0
          `}
        >
          Transforming Nigeria: Key Statistics on Sustainable Energy Projects
        </h2>

        {/* Right Column: Description Paragraph and Statistic Cards */}
        <div 
          className={`
            flex flex-col items-center w-full text-center
            gap-4
            md:items-start md:text-left
            min-[1270px]:w-[600px]
          `}
        >
          {/* Description Paragraph */}
          <p className={`text-base leading-[1.6] md:text-lg`}>
            Nigeria's energy transition is gaining momentum through data-backed, decentralized infrastructure projects. The SEAP pilot phase demonstrates the scale, resilience, and replicability of hybrid systems across diverse local contexts.
          </p>

          {/* Statistic Cards Container - Holds the two individual statistic cards */}
          <div 
            className={`
              flex flex-col items-center justify-center gap-6 w-full
              sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-10
              md:gap-x-16 md:gap-y-16
              xl:flex-nowrap
              xl:justify-start
              xl:gap-2
            `}
          >
            {/* Stat Card 1 */}
            <div className={`flex w-full flex-col gap-2 text-center max-w-xs mx-auto
                             sm:w-72 sm:text-left sm:items-start sm:mx-0`}>
              <h3 className={`font-poppins text-4xl leading-[1.2] sm:text-5xl`}>
                15 MW
              </h3>
              <p className={`text-sm md:text-base font-fira-sans`}>
                Total Installed Capacity, Across Kano, Imo, and Cross River - each site delivers 3-MW solar + 2-MW gas hybrid power.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className={`flex w-full flex-col gap-2 text-center max-w-xs mx-auto
                             sm:w-72 sm:text-left sm:items-start sm:mx-0`}>
              <h3 className={`font-poppins text-4xl leading-[1.2] sm:text-5xl`}>
                50,000
              </h3>
              <p className={`text-sm md:text-base font-fira-sans`}>
                Tonnes CO₂e avoided annually, Clean generation displaces diesel use and reduces harmful emissions at scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


   
    <section
            className={`
              relative flex w-full flex-col items-start justify-end gap-2 md:gap-6 leading-[normal] text-white overflow-hidden h-[40vh] md:h-[50vh]
              md:px-12 md:py-12 px-4 py-4
      
            `}
            aria-labelledby="about-us-heading"
          >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/cooking/cooking-sul.jpg"
                  alt="a piture of a pot on a mordern stove"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="pointer-events-none"
                />
                {/* Overlay for Readability */}
                <div className="absolute inset-0 z-1 bg-black/50" />
              </div>
              {/* <BgCarousel images={images}/> */}
      
              {/* Main Heading */}
              <h1
                id="about-us-heading"
                className={`
                  z-[2] md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Help Fuel the Future of Clean Cooking
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-[2] md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Your contribution helps provide safe, low-emission cooking kits to families in need. Join us in ending toxic smoke and energy poverty!
              </p>
              <div className={`z-[3] flex`}>
        <Button
          label={"invest in Nigeria's sustainable cooking future" }
          type={'solid'}
          ariaLabel={'invest-in-clean-cooking-solution'}
        />
      </div>
            </section>
    </main>
  );
}

export default page;