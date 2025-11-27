// next, react
import Image from "next/image";
// data local
import allData from "../../../(common)/lib/data/webdata.json";
import Button from "../../../(common)/commponents/ui/Button.jsx";


// meta data
export const metadata = {
  title: "E-Mobility Investment | SEAP Nigeria",
  description:
    "Invest in SEAP's E-Mobility initiative driving Nigeria's transition to clean transport. Battery-swapping hubs and EV conversions cut emissions and create green jobs.",
  keywords: [
    "E-Mobility Nigeria",
    "electric vehicles Nigeria",
    "SEAP e-mobility",
    "EV investment Nigeria",
    "battery swapping Nigeria",
    "green transport Nigeria",
  ],
  openGraph: {
    title: "E-Mobility Investment | Accelerating Clean Transport in Nigeria",
    description:
      "SEAP's E-Mobility initiative supports electric motorcycles, tricycles, and minibuses with battery-swapping hubs and EV conversions nationwide.",
    url: "https://seap.com.ng/investment-opportunities/e-mobility",
    images: [
      {
        url: "https://seap.com.ng/e-mobility.jpg",
        width: 1200,
        height: 630,
        alt: "Electric motorcycles and tricycles charging at SEAP battery-swapping hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Mobility Investment | SEAP Nigeria",
    description:
      "Invest in SEAP's clean transport initiative driving EV adoption, reducing emissions, and creating jobs across Nigeria.",
    images: ["https://seap.com.ng/e-mobility.jpg"],
  },
};



const EMobility = () => {
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
                src="/images/investments/e-mobility-3.jpg"
                alt="Electric motorcycle riders at a motorcycle station, representing clean mobility and charging infrastructure "
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
              E-Mobility
            </h1>
            {/* Heading */}
            <h3              id="hero-sub-title"
              className="flex text-xl leading-[1.2] text-whitish-secondary z-3
                        md:text-2xl md:font-semibold
                        lg:text-3xl md:w-3/4
                        xl:text-5xl"
            >
              Transforming Transport Today
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
      {/* Left Column: Text Content Block */}
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
          Unlocking the Future: The Benefits of Electric Mobility
        </h2>
        {/* Description Paragraph */}
        <p className="self-stretch text-base leading-normal sm:text-lg">
          SEAPs E-Mobility initiative is accelerating Nigerias transition to clean, electric transportation by targeting high-use commercial vehicles like motorcycles (okadas), tricycles (kekes), and mini-buses. By deploying battery-swapping hubs and supporting EV conversions at scale, we are reducing emissions, lowering transport costs, and creating new green jobs.
        </p>
        {/* Feature Cards List - Semantically a list of key features */}
        <div className="pt-4 w-full flex flex-col gap-2 items-center leading-normal
                      
                      sm:flex-row sm:justify-between sm:flex-wrap
                      md:justify-start md:gap-4
                      lg:justify-start 
                      
                      ">

                {/* Feature Card 1 */}
                <article
                    className={`
                        flex flex-col gap-4 w-full
                        sm:w-[calc(50%-6px)]
                        md:w-72
                        lg:w-[calc(50%-12px)]
                    `}
                >
                    {/* <Communities className="h-12 w-12" /> */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 mb-2
                            lg:mb-2 ">
                      <path d={icons.communities} className="text-green-accent"/>
                    </svg>
                    <h3 className="font-poppins text-lg leading-[1.4] sm:text-xl"> {/* Semantic: Sub-heading for the feature */}
                        Charging Hub Deployment
                    </h3>
                    <p className="text-base leading-normal font-fira-sans">
                        Each LGA will receive Battery Swapping & Charging Hubs.
                    </p>
                </article>
                {/* Feature Card 2 */}
                <article
                    className={`
                        flex flex-col gap-4 w-full
                        sm:w-[calc(50%-6px)]
                        md:w-72
                        lg:w-[calc(50%-12px)]
                    `}
                >
                    {/* <Electric_car className="h-12 w-12" /> */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 mb-2
                            lg:mb-2 ">
                      <path d={icons.electricCar} className="text-green-accent"/>
                    </svg>
                    <h3 className="font-poppins text-lg leading-[1.4] sm:text-xl"> {/* Semantic: Sub-heading for the feature */}
                        EV Conversion Plan
                    </h3>
                    <p className="text-base leading-normal font-fira-sans">
                        SEAP&apos;s approach supports both new EV rollouts and conversion of existing ICE vehicles through certified workshops.
                    </p>
                </article>
        </div>
      </div>

      {/* Right Column: Image */}
      <div
        className={`
          relative w-full rounded-xl overflow-hidden
          aspect-480/512
          h-auto
          md:w-full   md:h-[512px]
          xl:w-[480px] xl:h-[512px] lg:shrink-0
        `}
      >
        <Image
          src="/images/investments/e-mobility-charging-1.jpg"
          alt="Electric motorcycle riders at a battery swapping station, representing clean mobility and charging infrastructure"
          fill={true}
          sizes="(max-width: 1280px) 100vw, 480px"
          className="object-cover object-center"
        />
      </div>
    </section>


    <section
      className={`
        flex w-full flex-col leading-[normal]
        px-4 py-12 gap-6
        sm:px-8 sm:py-6 sm:pb-10
        md:px-12 md:pt-8 md:pb-12
        lg:px-24 lg:pt-8 lg:pb-16
        xl:px-32 xl:pt-10 xl:pb-20
        2xl:px-64 2xl:pb-4 2xl:pt-28
      `}
      aria-labelledby="project-overview-heading"
    >
      <div
        className={`
          w-full mx-auto
          lg:max-w-[616px]
        `}
      >
        {/* Main Heading */}
        <h2
          id="project-overview-heading"
          className={`
            font-poppins text-center leading-[1.2]
            sm:text-left
            text-2xl
            sm:text-3xl
            md:text-4xl
          `}
        >
          Project Overview
        </h2>
        <div className="font-fira-sans flex flex-col gap-6 leading-[1.6] mt-6">
          <p className="text-base md:text-lg">
            SEAP&apos;s E-Mobility initiative is driving Nigeria&apos;s shift toward clean, electric transportation by focusing on the country's most commonly used commercial vehicles—motorcycles (okadas), tricycles (kekes), and mini-buses. Through the rollout of battery-swapping hubs, electric vehicle (EV) conversion support, and smart financing models, SEAP is tackling transport emissions, reducing fuel costs, and creating local green jobs across all LGAs.
          </p>
          <p>
            Nigeria&apos;s informal transport sector is one of Africa&apos;s largest, with over 12 million motorcycles, 4 million tricycles, and 1.5 million mini-buses operating across urban and peri-urban routes. These vehicles account for more than 30% of road transport emissions, making them a strategic starting point for electrification. SEAP targets this high-use segment to enable quick adoption and maximum carbon reduction.
          </p>
          <div className="text-base md:text-lg" />
          <p>
            The initiative supports both the conversion of existing internal combustion engine (ICE) vehicles and the deployment of new EVs through certified hubs across high-density LGAs. These EV conversion hubs will offer battery-swapping stations, technician training, financing support, and certified safety standards in collaboration with road safety and energy regulators. Swappable lithium-ion batteries will be made available via affordable daily or weekly leasing plans, ensuring accessibility for drivers and fleet operators alike.
          </p>
          <div className="text-base md:text-lg" />
          <p>
            Each LGA will also receive strategically located battery charging and swapping hubs powered by hybrid solar-gas systems. These sites will feature digital payment terminals, fleet diagnostics, secure night-parking zones, and battery lockers, enabling round-the-clock service. Pilot zones will deploy 2-3 hubs per LGA initially, with a scale-up plan aiming for 5+ hubs per LGA nationwide by 2028.
          </p>
          <div className="text-base md:text-lg" />
          <p>
            The environmental impact is equally compelling. On average, each converted okada saves 1.1 tonnes of CO₂e annually, while each keke saves around 2.4 tonnes. SEAP's pilot phase aims to convert 50,000 vehicles, resulting in over 100,000 tonnes of avoided emissions per year. Financially, the program delivers strong returns—vehicle owners can break even in under 18 months, saving up to ₦2,000 daily, while fleet investors can expect 15-20% IRR over a 4-year horizon depending on deployment density.
          </p>
          <div className="text-base md:text-lg" />
          <p>
            Through this inclusive and practical approach, SEAP&apos;s E-Mobility platform is not just reshaping transport—but powering economic opportunity and climate resilience across Nigeria.
          </p>
        </div>
      </div>
    </section>



    </main>
  );
}

export default EMobility;