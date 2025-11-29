import Image from "next/image";
// data local
// import allData from "../../../(common)/lib/data/webdata.json";
import { getWebData } from "../../../(common)/lib/getWebData";
import Button from "../../../(common)/commponents/ui/Button.jsx";


// meta dat
export const metadata = {
  title: "Utility-Scale Solar Investment | SEAP Nigeria",
  description:
    "SEAP identifies prime sites for solar farms using GIS and satellite data, enabling high-yield utility-scale solar power plants across Nigeria.",
  keywords: [
    "utility scale solar Nigeria",
    "solar farms Nigeria",
    "SEAP solar projects",
    "large scale solar investment Nigeria",
    "renewable energy Nigeria",
  ],
  openGraph: {
    title: "Utility-Scale Solar Investment | Powering Nigeria with Solar Farms",
    description:
      "Invest in SEAP's utility-scale solar projects leveraging GIS and satellite mapping for efficient, high-yield clean energy across Nigeria.",
    url: "https://seap.com.ng/investment-opportunities/utility-scale-solar",
    images: [
      {
        url: "https://seap.com.ng/utility-solar.jpg",
        width: 1200,
        height: 630,
        alt: "Utility-scale solar farm in Nigeria under SEAP investment program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utility-Scale Solar | SEAP Nigeria",
    description:
      "SEAP's utility-scale solar projects harness GIS data to deliver high-yield solar farms across Nigeria.",
    images: ["https://seap.com.ng/utility-solar.jpg"],
  },
};


const UtilityScale = async () => {
  const allData =  await getWebData();
  const {icons} = allData;

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
                src="/images/projects/solar-1.webp"
                alt="an aerial view of a solar farm "
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
              className="flex text-md leading-[1.2] text-whitish-secondary z-3 justify-self-start
                        md:text-lg md:font-semibold
                        lg:text-xl md:w-3/4
                        xl:text-xl"
            >
              Utility-Scale Solar
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              Energize Your Future
            </h3>
    
            {/* Subheading */}
            <div
              className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                        md:text-base
                        lg:text-lg lg:leading-normal md:w-3/4
                        xl:text-xl"
            >
              <p>
                Discover the potential of decentralized energy solutions for a sustainable and prosperous Nigeria.
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
            flex-col px-4 py-8 gap-6
            sm:px-8 sm:py-12 sm:gap-10
            md:px-12 md:py-16 md:gap-12
            xl:flex-row lg:px-20 lg:py-20 lg:gap-8
          `}
          aria-labelledby="electric-mobility-heading"
        >
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
            &apos;Empowering Remote Communities with Decentralized Energy Solutions for a Sustainable Future&apos;
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

            <p className="self-stretch text-base leading-normal sm:text-lg">
              Leveraging SEAP&apos;s GIS platform and satellite datasets (e.g., Global Solar Atlas), we identify optimal sites for utility-scale solar across Nigeria. Criteria include terrain suitability, land use, proximity to grid infrastructure, and irradiation levels—all essential for high-yield solar power plants.
            </p>
            {/* Feature Cards List - Semantically a list of key features */}
            <div className="pt-4 w-full flex flex-col gap-4 items-center leading-normal

                    sm:flex-row sm:justify-between sm:flex-wrap
                    md:justify-start md:gap-4
                    lg:justify-start

                    ">

              {/* Feature Card 1 */}
              <article
                  className={`
                      flex flex-col gap-2 w-full
                      sm:w-[calc(50%-6px)]
                      md:w-72 md:gap-4
                      lg:w-[calc(50%-12px)]
                  `}
              >
                  {/* <Communities className="h-12 w-12" /> */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 mb-2 text-green-accent
                          lg:mb-2 ">
                    <path d={icons.eco} className=""/>
                  </svg>
                  <h3 className="text-lg leading-[1.4] sm:text-xl">
                      Energy Access
                  </h3>
                  <p className="text-base leading-normal font-fira-sans">
                      Transforming lives through sustainable energy solutions tailored for local needs.
                  </p>
              </article>
              {/* Feature Card 2 */}
              <article
                  className={`
                      flex flex-col gap-2 w-full
                      sm:w-[calc(50%-6px)]
                      md:w-72 md:gap-4
                      lg:w-[calc(50%-12px)]
                  `}
              >
                  {/* <Electric_car className="h-12 w-12" /> */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 mb-2 text-green-accent
                          lg:mb-2 ">
                    <path d={icons.intrests} className=""/>
                  </svg>
                  <h3 className="text-lg leading-[1.4] sm:text-xl"> {/* Semantic: Sub-heading for the feature */}
                      Community Impact
                  </h3>
                  <p className="text-base leading-normal font-fira-sans">
                      Driving economic growth and enhancing quality of life in underserved regions.
                  </p>
              </article>
            </div>
            <div className="flex flex-col gap-2 leading-[1.6] mt-6">
          <p className="text-base md:text-lg">
            SEAP&apos;s utility-scale solar program is designed to accelerate Nigeria&apos;s clean energy transition by developing high-capacity solar farms that integrate with national and regional grids. Leveraging the SEAP GIS platform and satellite tools like the Global Solar Atlas, optimal locations are selected based on terrain suitability, irradiation levels, proximity to grid lines, and land-use data. These metrics ensure bankable solar infrastructure with long-term yield viability and environmental resilience.
          </p>
          <div className="text-base md:text-lg" />
            <p>
              According to the Global Solar Atlas, Nigeria receives strong solar radiation across most regions, with global horizontal irradiation (GHI) ranging from 4.5 to 6.0 kWh/m²/day. This allows for both fixed-tilt and solar tracking systems, boosting the performance of utility-scale projects. These irradiation profiles are central to SEAP&apos;s solar yield models and capacity planning.
            </p>
            <div className="text-base md:text-lg" />
            <p>
              SEAP aligns with Nigeria&apos;s national target of achieving 2 GW of utility-scale solar by 2025 and contributing to the broader 30:30:30 energy vision (30% renewable share by 2030). The rollout is structured in phases: Phase 1 (2026-2027) will deploy 100-200MW across 3-5 high-priority sites, while Phase 2 (2028-2030) aims for an additional 300-500 MW, focusing on industrial corridors and economic zones. Prominent benchmarks include the 200 MW Ashama Solar Power Station in Delta State and the 50 MW Abiba Solar Farm in Kaduna, both referenced in national solar development frameworks.
            </p>
            <div className="text-base md:text-lg" />
            <p>
              The financial model assumes a capital cost of approximately $0.8-1.0 million per MW, inclusive of land acquisition, construction, and grid interconnection. Power Purchase Agreement (PPA) tariffs are expected to range between ₦7-10/kWh (around 6-9 US¢/kWh), based on current federal renewable energy procurement trends. Yield expectations per 1 MW system are 1.7-1.9 GWh annually, with a 20-22% capacity factor, delivering consistent returns. Equity investors can expect internal rates of return (IRR) between 12-15%, supported by concessional debt from development finance institutions (DFIs), local banks, and climate finance tools like the Green Climate Fund (GCF).
            </p>
            <div className="text-base md:text-lg" />
            <p>
              With over 73 MW of solar capacity installed in Nigeria as of 2024, the country currently ranks 5th in Africa. However, the policy landscape is becoming increasingly favorable—particularly with NERC's anticipated utility-scale auctions and incentives for private sector-led IPPs. SEAP&apos;s pipeline of investment-ready solar projects is strategically designed to tap into this momentum, helping drive Nigeria&apos;s industrial growth, job creation, and climate action goals.
            </p>
        </div>
          </div>

        </section>

    </main>
  );
}


export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)
export default UtilityScale;