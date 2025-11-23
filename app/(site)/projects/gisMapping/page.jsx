import Button from "../../../(common)/commponents/ui/Button";
import Image from "next/image";


// meta data
export const metadata = {
  title: "GIS & Satellite Mapping | SEAP Projects",
  description:
    "SEAP's geospatial intelligence platform uses GIS and satellite analytics to plan, track, and optimize clean energy deployment across all 774 LGAs in Nigeria.",
  keywords: [
    "GIS Nigeria energy",
    "geospatial mapping Nigeria",
    "satellite analytics energy",
    "clean energy planning Nigeria",
    "SEAP projects",
    "energy impact tracking",
    "infrastructure monitoring Nigeria",
    "real-time site assessment",
    "geospatial intelligence Nigeria",
  ],
  openGraph: {
    title: "GIS & Satellite Mapping | SEAP",
    description:
      "Through advanced GIS and satellite analytics, SEAP powers smarter, faster, and transparent clean energy deployment across Nigeria's 774 LGAs.",
    url: "https://seap.com.ng/projects/gis-mapping",
    images: [
      {
        url: "https://seap.com.ng/gis-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP GIS platform showing geospatial energy mapping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP GIS & Satellite Mapping | Smarter Energy Access",
    description:
      "Discover how SEAP uses geospatial intelligence to guide planning, site assessments, and real-time impact tracking for nationwide energy projects.",
    images: ["https://seap.com.ng/gis-og.jpg"],
  },
};



const GisMapping = () => {
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
                src="/images/projects/gis-satillite-mapping-1.jpg"
                alt="a woman cooking in a kitchen"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="pointer-events-none"
              />
              <div className="absolute inset-0 z-1 bg-black/50" />
            </div>
            {/* Main Heading */}
            <h1
              id="about-us-heading"
              className={`
                z-2 md:text-3xl md:font-semibold
                        lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
              `}
            >
              Data-Driven Decisions Across 774 LGAs
            </h1>
    
            {/* Descriptive Paragraph */}
            <p
              className={`
                z-2 md:text-base
                        lg:text-lg lg:leading-normal md:max-w-2/3
                text-md leading-[1.6] text-whitish-secondary
              `}
            >
              Discover SEAP&apos;s strategic phased approach to delivering sustainable energy across Nigeria&apos;s local government areas.
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
            Geospatial Intelligence Powering Energy Access Across Nigeria
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
              <p className="text-xl ">
                SEAP integrates cutting-edge Geographic Information Systems (GIS) and satellite analytics to guide infrastructure planning, implementation, and community outreach. This powerful mapping platform supports real-time visualization, impact tracking, and site assessments for energy projects across all 774 LGAs in Nigeria, enabling smarter, faster, and more transparent deployment.
              </p>
              <div className=" flex flex-col gap-6 leading-[1.6] mt-6">
                <p className="text-base md:text-lg">
                  The geospatial system draws from a rich mix of data sources including high-resolution satellite imagery from Sentinel, Landsat, and commercial providers, drone surveys for terrain analysis, and public utility data covering grid lines, transformers, and substations. It also integrates demographic datasets, IoT sensor feeds from SEAP&apos;s energy assets, and administrative data from ALGON and local governments.
                </p>
                <p className="text-base md:text-lg">
                  To monitor progress and performance, SEAP maintains a centralized GIS analytics dashboard that tracks energy access, deployment milestones, and environmental impact. The platform includes live energy overlays, project geotags, CO₂e savings by region, and real-time activity in clean cooking and e-mobility hubs. Sector-specific filters allow users to drill into data for healthcare, telecom, agriculture, and more—giving all stakeholders unprecedented visibility and control.
                </p>
                <p className="text-base md:text-lg">
                  In addition to public applications, SEAP offers commercial data licensing for select GIS layers and analytics products. This includes detailed maps of energy infrastructure, emissions heatmaps, clean fuel distribution data, and e-mobility activity by LGA. Licensing options are tiered: Basic access is open to NGOs and research institutions, Enterprise access includes APIs and offline packs, and Custom licensing offers tailored models for utilities, investors, and infrastructure developers.
                </p>
                <p className="text-base md:text-lg">
                  This geospatial backbone ensures that every SEAP initiative is evidence-based, accountable, and adaptive to local realities.
                </p>
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
                  src="/images/projects/gis-sat-mapping-2.jpg"
                  alt="a piture of a pot on a mordern stove"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="pointer-events-none"
                />
                {/* Overlay for Readability */}
                <div className="absolute inset-0 z-1 bg-black/50" />
              </div>
              <h1
                id="about-us-heading"
                className={`
                  z-2 md:text-3xl md:font-semibold
                          lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
                `}
              >
                Join the SEAP Initiative
              </h1>
      
              {/* Descriptive Paragraph */}
              <p
                className={`
                  z-2 md:text-base
                          lg:text-lg lg:leading-normal md:max-w-2/3
                  text-md leading-[1.6] text-whitish-secondary
                `}
              >
                Express your interest in clean energy solutions for your local government and community.
              </p>
              <div className={`z-3 flex`}>
        <Button
          href={'/investment-form'}
          label={"Invest in Nigeria's sustainable  future" }
          type={'solid'}
          ariaLabel={'invest-in-clean-cooking-solution'}
        />
      </div>
            </section>

    </main>
  );
}

export default GisMapping;