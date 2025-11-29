import Image from 'next/image';
import { getWebData } from '../../(common)/lib/getWebData';
// import allData from "../../(common)/lib/data/webdata.json";
import InvestmentForm from '../../(common)/commponents/specific/InvestmentForm';


export const metadata = {
  title: "Invest with SEAP | Sustainable Energy Access Project Nigeria",
  description:
    "Explore investment opportunities in Nigeria's clean energy sector with SEAP. Learn how you can contribute to a sustainable future.",
  keywords: [
    "invest with SEAP",
    "SEAP Nigeria investment",
    "clean energy investment Nigeria",
    "sustainable energy access project",
    "renewable energy investment",
  ],
  openGraph: {
    title: "Invest with SEAP | Sustainable Energy Access Project",
    description: "Partner with us to fund and develop clean energy solutions across Nigeria.",
    url: "https://seap.com.ng/invest",
    images: [
      {
        url: "https://seap.com.ng/invest-og.jpg",
        width: 1200,
        height: 630,
        alt: "Invest in Nigeria's clean energy infrastructure with SEAP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest with SEAP | Sustainable Energy Access Project Nigeria",
    description: "Discover how your investment can power a brighter, cleaner future for Nigeria with SEAP.",
    images: ["https://seap.com.ng/invest-og.jpg"],
  },
};

export default async function InvestmentPage() {
  const allData = await getWebData();
  const { icons } = allData;
  return (
    <div className="flex flex-col items-center min-h-screen pt-12">
      <header className="self-stretch px-4 py-12 md:px-16 md:py-28 relative flex flex-col justify-center items-center gap-12 md:gap-20 overflow-hidden">
        <Image
          src={'/images/investments/e-mobility-charging-1.jpg'}
          alt="Background image of clean energy infrastructure"
          fill
          sizes="100vw"
          className="object-cover object-center absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-1"></div>
        <div className="relative w-full max-w-7xl flex flex-col justify-start items-center gap-12 md:gap-20 z-3">
          <div className="w-full max-w-3xl flex flex-col justify-start items-center gap-8">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="inline-flex justify-start items-center">
                <p className="text-center justify-start text-white text-base font-semibold leading-normal">Invest in Nigeria&apos;s Future</p>
              </div>
              <div className="self-stretch flex flex-col justify-start items-center gap-6">
                <h1 className="self-stretch text-center justify-start text-white text-4xl md:text-6xl font-normal leading-tight md:leading-[67.20px]">Invest in a Brighter, Greener Future with SEAP</h1>
                <p className="self-stretch text-center justify-start text-white text-base md:text-lg font-normal leading-relaxed">Whether you are an individual, organization, or international partner, your investment is a crucial step towards a sustainable future. The SEAP team is dedicated to supporting your ventures in clean energy across all 774 LGAs, driving economic growth and environmental change.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <InvestmentForm />

      <footer className="w-full max-w-2xl md:max-w-4xl p-8 text-gray-600 mb-12">
        <ul className="flex flex-col md:flex-row justify-center items-center text-center space-y-8 md:space-y-0 md:space-x-12">
          <li className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
              <path d={icons.location}/>
            </svg>
            <div>
              <p className="font-semibold">Our Address</p>
              <p>No4 Boke Street, Wuse 2, Abuja</p>
            </div>
          </li>
          <li className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
              <path d={icons.call}/>
            </svg>
            <div>
              <p className="font-semibold">Phone</p>
              <p>+234 (0) 123 456 7890</p>
            </div>
          </li>
          <li className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
              <path d={icons.email}/>
            </svg>
            <div>
              <p className="font-semibold font-poppins">Email</p>
              <p>contact@seap.ng</p>
            </div>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)