// next, react
import Image from "next/image";
// data local
// componentspecific
import Button from "../../../(common)/commponents/ui/Button";
import ProjectAccordion from "../../../(common)/commponents/specific/ProjectAccordion";
import ProjectRow from "../../../(common)/commponents/specific/ProjectRow";


// meta data
export const metadata = {
  title: "Mining Investment | SEAP Nigeria",
  description:
    "SEAP empowers sustainable mining with hybrid power, digital mapping, and infrastructure that improve efficiency and compliance across mineral-rich LGAs.",
  keywords: [
    "mining Nigeria",
    "sustainable mining Nigeria",
    "SEAP mining projects",
    "energy for mining Nigeria",
    "clean mining investment Nigeria",
  ],
  openGraph: {
    title: "Mining Investment | Sustainable Energy for Nigeria's Resources",
    description:
      "SEAP supports mining with hybrid energy, GIS mapping, and infrastructure that unlock Nigeria's mineral wealth responsibly.",
    url: "https://seap.com.ng/investment-opportunities/mining",
    images: [
      {
        url: "https://seap.com.ng/mining.jpg",
        width: 1200,
        height: 630,
        alt: "Sustainable mining operations powered by SEAP hybrid energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mining Investment | SEAP Nigeria",
    description:
      "Invest in SEAP's mining projects delivering hybrid power and digital tools to Nigeria's mineral-rich LGAs.",
    images: ["https://seap.com.ng/mining.jpg"],
  },
};




const Mining = () => {
  const projectsList =[
    {Milestone:"North-Central",  tdate:"Gold, limestone, lead-zinc"},
    {Milestone:"North-East",  tdate:"Coal, gypsum, kaolin"},
    {Milestone:"North-West",  tdate:"Nickel, chromite, granite"},
    {Milestone:"South-West",  tdate:"Feldspar, tantalite, quartzite"},
    {Milestone:"South-East",  tdate:"Iron ore, clay, marble"},
    {Milestone:"South-South",  tdate:"Bitumen, silica, baryte"}
  ]
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
                src="/images/mining/mining-3.jpg"
                alt="a picture of a mining field with mining vehicles"
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
              Sustainability
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              Mining for Tomorrow
            </h3>
    
            {/* Subheading */}
            <div
              className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                        md:text-base
                        lg:text-lg lg:leading-normal md:w-3/4
                        xl:text-xl"
            >
              <p>
                Unlocking Nigeria&apos;s mineral wealth. SEAP empowers sustainable mining with smart infrastructure and energy-secure solutions.
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
                Powering Nigeria&apos;s Agricultural Value Chains with Smart Infrastructure
              </h2>
              {/* Description Paragraph */}
              <p className="self-stretch text-base leading-normal sm:text-lg">
                SEAP supports sustainable and energy-secure mining by enabling access to hybrid power, digital mapping tools, and sector-focused infrastructure in Nigeria&apos;s mineral-rich LGAs. By bridging operational gaps and improving visibility across the mining landscape, we are helping unlock Nigeria&apos;s vast untapped mineral wealth while promoting regulatory compliance and environmental stewardship.
              </p>
              {/* Feature Cards List - Semantically a list of key features */}
              <div className="pt-4 w-full flex flex-col gap-2 items-center leading-normal
                          sm:flex-row sm:justify-between sm:flex-wrap
                          md:justify-start md:gap-4
                          lg:justify-start
                          ">
              </div>
            </div>

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
                src="/images/mining/mining-1.jpg"
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
            <div className="font-fira-sans flex flex-col gap-2 leading-[1.6] mt-6">
              <p className="text-base md:text-lg">
                Nigeria is home to over 1,000 registered mining operations, ranging from small-scale quarries to medium-sized extractive projects. However, many of these sites face persistent challenges, including unreliable power supply, limited access to clean water, and inefficient logistics, which hinder operational capacity and scale. Meanwhile, more than 80% of Nigeria&apos;s documented mineral deposits remain underexploited. These untapped zones often lack basic infrastructure, deterring both local and foreign investment. Through localized, grid-independent hybrid power systems and modular infrastructure deployment, SEAP seeks to unlock these dormant reserves and transform them into productive, income-generating assets.
              </p>
              <div className="text-base md:text-lg" />
                <h4 className="font-poppins text-xl">Regulatory Guidance</h4>
                <p>
                  SEAP&apos;s mining interventions are developed in alignment with national regulations under the Federal Ministry of Mines and Steel Development. We collaborate closely with state-level Mineral Resources & Environmental Committees (MIREMs) to streamline processes and ensure legal compliance. This includes support for Small-Scale Mining Leases (SSML), Exploration Licenses (EL), and the enforcement of Environmental Impact Assessments (EIAs). We also encourage adherence to Community Development Agreements (CDAs), particularly in areas where mining operations interface with vulnerable populations. SEAP aims to pilot emission and water use standards tailored for hybrid-powered mining sites, and in future phases, will integrate geo-certification protocols using data verification and blockchain-ready records to ensure transparency and traceability.
                </p>
                <div className="text-base md:text-lg" />
                <h4 className="font-poppins text-xl">Investment Opportunities</h4>
                <p>
                  To operationalize the sector&apos;s potential, SEAP offers a series of investable interventions. Hybrid mini-grids—customized for mining applications—will be deployed across 1-3 sites per LGA, with investment requirements ranging between $300,000 and $750,000 and potential returns of 15-20%. Modular ore processing units are also part of the model, designed to match local mineral profiles. These facilities typically require $200,000 to $400,000 in capital input and promise ROIs of 18-22%. To power data-driven exploration and development, SEAP will offer GIS-based mining maps and insights under a regional licensing scheme, enabling developers and exploration firms to make informed decisions. Finally, water treatment systems essential for mineral processing will be introduced in clustered LGAs, with investments between $80,000 and $150,000 and an expected ROI of 12-15%.
                </p>
                <div className="text-base md:text-lg" />
                <p>
                  SEAP&apos;s approach to mining is about more than minerals—it&apos;s about building a cleaner, more resilient foundation for industrialization, community growth, and sustainable resource management.
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
                    <th className="py-[19px] pr-4 font-poppins text-lg md:text-xl leading-[1.4]">Region</th>
                    <th className="py-[19px] pl-4 font-poppins text-lg md:text-xl leading-[1.4] text-right whitespace-nowrap">
                      Mineral
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
              <ProjectAccordion key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} target={"Mineral"}  />
            ))}
          </div>
        </div>
      </div>


    </section>

    </main>
  );
}

export default Mining;