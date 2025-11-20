import Image from "next/image";
// import Link from "next/link";

//comp specific
import BigAboutCard from "../../(common)/commponents/specific/BigAboutCard";
import PartnersCard from "../../(common)/commponents/specific/PartnersCard";
// import BgCarousel from"../(common)/commponents/specific/BgCarousel"

// mata data for seo
export const metadata = {
  title: "About SEAP",
  description:
    "Discover SEAP's mission to empower Nigerian communities with clean, affordable, and reliable energy. Learn how we serve all 774 LGAs through innovation and partnerships.",
  keywords: [
    "SEAP",
    "about SEAP",
    "sustainable energy Nigeria",
    "clean energy",
    "hybrid solar-gas",
    "digital access",
    "inclusive infrastructure",
    "energy access",
    "community empowerment",
    "Nigeria development",
    "SEAP in Partnership with ALGON",
    "SEAP in Partnership with CCK Electric Power Technology (CCkEP) ",
    "SEAP in Partnership with Data Analytics & Solutions"
  ],
  openGraph: {
    title: "About SEAP | Sustainable Energy Access Project",
    description:
      "The Sustainable Energy Access Project (SEAP) bridges Nigeria's energy gap with scalable clean technologies, innovation hubs, and strong partnerships across all 774 LGAs.",
    url: "https://seap.com.ng/about",
    images: [
      {
        url: "https://seap.com.ng/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "SEAP team delivering sustainable energy in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SEAP | Transforming Energy Access in Nigeria",
    description:
      "Learn how SEAP empowers underserved communities with clean, affordable energy and digital solutions nationwide.",
    images: ["https://seap.com.ng/about-og.jpg"],
  },
};



const Page = () => {
  const images = [
    "/images/seap-team/seap-team-1.jpg",
   "/images/seap-team/seap-team-3.jpg",
   "/images/seap-team/seap-team-4.jpg",
   "/images/seap-team/seap-team-5.jpg",
  ]
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
            src="/images/seap-team/seap-team-1.jpg"
            alt="seap-team-in-a-meating"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="pointer-events-none"
          />
          {/* Overlay for Readability */}
          <div className="absolute inset-0 z-1 bg-black/50" />
        </div>


        {/* Main Heading */}
        <h1
          id="about-us-heading"
          className={`
            z-[2] md:text-3xl md:font-semibold
                    lg:text-4xl text-2xl leading-[1.2] text-whitish-secondary
          `}
        >
          Empowering Nigeria's Future
        </h1>

        {/* Descriptive Paragraph */}
        <p
          className={`
            z-[2] md:text-base
                    lg:text-lg lg:leading-normal md:max-w-2/3
            text-md leading-[1.6] text-whitish-secondary
          `}
        >
          Our mission is to provide sustainable energy solutions for a brighter, cleaner future in Nigeria.
        </p>
      </section>

      <section
      className={`
        flex w-full flex-col leading-[normal]
        px-5 py-10
        sm:px-8 sm:py-12
        md:px-10 md:py-16
        lg:px-20 lg:py-20
      `}
    >
      <div className="mb-4 sm:mb-8 md:mb-12">
        <BigAboutCard
          sec={`Who we are`}
          title={`Sustainable Energy Access Project`}
          desc={`The Sustainable Energy Access Projects (SEAP) is a transformative national initiative focused on bridging Nigeria's energy access gap through a scalable and inclusive approach. Our program is designed to deliver sustainable infrastructure ranging from hybrid solar-gas power systems to clean cooking technologies and digital innovation hubs—across all 774 Local Government Areas (LGAs). By integrating energy, mobility, and digital access, SEAP redefines how underserved communities connect to power, opportunity, and progress.`}
          imgSrc={`/images/seap-team/seap-team-3.jpg`}
        />
      </div>

      <div className="mb-4 sm:mb-8 md:mb-12">
        <BigAboutCard
          sec={`Our Mission & Vision`}
          title={`Our mission is to empower every community in Nigeria with clean, affordable, and reliable energy solutions that uplift lives and accelerate economic development.`}
          desc={`We envision a Nigeria where no community is left behind where energy access drives entrepreneurship, education, health, and connectivity. Through innovative partnerships and sustainable technology deployment, SEAP is committed to building a low-carbon, resilient future that works for everyone.`}
          imgSrc={`/images/seap-team/seap-team-5.jpg`}
          imageOnLeft={true}
        />
      </div>

      <div className="mb-4 sm:mb-8 md:mb-12">
        <BigAboutCard
          sec={`Who We Serve`}
          title={`At SEAP We Serve Everyone`}
          desc={`SEAP serves every Nigerian, with a primary focus on the millions of people living in underserved and energy-poor regions. From rural households and small business owners to local schools, hospitals, and transport providers, our beneficiaries span all walks of life.
          We partner with local governments, community-based organizations, and the private sector to ensure that each LGA receives tailored solutions that address its unique energy and development challenges—empowering communities to thrive through equitable energy access.`}
          imgSrc={`/images/seap-team/seap-team-4.jpg`}
        />
      </div>
    </section>

    <section
      className={`
        flex w-full flex-col gap-12 leading-[normal]
        min-h-[600px]
        px-5 py-10
        sm:px-8 sm:py-12 sm:gap-12
        md:px-10 md:py-16 md:gap-16
        lg:px-20 lg:py-20
      `}
      aria-labelledby="partners-heading"
    >
      <div
        className={`
          flex flex-col items-center gap-8
          w-full
          sm:gap-12
          md:gap-16
        `}
      >
        <div
          className={`
            flex flex-col items-center text-center gap-4
            w-full
            max-w-prose
            sm:max-w-[800px]
            md:max-w-[900px]
            lg:max-w-[1000px]
          `}
        >
          {/* <p className={`font-semibold leading-normal text-sm md:text-base`}>Tagline</p> */}
          <div className={`flex flex-col items-center gap-8 self-stretch`}>
            <div className={`flex flex-col gap-6 self-stretch`}>
              <h2 id="partners-heading" className={`font-poppins leading-[1.2]
                                                  text-3xl sm:text-4xl md:text-5xl`}>
                Our Partners
              </h2>
              <p className={`text-sm font-fira-sans sm:text-base md:text-lg leading-[1.6]`}>
                SEAP is powered by a strong coalition of strategic partners, each bringing deep expertise, local insight, and technical leadership to ensure seamless project delivery across all 774 LGAs. Together, we work to turn bold vision into measurable impact—on the ground and at scale.
              </p>
            </div>

          </div>
        </div>


        <div
          className={`
            flex flex-col items-center gap-12
            w-full
            lg:flex-row lg:flex-wrap lg:justify-start lg:items-start lg:gap-x-20 lg:gap-y-16
          `}
        >
          {/* Card 1 (ALGON) */}
          <div
            className={`
              flex flex-col items-center leading-[1.6]
              w-full max-w-lg
              sm:max-w-[600px] sm:mx-auto
              md:max-w-[700px] md:mx-auto
              lg:w-[calc(50%-theme('spacing.10'))] lg:flex-shrink-0 lg:items-start lg:mx-0
            `}
          >
            <PartnersCard
              pic={`/images/ALGON-Logo.png`}
              alt={`ALGON Logo`}
              partner={`ALGON`}
              fullName={`Association of Local Governments of Nigeria`}
              desc={`ALGON serves as SEAP's gateway to the communities we serve. As our social license partner, ALGON facilitates direct engagement with Local Government Areas, providing access to land, strengthening local partnerships, and ensuring community trust and inclusion at every stage of the project. Their grassroots connection is vital for building long-term impact where it matters most.`}
              // styles={`h-52 w-72
              //          sm:h-92 sm:w-128
              //          md:h-92 md:w-128
              //          lg:h-71 lg:w-96
              //          xl:h-95 xl:w-128`}
              styles={`h-40 w-80
                       sm:h-64 sm:w-128
                       md:h-64 md:w-128
                       lg:h-48 lg:w-96
                       xl:h-64 xl:w-128`}
            />
          </div>

          {/* Card 2 (DAS) */}
          <div
            className={`
              flex flex-col items-center leading-[1.6]
              w-full max-w-lg
              sm:max-w-[600px] sm:mx-auto
              md:max-w-[700px] md:mx-auto
              lg:w-[calc(50%-theme('spacing.10'))] lg:flex-shrink-0 lg:items-start lg:mx-0
            `}
          >
            <PartnersCard
              pic={`/images/DAS-Logo.png`}
              alt={`DAS Logo`}
              partner={`DAS`}
              fullName={`Data Analytics & Solutions`}
              desc={`DAS acts as the project developer and Special Purpose Vehicle (SPV) manager for SEAP. The firm leads in data driven project design, performance analytics, and financial structuring, ensuring that each site is viable, scalable, and sustainable. With DAS at the helm of planning and execution, SEAP delivers smart infrastructure solutions built on evidence and efficiency.`}
              styles={`h-40 w-80
                       sm:h-64 sm:w-128
                       md:h-64 md:w-128
                       lg:h-48 lg:w-96
                       xl:h-64 xl:w-128`}
            />
          </div>

          {/* Card 3 (CCK) */}
          <div
            className={`
              flex flex-col items-center leading-[1.6]
              w-full max-w-lg
              sm:max-w-[600px] sm:mx-auto
              md:max-w-[700px] md:mx-auto
              lg:w-[calc(50%-theme('spacing.10'))] lg:flex-shrink-0 lg:items-start lg:mx-0
            `}
          >
            <PartnersCard
              pic={`/images/CCK-Logo.png`}
              alt={`CCK Electric Power Technology (CCKEP) Logo`}
              partner={`CCK Electric`}
              fullName={`CCK Electric Power Technology`}
              desc={`As the Engineering, Procurement, and Construction (EPC) lead, CKCEP oversees the physical rollout of SEAP's hybrid energy systems, e-mobility infrastructure, and clean cooking solutions. Beyond construction and operations & maintenance (O&M), CKCEP is also driving technology transfer—building local capacity and embedding knowledge within Nigeria's growing renewable energy ecosystem.`}
              // styles={`h-40 w-64
              //          sm:h-80 sm:w-128
              //          md:h-80 md:w-128
              //          lg:h-55 lg:w-88
              //          xl:h-55 xl:w-88`}
              styles={`h-40 w-80
                       sm:h-64 sm:w-128
                       md:h-64 md:w-128
                       lg:h-48 lg:w-96
                       xl:h-64 xl:w-128`}
            />
          </div>
        </div>
      </div>
    </section>


    </main>
  );
}

export default Page;