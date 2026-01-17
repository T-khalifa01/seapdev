import ProjectAccordion from "../../../(common)/commponents/specific/ProjectAccordion";
import ProjectRow from "../../../(common)/commponents/specific/ProjectRow";
import Button from "../../../(common)/commponents/ui/Button";
import Image from "next/image";


// meta data
export const metadata = {
  title: "Industrial Infrastructure Investment | SEAP Nigeria",
  description:
    "SEAP aligns clean energy investments with Nigeria's industrial corridors, ports, and trade hubs to power growth, exports, and job creation.",
  keywords: [
    "industrial infrastructure Nigeria",
    "SEAP industrial projects",
    "clean energy industry Nigeria",
    "Nigeria trade hubs energy",
    "industrial investment Nigeria",
  ],
  openGraph: {
    title: "Industrial Infrastructure Investment | Powering Nigeria's Industry",
    description:
      "Invest in SEAP's industrial infrastructure projects providing hybrid power to Nigeria's trade hubs, corridors, and special economic zones.",
    url: "https://seap.com.ng/investment-opportunities/industrial-infrastructure",
    images: [
      {
        url: "https://seap.com.ng/industrial.jpg",
        width: 1200,
        height: 630,
        alt: "Industrial corridor in Nigeria powered by SEAP clean energy infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Infrastructure Investment | SEAP Nigeria",
    description:
      "SEAP powers Nigeria's industrial growth with clean energy for trade hubs, ports, and manufacturing corridors.",
    images: ["https://seap.com.ng/industrial.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },

    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
  //manifest: '/site.webmanifest', // You'd need to create this file
  robots: {
    index: true,
    follow: true,
  },
};


const industrialInfra = () => {
  const projectsList =[
    {Milestone:"North-Central", tdate:"Lokoja Agro Belt (5-8 MW)"},
    {Milestone:"North-East", tdate:"Bauchi Quarry & Cement (8-10 MW)"},
    {Milestone:"North-West", tdate:"Kano Industrial Zone (10-12 MW)"},
    {Milestone:"South-West", tdate:"Ogun FTZ Industrial Cluster (10-15 MW)"},
    {Milestone:"South-East", tdate:"Aba SME Leather Cluster (3-5 MW)"},
    {Milestone:"South-South", tdate:"Onne Port & Eleme Petrochem (25+ MW)"}
  ]
  return (
    <main className="pt-12">

    <section
            className="relative flex w-full flex-col justify-end gap-2 px-8 pb-8 leading-[normal]
                      md:gap-4 md:px-10 md:pb-10
                      h-[60vh] md:h-[80vh]"
            aria-labelledby="hero-title"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/projects/industrial-infra-2.webp"
                alt="two engineers coordinating operations in an industrial site"
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
              Industrial Infrastructure
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              
            </h3>
    
            {/* Subheading */}
            <div
              className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                        md:text-base
                        lg:text-lg lg:leading-normal md:w-3/4
                        xl:text-xl"
            >
              <p>
                Aligning clean energy investments with Nigeria&apos;s industrial corridors to foster sustainable economic development.
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
                font-fira-sans relative flex w-full leading-[normal] justify-center
                flex-col px-4 py-12 gap-4
                sm:px-8 sm:py-8 sm:gap-6
                md:px-12 md:py-12 md:gap-10
                lg:flex-row lg:px-20 lg:py-12 lg:gap-8
              `}
              aria-labelledby="electric-mobility-heading"
            >

              {/* Right Column: Image */}
              <div
                className={`
                  flex flex-col items-start gap-6
                  w-full
                  lg:grow lg:max-w-[640px]
                `}
              >
                {/* Main Heading for the section */}
                <h2
                  id="electric-mobility-heading"
                  className={`
                    self-stretch leading-[1.2] font-semibold
                    text-lg
                    sm:text-lg
                    md:text-xl
                    lg:text-3xl
                  `}
                >
                  Empowering Industrial Growth
                </h2>
                {/* Description Paragraph */}
                <p className="self-stretch text-base leading-normal sm:text-lg">
                  SEAP&apos;s industrial infrastructure program aligns clean energy investments with Nigeria&apos;s emerging industrial corridors, ports, and logistics networks. By mapping electricity demand against trade hubs, rail lines, and special economic zones, we deliver hybrid power systems where they're most needed to drive job creation, manufacturing, and export growth.
                </p>
                {/* Feature Cards List - Semantically a list of key features */}
                <div className="pt-4 w-full flex flex-col gap-2 items-center leading-normal
                              
                            sm:flex-row sm:justify-between sm:flex-wrap
                            md:justify-start md:gap-4
                            lg:justify-start 
                            
                            ">
                  
                </div>
              
              </div>
                {/* Left Column: Text Content Block */}
              <div
                className={`
                  relative w-full rounded-xl overflow-hidden
                  aspect-480/512
                  h-auto
  
                  md:w-full md:h-96 md:justify-center
                  lg:w-[480px] lg:h-[512px] lg:shrink-0
                `}
              >
                <Image
                  src="/images/projects/industrial-infra-3.webp"
                  alt="a picture of a mining field with mining vehicles"
                  fill={true}
                  sizes="(max-width: 1280px) 100vw, 480px"
                  className="object-cover object-center"
                />
              </div>
            </section>

    <section className={`
            relative flex w-full leading-[normal] justify-center
            flex-col px-4 py-8 gap-6
            sm:px-8 sm:py-12 sm:gap-10
            md:px-12 md:py-16 md:gap-12
            xl:flex-row lg:px-20 lg:py-20 lg:gap-8
          `}
          aria-labelledby="electric-mobility-heading">
      {/* left Column: heading */}
          <div
          className={`
            flex w-full items-start leading-[1.2]

            xl:w-[calc(50%-40px)]
            min-[1270px]:w-[600px]
            lg:text-left
            text-3xl
            sm:text-4xl
            md:text-5xl
          `}
        >
          <h5 id="unlocking-heading" className={`
                self-stretch leading-[1.2] font-semibold
                text-lg
                sm:text-lg
                md:text-xl
                lg:text-3xl
              `} >
            Strategic Regional Projects Powered by SEAP
          </h5>
        </div>

        {/* right Column: Text Content Block */}
          <div
            className={`
              flex flex-col items-start gap-6
              w-full
              lg:grow xl:max-w-[640px]
            `}
          >
            <div className="font-fira-sans flex flex-col gap-2 leading-[1.6] mt-6">
              <p className="text-base md:text-lg">
                The Sustainable Energy Access Projects (SEAP) are strategically aligning clean energy deployment with Nigeria&apos;s expanding network of industrial corridors, ports, railways, and special economic zones. By leveraging satellite mapping, infrastructure datasets, and real-time demand intelligence, SEAP identifies areas where energy scarcity hinders productivity and deploys hybrid solar-gas mini-grids to meet industrial-scale power demands.
              </p>
              <div className="text-base md:text-lg" />
                <p>
                  This approach connects clean power infrastructure to vital trade hubs such as the Lekki Free Zone, Kano SEZ, Ogun-Guangdong FTZ, and Calabar Free Trade Zone. These zones, along with critical ports like Apapa, Onne, and Warri, serve as anchors for economic growth but remain vulnerable to high electricity costs and frequent supply disruptions. SEAP's GIS mapping extends to major rail lines including Lagos-Ibadan, Kaduna - Abuja, and the Itakpe - Warri corridor and trade highways like Lagos - Kano - Jibia and Enugu-Port Harcourt, ensuring that energy solutions follow the arteries of commerce and industry.
                </p>
                <div className="text-base md:text-lg" />
                <p>
                  The program specifically targets sectors with high electricity dependency. Textile and apparel hubs in Lagos, Kano, and Aba face production halts due to unreliable energy. Food processors in Ogun, Plateau, and Benue suffer from post-harvest losses linked to cold chain gaps. Steel, cement, and building material clusters in Kogi, Edo, and Ogun struggle with diesel-based operations that raise costs and emissions. Automotive and assembly lines across Anambra, Kaduna, and Lagos need stable voltage to scale operations, while packaging, plastics, and chemical industries near coastal states depend on uninterrupted energy for batch processing and safety.
                </p>
                <div className="text-base md:text-lg" />
                <p>
                  By delivering clean, off-grid power with grid interface capability, SEAP reduces downtime, lowers production costs, and accelerates economic output. These energy investments are not only enabling industry they&apos;re positioning Nigeria as a greener, more globally competitive manufacturing base.
                </p>
            </div>
            <div className={`leading-[1.6] w-full`}>
            <p className="mb-4">
              Across Nigeria&apos;s six geopolitical zones, SEAP is catalyzing region-specific economic growth by matching energy solutions with the industrial needs of each hub. These tailored interventions help unlock productivity, reduce carbon footprints, and promote resilient, decentralized power access where it's most impactful.
            </p>
          </div>
          <div className="w-full pt-4 md:pt-0">
            {/* Desktop Table like view */}
            <div className="hidden sm:block xl:hidden overflow-x-auto">
              <table className="w-full border-collapse table-auto text-left">
                <thead>
                  <tr className="border-b border-solid border-black/10">
                    <th className="py-[19px] pr-4 font-poppins text-lg md:text-xl leading-[1.4]">Region</th>
                    <th className="py-[19px] pl-4 font-poppins text-lg md:text-xl leading-[1.4] text-right whitespace-nowrap">
                      Project
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectsList.map((p) => (
                    <ProjectRow key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} />
                  ))}
                </tbody>
              </table>
            </div>

          {/* Mobile/Tablet like Accordion  */}
          <div className="sm:hidden xl:block">
            {projectsList.map((p) => (
              <ProjectAccordion key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} target={"Project"}  />
            ))}
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
                  src="/images/projects/industrial-infrastructure-4.webp"
                  alt="a piture of a pot on a mordern stove"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="pointer-events-none"
                  priority={true}
                />
                <div className="absolute inset-0 z-1 bg-black/50" />
              </div>

              <h1
                id="about-us-heading"
                className={`
                  z-2 md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Invest in Sustainable Growth
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Join us in transforming Nigeria&apos;s industrial landscape through clean energy and innovative infrastructure solutions.
              </p>
              <div className={`z-3 flex`}>
                <Button
                  label={"Invest in Nigeria's sustainable growth" }
                  type={'solid'}
                  ariaLabel={'invest-in-sustainable-growth'}
                />
              </div>
            </section>


    </main>
  );
}

export default industrialInfra;