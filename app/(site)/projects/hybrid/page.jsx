import Image from "next/image";
import ProjectAccordion from "../../../(common)/commponents/specific/ProjectAccordion";
import ProjectRow from "../../../(common)/commponents/specific/ProjectRow";
import Button from "../../../(common)/commponents/ui/Button";



// meta data
export const metadata = {
  title: "Hybrid Solar-Gas Power Systems | SEAP Projects",
  description:
    "SEAP's hybrid solar-gas systems deliver 5MW scalable power for agriculture, mining, telecom, healthcare, and SMEs across Nigeria's 774 LGAs.",
  keywords: [
    "hybrid solar gas Nigeria",
    "solar mini-grid Nigeria",
    "clean energy infrastructure",
    "SEAP projects",
    "renewable energy Nigeria",
    "energy for agriculture",
    "telecom power Nigeria",
    "SME electricity solutions",
    "solar PV + gas Nigeria",
  ],
  openGraph: {
    title: "Hybrid Solar-Gas Power Systems | SEAP",
    description:
      "SEAP deploys up to 5MW hybrid solar-gas systems to power Nigeria's agriculture, mining, telecom, healthcare, and SMEs—scaling clean energy nationwide.",
    url: "https://seap.com.ng/projects/hybrid-solar-gas",
    images: [
      {
        url: "https://seap.com.ng/hybrid-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP hybrid solar-gas mini-grid powering agriculture and SMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP Hybrid Solar-Gas Systems | Scalable Clean Energy",
    description:
      "Reliable 5MW hybrid solar-gas systems powering agriculture, telecom, healthcare, and SMEs across Nigeria's 774 LGAs.",
    images: ["https://seap.com.ng/hybrid-og.jpg"],
  },
};



const Hybrid = () => {
  const projectData = [
    { Milestone: 'LGA Selection & Site Assessments', tdate: 'Q1 2025' },
    { Milestone: 'Engineering, Procurement & Construction (EPC) Contracting', tdate: 'Q2 2025' },
    { Milestone: 'Construction Start (Pilot Sites)', tdate: 'Jul 2025' },
    { Milestone: 'Commissioning & Testing', tdate: 'Oct-Dec 2025' },
    { Milestone: 'Pilot Operation & Performance Monitoring', tdate: 'Q4 2025 - Q1 2026' },
  ];

  return (
    <main className="pt-12">

      <section
            className={`
              relative flex w-full flex-col items-start justify-end gap-2 md:gap-6 leading-[normal] text-white overflow-hidden h-[50vh] md:h-[70vh]
              md:px-12 md:py-12 px-4 py-4
      
            `}
            aria-labelledby="about-us-heading"
          >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/projects/industrial-infrastructure-4.jpg"
                  alt="two engineers coordinating operations"
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
                  z-2 md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Hybrid Solar & Gas Power
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Transforming energy access and empowering communities through sustainable solutions in Nigeria.
              </p>
            </section>

    <section
      className={`
        font-fira-sans flex w-full flex-col leading-[normal]
        px-4 py-16 gap-8
        sm:px-8 sm:py-10 sm:gap-10
        md:px-12 md:py-16 md:gap-12
        lg:px-16 lg:py-16 lg:gap-16
      `}
      aria-labelledby="hybrid-power-main-heading"
    >
      {/* Main Container: Handles the side-by-side (LG+) vs. stacked (MD-) layout of Section 1 and Section 2 */}
      <div
        className={`
          flex w-full
          flex-col items-start
          gap-8
          sm:gap-8
          md:gap-8
          lg:flex-row lg:justify-between lg:items-start lg:gap-16
          min-[1270px]:flex-row min-[1270px]:justify-between min-[1270px]:gap-x-20
        `}
      >
        {/* Section 1 (Left Column): Title, Description, and Tags */}
        <div
          className={`
            flex flex-col w-full gap-6
            items-start text-left
            max-w-xl
            mx-auto

            sm:max-w-2xl sm:gap-8
            md:max-w-3xl md:mx-0
            lg:max-w-4xl lg:gap-10
            
          `}
        >
          {/* Title and Description Sub-section */}
          <div className={`flex flex-col gap-4 w-full items-start text-left`}>
            <h2
              id="hybrid-power-main-heading"
              className={`
                font-poppins leading-[1.2]
                text-4xl
                sm:text-5xl
                md:text-[52px]
                lg:text-[56px]
                min-[1270px]:text-[56px]
              `}
            >
              Hybrid Solar & Gas Power
            </h2>
            <p className={`text-base leading-[1.6] md:text-lg`}>
              Transforming energy access and empowering communities through sustainable solutions in Nigeria.
            </p>
          </div>

          {/* Tags List */}
          <div className={`w-full`}>
            <ul
              className={`
                flex flex-wrap gap-2 text-sm font-semibold leading-[1.6]
                justify-center
                md:justify-start
              `}
              aria-label="Project Tags"
            >
              <li className={`flex items-center justify-center rounded-[100px] bg-black/5 px-[9px] py-[3px]`}>
                Energy Innovation
              </li>
              <li className={`flex items-center justify-center rounded-[100px] bg-black/5 px-[9px] py-[3px]`}>
                Clean Power
              </li>
              <li className={`flex items-center justify-center rounded-[100px] bg-black/5 px-[9px] py-[3px]`}>
                Community Impact
              </li>
            </ul>
          </div>
        </div>

        <div

          className="flex flex-col w-full text-left gap-6
                    md:flex-row md:gap-2
                    lg:flex-col lg:gap-12 lg:pt-8"
        >
          {/* Left Column of Section 2's content (your 'sec1') */}
          <div className="flex  justify-between gap-4
                          md:gap-4 lg:gap-8 ">
            <article className={`
                      flex flex-col gap-2 w-full
                      
                  `}>{/*sm:w-[calc(50%-6px)]
                      md:w-72 md:gap-4
                      lg:w-[calc(50%-12px)]*/}
                    <h3 className="text-lg leading-[1.4] sm:text-xl">
                      Locations
                  </h3>
                  <p className="text-base leading-normal ">
                      Kano, Imo, and Cross River States
                  </p>
            </article>
            <article className={`
                      flex flex-col gap-2 w-full
                      
                  `}>{/*sm:w-[calc(50%-6px)]
                      md:w-72 md:gap-4
                      lg:w-[calc(50%-12px)]*/}
                    <h3 className="text-lg leading-[1.4] sm:text-xl">
                      Project Milestone
                  </h3>
                  <p className="text-base leading-normal ">
                      Q3-Q4 2025
                  </p>
            </article>
          </div>
          <div className=" flex flex-col justify-end border-b-2 py-1 sm:hidden"/>

          {/* Right Column of Section 2's content (your 'sec2') */}
          <div className="flex  justify-between gap-4
                          md:gap-4 lg:gap-8 ">
            <article className={`
                      flex flex-col gap-2 w-full
                      
                  `}>
                    <h3 className="text-lg leading-[1.4] sm:text-xl">
                      Capacity Split
                  </h3>
                  <p className="text-base leading-normal">
                      3 MW solar + 2 MW gas at each pilot site
                  </p>
            </article>
            <article className={`
                      flex flex-col gap-2 w-full
                      
                  `}>
                    <h3 className="text-lg leading-[1.4] sm:text-xl">
                      Est. Annual Output
                  </h3>
                  <p className="text-base leading-normal ">
                      Q3-Q4 2025
                  </p>
            </article>
          </div>
        </div>
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
            Hybrid Solar-Gas Power Systems: Scalable Infrastructure for Nigeria&apos;s Clean Energy Future
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

              <p className={`mb-3 `}>
                Our hybrid systems are tailored to meet the energy needs of high-impact sectors across Nigeria:
              </p>

              <ul className={`list-disc pl-6 space-y-2`}>
                <li>
                  <b>Agri-centers</b>: Supporting irrigation systems, crop processing units, cold-chain logistics, and food storage.
                </li>
                <li>
                  <b>Mining</b>: Powering drilling, water pumping, ore sorting, and lighting in remote extractive operations.
                </li>
                <li>
                  <b>Telecom Infrastructure</b>: Enabling uninterrupted mobile and broadband connectivity in rural zones.
                </li>
                <li>
                  <b>Healthcare & Education</b>: Delivering reliable power for diagnostic machines, vaccine refrigeration, and digital classrooms.
                </li>
                <li>
                  <b>SMEs & Market Clusters</b>: Empowering artisans, traders, and micro-enterprises with dependable electricity.
                </li>
              </ul>

              <p className="mb-4 mt-6">
                The <b>Sustainable Energy Access Projects (SEAP)</b> aim to deploy up to 5-MW of hybrid solar and gas power in each of Nigeria&apos;s 774 LGAs. Each system is designed to deliver 30-40 GWh of electricity annually, supporting critical infrastructure such as schools, health centers, SMEs, and agro-processing hubs. The pilot phase will launch in Kano, Imo, and Cross River States in Q3-Q4 2025, with each site hosting a 3 MW solar PV array paired with a 2 MW gas generator, totaling 15 MW installed capacity and an estimated 75 GWh output annually.
              </p>
              {/* The h-[26px] divs were for spacing, replaced by mb-4 on paragraphs*/}
              <p className="mb-4">
                The infrastructure is configured for off-grid deployment with the ability to interface with the national grid where viable. The solar-to-gas ratio of 60:40 allows for flexible energy delivery based on seasonal shifts and local demand profiles. These systems are capable of exporting surplus power to the grid, enhancing local resilience while contributing to national stability.
              </p>
              <p>
                Beyond energy access, the environmental impact is significant. Each LGA installation is projected to avoid approximately 15,000 tonnes of CO₂e per year, translating to ~45,000 tonnes for the pilot phase. The project targets a blended tariff of ₦40-₦45/kWh, making it cost-competitive with diesel-based alternatives. Financing is structured through a blended model, combining public-private partnerships, development finance institutions (DFIs), and climate infrastructure funds to ensure long-term sustainability and scalability.
              </p>
            </div>
            <div className="w-full pt-4 md:pt-0">
              {/* Desktop Table like view */}
              <div className="hidden sm:block xl:hidden overflow-x-auto">
                <table className="w-full border-collapse table-auto text-left">
                  <thead>
                    <tr className="border-b border-solid border-black/10">
                      <th className="py-[19px] pr-4 font-poppins text-lg md:text-xl leading-[1.4]">Milestone</th>
                      <th className="py-[19px] pl-4 font-poppins text-lg md:text-xl leading-[1.4] text-right whitespace-nowrap">
                        Target Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.map((p) => (
                      <ProjectRow key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Accordion (below lg) */}
              <div className="sm:hidden xl:block">
                {projectData.map((p) => (
                  <ProjectAccordion key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} target={"Target Date"}  />
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
                  src="/images/projects/agriculture-3.jpg"
                  alt="a picture of a small green house with a female farmer working"
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
                  z-2 md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Invest in a Sustainable Future
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Contact us today to explore investment opportunities and make a difference in Nigeria&apos;s energy landscape.
              </p>
              <div className={`z-3 flex`}>
        <Button
          href={'/investment-form'}
          label={"Invest in Nigeria's sustainable future" }
          type={'solid'}
          ariaLabel={'invest-in-clean-cooking-solution'}
        />
      </div>
            </section>




    </main>
  );
}

export default Hybrid;