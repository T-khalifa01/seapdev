// src/app/contact/page.jsx (or wherever it's located)
import Image from 'next/image';
import allData from "../../(common)/lib/data/webdata.json";
import ContactForm from '../../(common)/commponents/specific/ContactForm';

// meta data (This is now a Server Component and can export metadata)
export const metadata = {
  title: "Contact SEAP | Sustainable Energy Access Project Nigeria",
  description:
    "Get in touch with SEAP for inquiries, partnerships, or support. Contact us to learn more about Nigeria's clean energy transformation.",
  keywords: [
    "contact SEAP",
    "SEAP Nigeria contact",
    "energy project inquiries",
    "partnerships SEAP Nigeria",
    "clean energy Nigeria contact",
  ],
  openGraph: {
    title: "Contact SEAP | Sustainable Energy Access Project",
    description:
      "Reach out to SEAP for questions, collaborations, or support on sustainable energy projects across Nigeria.",
    url: "https://seap.com.ng/contact",
    images: [
      {
        url: "https://seap.com.ng/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SEAP team for clean energy partnerships in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SEAP | Sustainable Energy Access Project Nigeria",
    description:
      "Contact SEAP for inquiries, partnerships, or investment opportunities in Nigeria's clean energy sector.",
    images: ["https://seap.com.ng/contact-og.jpg"],
  },
};

const page = () => {
  const { icons } = allData;
  return (
    <div className="flex flex-col items-center min-h-screen pt-12">
      {/* Semantic Header Section */}
      <header className="self-stretch px-4 py-12 md:px-16 md:py-28 relative flex flex-col justify-center items-center gap-12 md:gap-20 overflow-hidden">
        <Image
          src='/images/projects/solar-3.jpg'
          alt="Background image of a solar farm"
          fill={true}
          sizes="100vw"
          className="object-cover object-center absolute inset-0 z-0"
          />

        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="relative w-full max-w-7xl flex flex-col justify-start items-center gap-12 md:gap-20 z-1">
          <div className="w-full max-w-3xl flex flex-col justify-start items-center gap-8">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="inline-flex justify-start items-center">
                <p className="text-center justify-start text-white text-base font-semibold leading-normal">Let&apos;s Power Nigeria Together</p>
              </div>
              <div className="self-stretch flex flex-col justify-start items-center gap-6">
                <h1 className="self-stretch text-center justify-start text-white text-4xl md:text-6xl font-normal leading-tight md:leading-[67.20px]">Get in Touch</h1>
                <p className="self-stretch text-center justify-start text-white text-base md:text-lg font-normal leading-relaxed">Whether you&apos;re a local government official, investor, development partner, or citizen, we&apos;d love to hear from you. Reach out with your questions, proposals, or collaboration ideas, the SEAP team is here to support Nigeria&apos;s clean energy transformation across all 774 LGAs.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* The form component is now placed as a single element */}
      <div className="w-full max-w-2xl md:max-w-4xl bg-whitish-secondary shadow-xl rounded-lg p-8 -mt-8 md:-mt-24 z-10 mb-12">
        <ContactForm />
      </div>

      {/* Semantic Footer Section */}
      <footer className="w-full max-w-2xl md:max-w-4xl p-8 text-gray-600 mb-12">
        <ul className="flex flex-col md:flex-row justify-center items-center text-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Address */}
          <li className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
              <path d={icons.location}/>
            </svg>
            <div>
              <p className="font-semibold">Our Address</p>
              <p>No4 Boke Street, Wuse 2, Abuja</p>
            </div>
          </li>
          {/* Phone */}
          <li className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
              <path d={icons.call}/>
            </svg>
            <div>
              <p className="font-semibold">Phone</p>
              <p>+234 (0) 123 456 7890</p>
            </div>
          </li>
          {/* Email */}
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

export default page;
