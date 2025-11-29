// next, react
import Image from "next/image";
// data local
// import allData from "../../../(common)/lib/data/webdata.json";
import { getWebData } from "../../../(common)/lib/getWebData";
// componentspecific
import Button from "../../../(common)/commponents/ui/Button";
import ProjectAccordion from "../../../(common)/commponents/specific/ProjectAccordion";
import ProjectRow from "../../../(common)/commponents/specific/ProjectRow";

// meta data
export const metadata = {
  title: "Agriculture & Agribusiness Investment | SEAP Nigeria",
  description:
    "SEAP's agriculture program powers irrigation, processing, storage, and distribution with clean energy and precision data to unlock Nigeria’s agri-economy.",
  keywords: [
    "agriculture Nigeria",
    "agribusiness Nigeria",
    "SEAP agriculture projects",
    "clean energy farming Nigeria",
    "sustainable farming Nigeria",
    "agriculture investment Nigeria",
  ],
  openGraph: {
    title: "Agriculture & Agribusiness | Investing in Nigeria's Agri-Economy",
    description:
      "Invest in SEAP's agri-energy infrastructure supporting farmers with irrigation, processing, storage, and distribution powered by clean energy.",
    url: "https://seap.com.ng/investment-opportunities/agriculture",
    images: [
      {
        url: "https://seap.com.ng/agriculture.jpg",
        width: 1200,
        height: 630,
        alt: "Farmers using solar-powered irrigation and processing systems in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agriculture & Agribusiness Investment | SEAP Nigeria",
    description:
      "Explore SEAP's agriculture projects enabling clean energy-powered irrigation, processing, and distribution across Nigeria.",
    images: ["https://seap.com.ng/agriculture.jpg"],
  },
};




const AgricAgriBusiness = async () => {
  const allData =  await getWebData();
  const {icons} = allData;
  const projectsList =[
    { Milestone:"Solar Cold Rooms (5 units / LGA)", tdate:"18-22%"},
    { Milestone:"Mini Rice or Cassava Mills", tdate:"20-25%"},
    { Milestone:"Grain Silos + Dryers", tdate:"15-18%"},
    { Milestone:"Dairy Cooling & Processing", tdate:"22-28%"},
    { Milestone:"GIS Data Subscription & Tools", tdate:"N/A (License)"}
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
                src="/images/projects/agriculture-1.webp"
                alt="a field of crops and farmers cultivating"
                fill={true}
                className="object-cover object-center"
                sizes="100vw"
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
              Agriculture & Agribusiness
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              Empowering Agri-Business
            </h3>
    
            {/* Subheading */}
            <div
              className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                        md:text-base
                        lg:text-lg lg:leading-normal md:w-3/4
                        xl:text-xl"
            >
              <p>
                Discover how SEAP&apos;s electric mobility initiatives are reshaping Nigeria&apos;s transportation landscape for a sustainable future.
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
              relative flex w-full leading-[normal] justify-center
        flex-col px-4 py-12 gap-8
        sm:px-8 sm:py-16 sm:gap-12
        md:px-12 md:py-20 md:gap-16
        xl:flex-row lxl:px-20 xl:py-24 xl:gap-8

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
                  self-stretch leading-[1.2]
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-[40px]
                `}
              >
                Powering Nigeria&apos;s Agricultural Value Chains with Smart Infrastructure
              </h2>
              {/* Description Paragraph */}
              <p className="self-stretch text-base leading-normal sm:text-lg">
                SEAP&apos;s integrated infrastructure model supports agricultural transformation by addressing energy, data, and value chain gaps across Nigeria's farming communities. From powering irrigation and processing to enabling storage and distribution, we&apos;re helping Nigeria unlock the full potential of its Agri-economy with technology, precision data, and clean energy at its core.
              </p>
              {/* Feature Cards List - Semantically a list of key features */}
              <div className="pt-4 w-full flex flex-col gap-2 items-center leading-normal
                            
                          sm:flex-row sm:justify-between sm:flex-wrap
                          md:justify-start md:gap-4
                          lg:justify-start 
                          
                          ">
                <article
                    className={`
                        flex flex-col gap-3 w-full
                        sm:w-[calc(50%-6px)]
                        md:w-72
                        lg:w-[calc(60%-12px)]
                    `}
                >
                    
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 mb-2 text-green-accent
                            lg:mb-2 ">
                      <path d={icons.agriculture} className=""/>
                    </svg>
                    <h3 className="font-poppins text-lg leading-[1.4] sm:text-xl">
                        Derivative Products & Value Chains
                    </h3>
                    <p className="text-base leading-normal font-fira-sans">
                        Cassava, Maize, Yam, Rice and Millet. These crops dominate in volume, indicating their widespread cultivation and importance across LGAs.
                    </p>
                </article>
                
              </div>
            </div>

            {/* Left Column: Text Content Block */}
            <div
              className={`
                relative w-full rounded-xl overflow-hidden
          aspect-288/307
          h-auto
          md:w-full   md:h-[512px]
          
          xl:w-[480px] xl:h-[512px]
              `}
            >
              <Image
                src={`/images/projects/agriculture-4.webp`}
                alt="Electric motorcycle riders at a battery swapping station, representing clean mobility and charging infrastructure"
                fill={true}
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 480px"
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
            Investment Snapshots
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
            <div className={`leading-[1.6] w-full`}>
              <p className="text-base md:text-lg">
                <b>SEAP&apos;s agriculture and agribusiness strategy</b> presents high-impact, scalable investment opportunities across Nigeria&apos;s LGAs. Through our GIS data and infrastructure-first model, we enable investors to fund agri-projects with lower risk and higher returns. For instance, modular processing units tailored to specific crops like cassava and maize can be deployed in high-yield zones with solar microgrids ensuring round-the-clock operations.
              </p>
              <div className="text-base md:text-lg" />
                <p>
                  Cold-chain logistics is another critical area of investment. With solar-powered cold rooms and distribution hubs, investors can unlock value in perishable sectors such as tomatoes, dairy, and meat reducing spoilage and improving market pricing for farmers. These projects are suitable for both social impact investors and commercial agri-financiers.
                </p>
                <div className="text-base md:text-lg" />
                <p>
                  Finally, value-added manufacturing for agribusiness such as starch processing, animal feed production, or fruit drying is being catalyzed by SEAP through energy-secure agro-industrial parks. By bridging energy and logistics gaps, SEAP creates investment-ready clusters where aggrotech innovators and processors can co-locate and thrive.
                </p>
              </div>
              <div className={`leading-[1.6] w-full`}>
                <p className="mb-4">
                  SEAP targets over 20,000 households per LGA, providing access to clean cooking through decentralized refueling infrastructure, home delivery systems, and community hubs. Both biogas and LPCNG fuel sources are deployed—biogas produced locally from waste and organic matter, and LPCNG sourced through Nigeria&apos;s expanding gas network. The program also equips schools, hospitals, religious centers, and correctional facilities with institutional-scale cooking systems.
                </p>
                <p className="mb-4">
                  SEAP&apos;s Agriculture & Agribusiness interventions are designed to attract high-impact, capital-efficient investments across processing, storage, and data infrastructure. In each LGA, investors can tap into growing demand for agro-logistics and post-harvest facilities. Solar-powered cold rooms, mini rice or cassava mills, and grain silos are viable with IRRs ranging from 15% to 28%. Regionally, dairy processing zones offer strong returns through value-added product lines. Additionally, nationwide access to GIS data tools offers subscription-based revenue models for aggrotech startups and analytics firms.
                </p>
              </div>
            <div className="w-full pt-4 md:pt-0">
              {/* Desktop Table like view */}
              <div className="hidden sm:block xl:hidden overflow-x-auto">
                <table className="w-full border-collapse table-auto text-left">
                  <thead>
                    <tr className="border-b border-solid border-black/10">
                      <th className="py-[19px] pr-4 font-poppins text-lg md:text-xl leading-[1.4]">Opportunity / LGA</th>
                      <th className="py-[19px] pl-4 font-poppins text-lg md:text-xl leading-[1.4] text-right whitespace-nowrap">
                        {`ROI (Est)`}
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

              {/* Mobile/Tablet Accordion (below lg) */}
              <div className="sm:hidden xl:block">
                {projectsList.map((p) => (
                  <ProjectAccordion key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} target={"ROI (Est)"} />
                ))}
              </div>
            </div>
          </div>


    </section>




    </main>
  );
}


export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)
export default AgricAgriBusiness;