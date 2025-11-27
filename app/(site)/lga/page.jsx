import Image from 'next/image';
import allData from '../../(common)/lib/data/webdata.json'
import LgaInvstCards from '../../(common)/commponents/specific/LgaInvstCards';
import LgaSec from '../../(common)/commponents/specific/LgaSec';
import Button from '../../(common)/commponents/ui/Button';



// meta data
export const metadata = {
  title: "Explore LGAs | SEAP Energy & Investment Opportunities",
  description:
    "Explore SEAP's interactive map of Nigeria's 774 LGAs. Discover local energy projects, community data, and tailored investment opportunities.",
  keywords: [
    "Nigeria LGAs energy projects",
    "SEAP LGA map",
    "investment opportunities Nigeria",
    "clean energy by LGA",
    "energy access map Nigeria",
    "state and LGA energy data",
    "SEAP investment projects",
    "sustainable energy Nigeria",
  ],
  openGraph: {
    title: "SEAP LGA Map | Energy Projects & Local Investments",
    description:
      "Select an LGA to view SEAP's sustainable energy projects, local community data, and investment opportunities across Nigeria.",
    url: "https://seap.com.ng/lga",
    images: [
      {
        url: "https://seap.com.ng/lga-og.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive map of Nigeria showing SEAP energy projects by LGA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAP LGA Map | Projects & Opportunities",
    description:
      "Discover SEAP's projects and investment opportunities in every LGA. Explore Nigeria's clean energy future with our interactive map.",
    images: ["https://seap.com.ng/lga-og.jpg"],
  },
};




const page = () => {
  const {lgaPageCards} = allData;

  return (
    <main className="pt-12">
            <section
                        className={`
                          relative flex w-full flex-col items-start justify-end gap-2 md:gap-6 leading-[normal] text-white overflow-hidden h-[50vh] md:h-[70vh]
                          md:px-12 md:py-12 px-4 py-4

                        `}
                        aria-labelledby="about-us-heading"
                      >
                          <div className="absolute inset-0 z-0">
                            <Image
                              src="/images/mining-2.jpg"
                              alt="Abstract background representing sustainable energy"
                              fill={true}
                              sizes="100vw"
                              className="object-cover object-center pointer-events-none"
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
                            Empower Nigeria&apos;s Future
                          </h1>

                          {/* Descriptive Paragraph */}
                          <p
                            className={`
                              z-2 md:text-base
                                      lg:text-lg lg:leading-normal md:max-w-2/3
                              text-md leading-[1.6] text-whitish-secondary
                            `}
                          >
                            Discover how SEAP is transforming lives through sustainable energy projects across Nigeria&apos;s diverse communities.
                          </p>
                        </section>

            <section className="self-stretch px-4 sm:px-16 py-16 sm:py-28 bg-Color-Scheme-1-Background flex flex-col justify-center items-center overflow-hidden">
              <div className="w-full max-w-7xl flex flex-col justify-center items-center gap-4 sm:gap-8">
                <h2 className="text-center sm:text-left self-start w-full max-w-3xl text-4xl font-normal leading-12 sm:leading-[52px] tracking-tight font-font-poppins">
                  Explore Key Investment Areas for Sustainable Energy in Nigeria
                </h2>

                <div className="self-stretch grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:px-12">
  {lgaPageCards.map(area => (
    <LgaInvstCards
      key={area.id}
      title={area.title}
      description={area.description}
      iconSrc={area.iconSrc}
      iconAlt={area.iconAlt}
      linkHref={area.linkHref}
      linkLabel={area.linkLabel}
    />
  ))}
</div>
              </div>
            </section>

            <LgaSec/>

            <section className="bg-whitish-secondary px-4 py-8 sm:px-16 sm:py-16 flex justify-center items-center overflow-hidden">
  <div className="w-full max-w-7xl">
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-10 sm:gap-12">
      
      {/* Text and button content */}
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="flex flex-col gap-4">
          {/* Semantic H2 heading for the section */}
          <h2 className="text-xl sm:text-xl md:text-2xl lg:text-4xl font-normal leading-snug">
            Invest in a Sustainable Future
          </h2>
          {/* Descriptive paragraph */}
          <p className="text-sm sm:text-base md:text-lg font-normal max-w-lg">
            Contact us today to explore investment opportunities and make a
            difference in Nigeria&apos;s energy landscape.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="inline-flex justify-center sm:justify-start">
          <Button
            label={"Invest"}
            seoLabel={'Invest in a Sustainable Future'}
            href={"/investment-form"}
            type={"outlined"}
            ariaLabel={"button-to-investment-form"}
            
          />
        </div>
      </div>

      {/* Image content */}
      <div className="flex-1 w-full sm:w-auto h-[50vh] max-h-[400px] relative rounded-[30px] overflow-hidden">
        <Image
          src="/images/projects/industrial-infrastructure-4.jpg"
          alt="A visual representation of sustainable energy projects, showing a mix of green landscapes and clean technology."
          fill={true}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="rounded-[30px] object-cover object-center"
        />
      </div>
    </div>
  </div>
</section>




    </main>
  );
}

export default page;