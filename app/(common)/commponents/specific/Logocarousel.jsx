"use client";

import Image from "next/image";

const LogoCarousel = () => {
  return (
    <section className="relative w-full py-16 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Heading always on top */}
        <h2 className="text-2xl md:text-4xl  text-center whitespace-nowrap">
          Our Partners
        </h2>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          {/* fade edges */}
          <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

          <div className="carousel-track flex gap-12 md:gap-20 items-center">
            {/* duplicated content for infinite scroll */}
            <div className="flex gap-12 md:gap-20 items-center ml-12 md:ml-20">
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/algon-horizontal-logo.svg" alt="Algon" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/CCK-Logo.svg" alt="CCK" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/DAS-Logo.svg" alt="DAS" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/seap-new-full-logo.svg" alt="SEAP" fill className="object-contain"/>
              </div>
            </div>
            <div className="flex gap-12 md:gap-20 items-center">
              <div className="flex gap-12 md:gap-20 items-center ml-12 md:ml-20">
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/algon-horizontal-logo.svg" alt="Algon" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/CCK-Logo.svg" alt="CCK" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/DAS-Logo.svg" alt="DAS" fill className="object-contain" />
              </div>
              <div className="relative h-12 w-32 md:h-16 md:w-44 shrink-0">
                <Image src="/images/seap-new-full-logo.svg" alt="SEAP" fill className="object-contain"/>
              </div>
            </div>
              {/* <Image src="/images/algon-horizontal-logo.svg" alt="Algon" width={180} height={64} priority={true} className="h-12 w-auto md:h-16" />
              <Image src="/images/CCK-Logo.svg" alt="CCK" width={120} height={64} priority={true} className="h-12 w-auto md:h-16" />
              <Image src="/images/DAS-Logo.svg" alt="DAS" width={130} height={64} priority={true} className="h-12 w-auto md:h-16" />
              <Image src="/images/seap-new-full-logo.svg" alt="SEAP" width={180} height={64} priority={true} className="h-12 w-auto md:h-16" /> */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-track {
          width: max-content;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Adjust speed by screen size */
        @media (max-width: 768px) {
          .carousel-track {
            animation-duration: 30s; /* slower on mobile */
          }
        }
        @media (min-width: 1024px) {
          .carousel-track {
            animation-duration: 15s; /* faster on desktop */
          }
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel;
