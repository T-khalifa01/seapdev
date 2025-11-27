import ProjectAccordion from "../../../(common)/commponents/specific/ProjectAccordion";
import ProjectRow from "../../../(common)/commponents/specific/ProjectRow";
import Button from "../../../(common)/commponents/ui/Button";
import Image from "next/image";


// meta data
export const metadata = {
  title: "Clean Cooking Solutions | SEAP Projects",
  description:
    "SEAP's clean cooking program replaces firewood and charcoal with biogas and LPCNG, serving 20,000+ households per LGA and improving health nationwide.",
  keywords: [
    "clean cooking Nigeria",
    "biogas Nigeria",
    "LPCNG Nigeria",
    "sustainable cooking solutions",
    "SEAP clean cooking",
    "renewable cooking energy",
    "household clean energy Nigeria",
    "public health energy solutions",
    "clean fuel Nigeria",
    "cooking with biogas",
  ],
  openGraph: {
    title: "Clean Cooking Solutions | SEAP",
    description:
      "SEAP transforms cooking in Nigeria with biogas and LPCNG solutions — reducing emissions, protecting forests, and improving health across all 774 LGAs.",
    url: "https://seap.com.ng/projects/clean-cooking",
    images: [
      {
        url: "https://seap.com.ng/clean-cooking-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP clean cooking with biogas and LPCNG in Nigerian households",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP Clean Cooking Solutions | Biogas & LPCNG for All",
    description:
      "Discover SEAP's clean cooking projects replacing firewood and charcoal with biogas and LPCNG, serving 20,000+ households per LGA nationwide.",
    images: ["https://seap.com.ng/clean-cooking-og.jpg"],
  },
};


const CleanSolutions = () => {
  const projectsList = [
    { Milestone: "Pilot Rollout", tdate: "Q4 2025 - Initial deployment in 3 LGAs (aligned with hybrid power pilot)" },
    { Milestone: "Scale-Up Phase 1", tdate: "Q1-Q3 2026 - Expansion to 100+ LGAs across all geopolitical zones" },
    { Milestone: "National Rollout", tdate: "Q4 2026-2028 - Full-scale implementation across remaining LGAs" },
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
            src="/images/cooking/woman-cooking-1.jpg"
            alt="a woman cooking in a kitchen"
            fill={true}
            sizes="100vw"
            className="object-cover object-center pointer-events-none "
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
          Empowering Nigeria&apos;s Future
        </h1>

        {/* Descriptive Paragraph */}
        <p
          className={`
            z-2 md:text-base
                    lg:text-lg lg:leading-normal md:max-w-2/3
            text-md leading-[1.6] text-whitish-secondary
          `}
        >
          Our mission is to provide sustainable energy solutions for a brighter, cleaner future in Nigeria.
        </p>
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
            Transforming Cooking in Every LGA Through Clean, Scalable Energy Solutions
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
              <p>
                <b>SEAP&apos;s Clean Cooking Solutions</b> tackle the health and environmental hazards of traditional cooking by introducing sustainable alternatives biogas and low-pressure compressed natural gas (LPCNG). With over 100 million Nigerians still cooking with firewood or charcoal, this program offers a safer, cleaner, and scalable path to household and institutional energy access, while unlocking jobs, reducing emissions, and improving public health outcomes nationwide.
              </p>
              <p className="mb-4">
                SEAP targets over 20,000 households per LGA, providing access to clean cooking through decentralized refueling infrastructure, home delivery systems, and community hubs. Both biogas and LPCNG fuel sources are deployed—biogas produced locally from waste and organic matter, and LPCNG sourced through Nigeria&apos;s expanding gas network. The program also equips schools, hospitals, religious centers, and correctional facilities with institutional-scale cooking systems.
              </p>
              <p className="mb-4">
                To make clean energy accessible for all income levels, SEAP uses a Pay-As-You-Cook model—allowing families to pre-pay for only what they use via metered stoves. This model encourages adoption while ensuring sustainability.
              </p>
              <p>
                The initiative includes a major local manufacturing component: durable 6kg, 12.5kg, and 50kg composite steel cylinders will be assembled through joint ventures with Nigerian firms, alongside stove kits and accessories, fostering industrial growth and skills transfer. Each converted household is expected to cut up to 2 tonnes of CO₂e annually, amounting to 30+ million tonnes of emissions avoided per year across the national rollout.
              </p>
            </div>
            <div className="w-full pt-4 md:pt-0">
              {/* Desktop Table like view */}
              <div className="hidden sm:block xl:hidden overflow-x-auto">
                <table className="w-full border-collapse table-auto text-left">
                  <thead>
                    <tr className="border-b border-solid border-black/10">
                      <th className="py-[19px] pr-4 font-poppins text-lg md:text-xl leading-[1.4]">Phase</th>
                      <th className="py-[19px] pl-4 font-poppins text-lg md:text-xl leading-[1.4] text-right whitespace-nowrap">
                        Details
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
                  <ProjectAccordion key={p.Milestone} Milestone={p.Milestone} tdate={p.tdate} target={"Details"}  />
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
                  src="/images/cooking/cooking-sul.jpg"
                  alt="a piture of a pot on a mordern stove"
                  fill={true}
                  sizes="100vw"
                  className="object-cover object-center pointer-events-none "
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
                Help Fuel the Future of Clean Cooking
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Your contribution helps provide safe, low-emission cooking kits to families in need. Join us in ending toxic smoke and energy poverty!
              </p>
              <div className={`z-3 flex`}>
        <Button
          href={'/investment-form'}
          label={"Invest in Nigeria's sustainable cooking future" }
          type={'solid'}
          ariaLabel={'invest-in-clean-cooking-solution'}
        />
      </div>
            </section>
    </main>
  );
}

export default CleanSolutions;