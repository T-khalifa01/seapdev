// components specific
import MetricsCards from "../(common)/commponents/specific/MetricsCards";
import ProjectCard from "../(common)/commponents/specific/ProjectCard";
import BigInvestCard from "../(common)/commponents/specific/BigInvestCard";
import MidInvestCard from "../(common)/commponents/specific/MidInvestCard";
import SmallInvestCard from "../(common)/commponents/specific/SmallInvestCard";
import LgaSec from "../(common)/commponents/specific/LgaSec";
import LogoCarousel from "../(common)/commponents/specific/Logocarousel";
import NewsSec from "../(common)/commponents/specific/NewsSec";
import BgCarousel from "../(common)/commponents/specific/BgCarousel"
// component ui
import Button from "../(common)/commponents/ui/Button";
// data local
import allData from "../(common)/lib/data/webdata.json";



//meta data for SEO
export const metadata = {
  title: {
    default: "SEAP | Clean Energy for Every Community",
    template: "%s | SEAP",
  },
  description:
    "Sustainable Energy Access Project (SEAP) delivers clean, affordable energy and digital access across all 774 LGAs in Nigeria.",
  keywords: [
    "SEAP",
    "sustainable energy",
    "clean energy Nigeria",
    "hybrid solar-gas",
    "digital access",
    "innovation hubs",
    "renewable energy",
    "energy access Nigeria",
    "inclusive infrastructure",
  ],
  metadataBase: new URL("https://seap.com.ng"),
  openGraph: {
    type: "website",
    siteName: "SEAP",
    title: "Powering Nigeria's Future | Sustainable Energy Access Project",
    description:
      "From clean cooking tech to hybrid solar-gas systems, SEAP is transforming all 774 LGAs with inclusive energy, mobility, and digital solutions.",
    url: "https://seap.com.ng",
    images: [
      {
        url: "https://seap.com.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP clean energy initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Powering Nigeria's Sustainable Future | SEAP",
    description:
      "Clean, affordable energy and digital access for every Nigerian community. Discover SEAP's transformative national initiative.",
    images: ["https://seap.com.ng/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};




export default function Home() {

  const {projectsCardData, investBigCardData, investMidCardData, investSmallCardData, news, keymetrics, icons} = allData;
  const investBigCardData1 = investBigCardData[0];
  const investBigCardData2 = investBigCardData[1];

    const images = [
      "/images/mining/mining-3.jpg",
      "/images/projects/agriculture-1.jpg",
      "/images/projects/industrial-infrastructure-4.jpg",
      "/images/projects/solar-1.jpg",
      "/images/seap-team/seap-team-1.jpg",
      "/images/projects/solar-4.jpg",

    ]
  return (
    <main className="pt-12">
      <section
        className="relative flex w-full flex-col justify-end gap-5 px-8 pb-8 leading-[normal]
                  md:gap-6 md:px-10 md:pb-10
                  h-[60vh] md:h-[80vh]"
        aria-labelledby="hero-title"
      >
        <BgCarousel images={images}/>
        <h1
          id="hero-title"
          className="flex text-2xl leading-[1.2] text-whitish-secondary z-3
                    md:text-3xl md:font-semibold
                    lg:text-4xl w-3/4"
        >
          Sustainable Energy Access Projects
        </h1>

        {/* Subheading */}
        <div
          className="flex  text-md leading-[1.6] text-whitish-secondary z-3
                    md:text-base
                    lg:text-lg lg:leading-normal w-4/6"
        >
          <p>
            Delivering clean, affordable energy across Nigeria&apos;s LGAs - powering lives
            through hybrid systems, e-mobility, and clean cooking.
          </p>
        </div>

        {/* CTA Button */}
        <div className="z-3 flex  self-stretch pr-10 pt-[3px] md:pr-0 md:pt-4 md:items-end">
          <Button
            href="/invest-Opportunities"
            label="Explore Investment Opportunities"
            type="solid"
            ariaLabel={`explore seaps investment opportunities `}
            seoLabel={`, invest in Nigerias sustainable Future with SEAP`}
          />
        </div>
      </section>

      <LogoCarousel/>


      <section className="flex w-full flex-col gap-8 px-12  py-4 text-center leading-[normal]
            md:gap-8 md:px-10 md:py-8 md:items-center
            lg:gap-8 lg:px-20 lg:py-8"
            aria-labelledby="key-metrics-title">

        <h2 id="key-metrics-title" className=" text-2xl leading-[1.2]
                    md:text-4xl
                    lg:w-3xl ">
            Key Metrics
        </h2>

        <div className=" flex grow flex-col gap-2 leading-[1.6]
                    sm:gap-x-2 sm:gap-y-8 sm:justify-items-center sm:self-stretch sm:leading-normal
                    md: md:grid  md:gap-x-8 md:gap-y-16 md:justify-items-center md:self-stretch md:leading-normal
                     lg:gap-8 lg:justify-items-center items-center ">

            <MetricsCards cardsData={keymetrics} />

        </div>
      </section>
      {/*lga sec*/}

      <LgaSec />

      {/*lga sec ends */}

      <section className={`flex w-full flex-col items-center justify-center gap-4  px-5 py-4 leading-[normal]
                    sm:px-8 sm:py-8 sm:gap-4
                    md:gap-8 md:px-10 md:py-8
                    lg:gap-8 lg:px-20 lg:py-8`}
                    aria-labelledby="projects-title">

            {/* Section Title */}
            <h2 id="projects-title" className={` flex justify-self-center text-2xl leading-[1.3]
                        md:text-4xl md:w-full
                        lg:w-3xl lg:mx-auto`}>
                Explore Our Current Projects Driving Sustainable Impact Across Nigeria
            </h2>

            {/* Project Cards Container */}
            <div className={` flex grow flex-col gap-4 justify-center items-center
                        md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:justify-items-center md:items-start md:leading-normal
                        lg:gap-x-4 lg:gap-y-4
                        min-[1270px]:flex min-[1270px]:flex-row min-[1270px]:flex-nowrap min-[1270px]:justify-center min-[1270px]:items-start min-[1270px]:gap-4 `}>

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

        <section className={`flex w-full flex-col items-center  gap-4 mt-4 px-5 py-8 leading-[normal]
                    sm:px-8 sm:py-8 sm:gap-2
                    md:px-10 md:py-12 md:gap-4
                    lg:px-20 lg:py-16 lg:gap-4`}
                    aria-labelledby="investment-title">

            <div className="flex flex-col items-center gap-2 md:gap-6 w-full
                            lg:max-w-3xl">
                <h2 id="investment-title" className={`text-center text-2xl leading-[1.2] w-full
                            md:text-4xl`}>
                    Investment Opportunities
                </h2>
                <h3 className={`w-full text-center text-lg leading-normal`}>
                    Unlocking Nigeria&apos;s Clean Energy Future
                </h3>
            </div>

            <div className={`flex flex-col items-center gap-8 self-stretch pt-8 w-full
                             lg:flex-row lg:flex-nowrap lg:justify-center lg:items-start lg:gap-4 lg:pt-14`}>

                <div className={`flex flex-col items-center gap-8 w-full
                                 lg:items-start lg:w-1/2 lg:shrink-0 `}>
                    <BigInvestCard
                        title={investBigCardData1.title}
                        desc1={investBigCardData1.description1}
                        img={investBigCardData1.img}
                        href={'./invest-Opportunities/e-Mobility'}
                        seoLabel={`about our investment Opportunities in e-Mobility`}
                    />

                    <div className={`flex flex-col items-center gap-8 w-full
                                    sm:flex-row sm:flex-nowrap sm:justify-start sm:items-start sm:gap-2
                                    md:flex-row md:flex-wrap md:justify-center md:items-stretch md:gap-4
                                    lg:flex-row lg:flex-nowrap lg:justify-start lg:items-start lg:gap-8`}>
                        {investSmallCardData.map(card => (
                            <SmallInvestCard
                                key={card.id}
                                title={card.title}
                                description={card.description}
                                icon={card.icon}
                                link={card.link}
                                seoLabel={`about our investment Opportunities in  mining`}
                            />
                        ))}
                    </div>
                </div>

                <div className={`flex flex-col items-center gap-8 w-full
                                 lg:items-start lg:w-1/2 lg:shrink-0 `}>
                    <MidInvestCard
                        title={investMidCardData.title}
                        description={investMidCardData.description}
                        img={investMidCardData.img}
                        link={investMidCardData.link}
                        seoLabel={`about our  investment Opportunities in utility-scale solar`}
                    />
                    <BigInvestCard
                        title={investBigCardData2.title}
                        desc1={investBigCardData2.description1}
                        img={investBigCardData2.img}
                        href={'./invest-Opportunities/industrialInfra'}
                        seoLabel={`about our  investment Opportunities in industrail Infrastucture`}
                    />
                </div>
            </div>
        </section>

        <section className={` flex w-full flex-col leading-[normal] bg-grayish-primary
                            px-5 py-6
                            sm:px-8 sm:py-8
                            md:px-10 md:py-12
                            lg:px-20 lg:py-12`}>

            <div className="flex flex-col items-start gap-y-6 w-full
                            sm:items-start
                            md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-0
                            lg:flex-nowrap">

                {/* Text Content Block */}
                <div className="flex flex-col gap-6 self-stretch grow">
                    <h2 className=" text-2xl leading-[1.2]
                                   md:text-3xl">
                        Explore Investment Opportunities Today
                    </h2>
                    <p className="font-fira-sans text-base leading-normal
                                  md:text-lg">
                        Join us in transforming Nigeria&apos;s energy landscape.
                    </p>
                </div>

                {/* Button Container */}
                <div className="flex flex-col items-center pt-1
                                sm:items-start
                                md:flex-row md:items-center md:justify-end">
                    <Button label={'Invest'} href={`/invest-Opportunities`} type={'outlined'}  ariaLabel={'show-investment-oppotunities'} seoLabel={`in Nigerais sustainable future with SEAP`}/>
                </div>
            </div>
        </section>

        <NewsSec/>

    </main>
  );
}
