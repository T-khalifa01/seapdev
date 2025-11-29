// next, react
import Image from "next/image";
// data local
import { getWebData } from "../../(common)/lib/getWebData";
// import allData from "../../(common)/lib/data/webdata.json";
// component specific
import ProjectCard from "../../(common)/commponents/specific/ProjectCard";
import Button from "../../(common)/commponents/ui/Button";


// app/investment-opportunities/page.tsx
export const metadata = {
  title: "Investment Opportunities | SEAP Nigeria",
  description:
    "Discover SEAP's bold investment opportunities across energy, transport, agriculture, mining, and industrial infrastructure. Power Nigeria's clean energy future.",
  keywords: [
    "investment opportunities Nigeria",
    "clean energy investment Nigeria",
    "sustainable investment Nigeria",
    "EV investment Nigeria",
    "agriculture energy Nigeria",
    "mining infrastructure Nigeria",
    "utility-scale solar Nigeria",
    "industrial infrastructure Nigeria",
    "SEAP projects investment",
  ],
  openGraph: {
    title: "SEAP Investment Opportunities | Powering Nigeria's Clean Energy Future",
    description:
      "From e-mobility to agribusiness, mining, utility-scale solar, and industrial hubs — SEAP connects investors with scalable, high-impact clean energy projects.",
    url: "https://seap.com.ng/investment-opportunities",
    images: [
      {
        url: "https://seap.com.ng/investment-og.jpg",
        width: 1200,
        height: 630,
        alt: "Investment opportunities in Nigeria's clean energy future with SEAP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP Investment Opportunities | Clean Energy Projects in Nigeria",
    description:
      "Explore investment opportunities in Nigeria's clean energy future. SEAP projects span transport, agriculture, mining, solar, and industrial infrastructure.",
    images: ["https://seap.com.ng/investment-og.jpg"],
  },
};



const InvestOpp = async () => {
  const allData =  await getWebData();
  const {smallprjct, icons} = allData;
  return (
    <main>
      
    <section
            className="relative flex w-full flex-col justify-end gap-2 px-8 pb-8 leading-[normal]
                      md:gap-4 md:px-10 md:pb-10
                      h-[60vh] md:h-[80vh]"
            aria-labelledby="hero-title"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/projects/agriculture-1.webp"
                alt="a field of crops and farmers cultivating"
                fill={true}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
    
            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-[#0000007f]" />
    
            {/* Heading */}
            <h1
              id="hero-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3 justify-self-start
                        md:text-lg md:font-semibold
                        lg:text-xl md:w-3/4
                        xl:text-xl"
            >
              Investment Opportunities
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              Invest in Sustainability
            </h3>
    
            {/* Subheading */}
            <div
              className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                        md:text-base
                        lg:text-lg lg:leading-normal md:w-3/4
                        xl:text-xl"
            >
              <p>
                Explore diverse sectors driving Nigeria&apos;s clean energy future: energy, transport, agri-business, and mining.
              </p>
            </div>
    
            {/* CTA Button */}
            <div className="z-3 flex  self-stretch pr-10 pt-[3px] md:pr-0 md:pt-4 md:items-end">
              <Button
                href="/investment-form"
                label="Invest in Nigeria's future"
                type="solid"
                ariaLabel={'button-to-investment-form'}
              />
            </div>
          </section>


    <section
      className={`
        flex w-full flex-col leading-[normal]
        px-4 py-12
        sm:px-8 sm:py-16
        md:px-12 md:py-20
        lg:px-20 lg:py-28
        xl:px-20 xl:py-28
      max-w-screen-2xl mx-auto
      `}
      aria-labelledby="unlocking-heading"
    >
      <div
        className={`
          flex flex-col items-start gap-8
          sm:gap-12
          md:gap-16
          lg:flex-row lg:justify-center lg:items-start lg:gap-20
          min-[1270px]:flex-nowrap
        `}
      >
        {/* Left Column: Main Heading */}
        <div
          className={`
            font-poppins flex w-full items-start leading-[1.2]
            lg:w-[calc(50%-40px)]
            min-[1270px]:w-[600px]
            lg:text-left
            text-3xl
            sm:text-4xl
            md:text-5xl
          `}
        >
          <h2 id="unlocking-heading" className="self-stretch leading-[1.2] font-semibold
                text-lg
                sm:text-lg
                md:text-xl
                lg:text-3xl">
            Unlocking Nigeria&apos;s Clean Energy Future One Sector at a Time
          </h2>
        </div>

        {/* Right Column: Descriptive Paragraphs */}
        <div
          className={`
            font-fira-sans w-full text-base leading-[1.6]
            lg:w-[calc(50%-40px)]
            min-[1270px]:w-[600px]
            sm:text-lg
            md:text-xl
          `}
        >
          {/* Replaced empty div with margin-bottom for semantic spacing */}
          <p className="mb-7">
            The Sustainable Energy Access Projects (SEAP) is opening up bold investment opportunities across Nigeria&apos;s most underserved markets — with clean infrastructure as the backbone. From local EV charging networks to utility-scale solar farms, SEAP connects high-impact projects to forward-thinking investors, technical partners, and financiers.
          </p>
          <p className="mb-7">
            Whether you're looking to fund innovation, co-develop long-term assets, or support scalable public-private initiatives, SEAP provides bankable, shovel-ready investment pipelines backed by government partnerships, spatial data, and clear returns.
          </p>
          <p>Explore sector-based opportunities below:</p>
        </div>
      </div>
    </section>

    <section className={`flex w-full flex-col items-center justify-center gap-4  px-5 py-16 leading-[normal]
                    sm:px-8 sm:py-8 sm:gap-14
                    md:gap-8 md:px-10 md:py-12
                    lg:gap-8 lg:px-20 lg:py-12`}
                    aria-label="projects-lists">


            {/* Project Cards Container */}
            <div className={` flex grow flex-col gap-4 leading-[1.6] justify-center items-center
                        md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-10 md:justify-items-center md:items-start md:leading-normal md:pb-6
                        lg:gap-x-4 lg:gap-y-16 lg:pb-6 lg:grid-cols-3
                        `}>
                {smallprjct.map((data) => (
                    <ProjectCard
                        title={data.title}
                        desc1={data.desc1}
                        // desc2={data.description2}
                        key={data.id}
                        id={data.id}
                        link={data.href}
                        img={data.img}
                        icons={icons}
                    />
                ))}
            </div>
        </section>
    </main>
  );
}

export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)

export default InvestOpp;