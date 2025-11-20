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
          fill
          style={{ objectFit: 'cover', objectPosition: "center" }}
          className="absolute inset-0 z-0"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="relative w-full max-w-[1280px] flex flex-col justify-start items-center gap-12 md:gap-20 z-1">
          <div className="w-full max-w-[768px] flex flex-col justify-start items-center gap-8">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="inline-flex justify-start items-center">
                <p className="text-center justify-start text-white text-base font-semibold leading-normal">Let's Power Nigeria Together</p>
              </div>
              <div className="self-stretch flex flex-col justify-start items-center gap-6">
                <h1 className="self-stretch text-center justify-start text-white text-4xl md:text-6xl font-normal leading-tight md:leading-[67.20px]">Get in Touch</h1>
                <p className="self-stretch text-center justify-start text-white text-base md:text-lg font-normal leading-relaxed">Whether you're a local government official, investor, development partner, or citizen, we'd love to hear from you. Reach out with your questions, proposals, or collaboration ideas, the SEAP team is here to support Nigeria's clean energy transformation across all 774 LGAs.</p>
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

// import { useState } from 'react';
// import CustomSelect from '../(common)/commponents/specific/CustomSelect';
// import allData from "../(common)/lib/data/webdata.json";
// import Image from 'next/image';
// import SubmissionModal from '../(common)/commponents/specific/SubmissionModal'; // Import the modal

// export default function ContactForm() {
//   const { icons } = allData;
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     identity: 'Individual',
//     organizationName: '',
//     organizationType: '',
//     message: '',
//   });

//   // State for errors and modal
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

//   const floatingLabelWrapper = "relative mb-6";
//   const floatingInput = "peer w-full h-12 px-0 py-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-green-accent transition-colors duration-300 placeholder-transparent";
//   const floatingLabel = "absolute left-0 -top-4 text-gray-500 font-poppins text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-full peer-focus:text-sm";

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     // Clear the error for the field being changed
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const identityOptions = ['Individual', 'Organization'];

//   // Client-side validation function
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Full Name is required';
//     if (!formData.phone) newErrors.phone = 'Phone Number is required';
//     if (!/^\d{7,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
//     if (!formData.message) newErrors.message = 'Message is required';
//     if (formData.identity === 'Organization') {
//       if (!formData.organizationName) newErrors.organizationName = 'Organization Name is required';
//       if (!formData.organizationType) newErrors.organizationType = 'Organization Type is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleResetForm = () => {
//     setFormData({
//       name: '',
//       phone: '',
//       email: '',
//       identity: 'Individual',
//       organizationName: '',
//       organizationType: '',
//       message: '',
//     });
//     setErrors({});
//     setShowModal(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       console.log('Validation failed');
//       return;
//     }

//     try {
//       const res = await fetch('/api/contact-submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSubmissionStatus('success');
//         setShowModal(true);
//       } else {
//         setSubmissionStatus('error');
//         setShowModal(true);
//         console.error('Submission failed:', data.error);
//       }
//     } catch (error) {
//       setSubmissionStatus('error');
//       setShowModal(true);
//       console.error('Submission failed, please try again later.', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen pt-12 ">
      
//       {/* Semantic Header Section */}
//       <header className="self-stretch px-4 py-12 md:px-16 md:py-28 relative flex flex-col justify-center items-center gap-12 md:gap-20 overflow-hidden">
//         {/* Background Image quality={100}*/}
//         <Image
//           src='/images/projects/solar-3.jpg'
//           alt="Background image of a solar farm"
//           fill
//           style={{ objectFit: 'cover', objectPosition: "center"  }}
//           className="absolute inset-0 z-0"
//           priority
//         />

//         {/* A semi-transparent overlay for better text readability */}
//         <div className="absolute inset-0 bg-black opacity-50 "></div>
        
//         {/* Header Content */}
//         <div className="relative w-full max-w-[1280px] flex flex-col justify-start items-center gap-12 md:gap-20 z-1 ">
//           <div className="w-full max-w-[768px] flex flex-col justify-start items-center gap-8">
//             <div className="self-stretch flex flex-col justify-start items-center gap-4">
//               <div className="inline-flex justify-start items-center">
//                 <p className="text-center justify-start text-white text-base font-semibold leading-normal">Let's Power Nigeria Together</p>
//               </div>
//               <div className="self-stretch flex flex-col justify-start items-center gap-6">
//                 <h1 className="self-stretch text-center justify-start text-white text-4xl md:text-6xl font-normal  leading-tight md:leading-[67.20px]">Get in Touch</h1>
//                 <p className="self-stretch text-center justify-start text-white text-base md:text-lg font-normal  leading-relaxed">Whether you're a local government official, investor, development partner, or citizen, we'd love to hear from you. Reach out with your questions, proposals, or collaboration ideas, the SEAP team is here to support Nigeria's clean energy transformation across all 774 LGAs.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="w-full max-w-2xl md:max-w-4xl bg-whitish-secondary  shadow-xl rounded-lg p-8 -mt-8 md:-mt-24 z-10 mb-12">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             {/* Full Name */}
//             <div className={floatingLabelWrapper}>
//               <input id="name" name="name" onChange={handleChange} required className={floatingInput} placeholder="Full Name" value={formData.name} />
//               <label htmlFor="name" className={floatingLabel}>Full Name</label>
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             {/* Phone Number */}
//             <div className={floatingLabelWrapper}>
//               <input id="phone" name="phone" onChange={handleChange} required className={floatingInput} placeholder="Phone Number" value={formData.phone} />
//               <label htmlFor="phone" className={floatingLabel}>Phone Number</label>
//               {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//             </div>
//             {/* Email */}
//             <div className={floatingLabelWrapper}>
//               <input id="email" name="email" type="email" onChange={handleChange} required className={floatingInput} placeholder="Email" value={formData.email} />
//               <label htmlFor="email" className={floatingLabel}>Email</label>
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>
//             {/* Identity */}
//             <CustomSelect
//               label="Identity"
//               name="identity"
//               value={formData.identity}
//               options={identityOptions}
//               onChange={handleChange}
//               withSearchBar={false}
//             />
//             {/* Conditional Organization Fields */}
//             {formData.identity === 'Organization' && (
//               <>
//                 <div className={floatingLabelWrapper}>
//                   <input id="organizationName" name="organizationName" onChange={handleChange} className={floatingInput} placeholder="Organization Name" value={formData.organizationName} />
//                   <label htmlFor="organizationName" className={floatingLabel}>Organization Name</label>
//                   {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>}
//                 </div>
//                 <div className={floatingLabelWrapper}>
//                   <input id="organizationType" name="organizationType" onChange={handleChange} className={floatingInput} placeholder="Organization Type" value={formData.organizationType} />
//                   <label htmlFor="organizationType" className={floatingLabel}>Organization Type</label>
//                   {errors.organizationType && <p className="text-red-500 text-xs mt-1">{errors.organizationType}</p>}
//                 </div>
//               </>
//             )}
//           </div>
//           {/* Message */}
//           <div className={`${floatingLabelWrapper} mt-6`}>
//             <textarea id="message" name="message" onChange={handleChange} required className={`${floatingInput} h-24 resize-none`} placeholder="Message / Questions" value={formData.message} />
//             <label htmlFor="message" className={floatingLabel}>Message / Questions</label>
//             {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
//           </div>
//           <div className="mt-8">
//             <button type="submit" className="w-full bg-green-accent hover:bg-bleus-secondary font-font-poppins text-whitish-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Semantic Footer Section */}
//       <footer className="w-full max-w-2xl md:max-w-4xl p-8 text-gray-600 mb-12">
//         <ul className="flex flex-col md:flex-row justify-center items-center text-center space-y-8 md:space-y-0 md:space-x-12">

//           {/* Address */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               <path d={icons.location}/>
//             </svg>
//             <div>
//               <p className="font-semibold">Our Address</p>
//               <p className='' >No4 Boke Street, Wuse 2, Abuja</p>
//             </div>
//           </li>
          
//           {/* Phone */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               {/* <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.24 1.12a11.043 11.043 0 005.58 5.58l1.12-2.24a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> */}
//               <path d={icons.call}/>
//             </svg>
//             <div>
//               <p className="font-semibold">Phone</p>
//               <p className='' >+234 (0) 123 456 7890</p>
//             </div>
//           </li>
          
//           {/* Email */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               {/* <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.894 5.263a1 1 0 001.212 0L21 8m-9 13v-8m0 0a9 9 0 110-18m0 18a9 9 0 010-18m0 18a9 9 0 010-18" /> */}
//               <path d={icons.email}/>
//             </svg>
//             <div>
//               <p className="font-semibold font-poppins">Email</p>
//               <p className='' >contact@seap.ng</p>
//             </div>
//           </li>
          
//         </ul>
//       </footer>
      
//       {/* The Submission Modal is rendered here */}
//       {showModal && (
//         <SubmissionModal
//           success={submissionStatus === 'success'}
//           onReset={handleResetForm}
//         />
//       )}
      
//     </div>
//   );
// }


// import Image from 'next/image';
// import allData from "../(common)/lib/data/webdata.json";
// import ContactForm from '../(common)/commponents/specific/ContactForm';



// // meta data
// export const metadata = {
//   title: "Contact SEAP | Sustainable Energy Access Project Nigeria",
//   description:
//     "Get in touch with SEAP for inquiries, partnerships, or support. Contact us to learn more about Nigeria's clean energy transformation.",
//   keywords: [
//     "contact SEAP",
//     "SEAP Nigeria contact",
//     "energy project inquiries",
//     "partnerships SEAP Nigeria",
//     "clean energy Nigeria contact",
//   ],
//   openGraph: {
//     title: "Contact SEAP | Sustainable Energy Access Project",
//     description:
//       "Reach out to SEAP for questions, collaborations, or support on sustainable energy projects across Nigeria.",
//     url: "https://seap.com.ng/contact",
//     images: [
//       {
//         url: "https://seap.com.ng/contact-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Contact SEAP team for clean energy partnerships in Nigeria",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Contact SEAP | Sustainable Energy Access Project Nigeria",
//     description:
//       "Contact SEAP for inquiries, partnerships, or investment opportunities in Nigeria's clean energy sector.",
//     images: ["https://seap.com.ng/contact-og.jpg"],
//   },
// };




// const page = () => {
//   const { icons } = allData;
//   return (
//     <div className="flex flex-col items-center min-h-screen pt-12">
      
//       {/* Semantic Header Section */}
//       <header className="self-stretch px-4 py-12 md:px-16 md:py-28 relative flex flex-col justify-center items-center gap-12 md:gap-20 overflow-hidden">
//         {/* Background Image */}
//         <Image
//           src='/images/projects/solar-3.jpg'
//           alt="Background image of a solar farm"
//           fill
//           style={{ objectFit: 'cover', objectPosition: "center" }}
//           className="absolute inset-0 z-0"
//           priority
//         />
//         {/* A semi-transparent overlay for better text readability */}
//         <div className="absolute inset-0 bg-black opacity-50 "></div>
        
//         {/* Header Content */}
//         <div className="relative w-full max-w-[1280px] flex flex-col justify-start items-center gap-12 md:gap-20 z-1">
//           <div className="w-full max-w-[768px] flex flex-col justify-start items-center gap-8">
//             <div className="self-stretch flex flex-col justify-start items-center gap-4">
//               <div className="inline-flex justify-start items-center">
//                 <p className="text-center justify-start text-white text-base font-semibold leading-normal">Let's Power Nigeria Together</p>
//               </div>
//               <div className="self-stretch flex flex-col justify-start items-center gap-6">
//                 <h1 className="self-stretch text-center justify-start text-white text-4xl md:text-6xl font-normal leading-tight md:leading-[67.20px]">Get in Touch</h1>
//                 <p className="self-stretch text-center justify-start text-white text-base md:text-lg font-normal leading-relaxed">Whether you're a local government official, investor, development partner, or citizen, we'd love to hear from you. Reach out with your questions, proposals, or collaboration ideas, the SEAP team is here to support Nigeria's clean energy transformation across all 774 LGAs.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* The form component is now placed as a single element */}
//       <div className="w-full max-w-2xl md:max-w-4xl bg-whitish-secondary shadow-xl rounded-lg p-8 -mt-8 md:-mt-24 z-10 mb-12">
//         <ContactForm />
//       </div>

//       {/* Semantic Footer Section */}
//       <footer className="w-full max-w-2xl md:max-w-4xl p-8 text-gray-600 mb-12">
//         <ul className="flex flex-col md:flex-row justify-center items-center text-center space-y-8 md:space-y-0 md:space-x-12">
//           {/* Address */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               <path d={icons.location}/>
//             </svg>
//             <div>
//               <p className="font-semibold">Our Address</p>
//               <p>No4 Boke Street, Wuse 2, Abuja</p>
//             </div>
//           </li>
//           {/* Phone */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               <path d={icons.call}/>
//             </svg>
//             <div>
//               <p className="font-semibold">Phone</p>
//               <p>+234 (0) 123 456 7890</p>
//             </div>
//           </li>
//           {/* Email */}
//           <li className="flex flex-col items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-accent" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={2}>
//               <path d={icons.email}/>
//             </svg>
//             <div>
//               <p className="font-semibold font-poppins">Email</p>
//               <p>contact@seap.ng</p>
//             </div>
//           </li>
//         </ul>
//       </footer>
//     </div>
//   );
// }

// export default page;