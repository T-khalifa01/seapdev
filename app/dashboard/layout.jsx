'use client';
// // Example in a layout component
// import React from 'react';
// import DashHeader from '../(common)/commponents/specific/DashHeader';
// import DashSidebar from '../(common)/commponents/specific/DashSidebar';
// import { DashProvider, useDashContext } from '../(common)/commponents/specific/DashContext';
// import "../globals.css";


// // export default DashboardLayout;
// const DashboardLayoutContent =  ({ children }) => {
//   // const [pageTitle, setPageTitle] = useState('Dashboard');
//   const { pageTitle, setPageTitle, activeKey, setActiveKey } = useDashContext();
  
//   // This function is the bridge that the Sidebar will use to update the page.
//   const handleSelect = (pageName, key) => {
//     setPageTitle(pageName);
//     setActiveKey(key);
//   };
//   return (
//     <html lang="en" className="light" >
//       <body>
//         <div className="flex min-h-screen ">
//           <DashSidebar onSelect={handleSelect} activeKey={activeKey} />

//           {/* Main Content Area */}
//           <div className="flex-1 flex flex-col">
//             {/* Header Component - now part of the layout */}
//             <div className="w-full max-w-screen-xl">
//               <DashHeader pageTitle={pageTitle} />
//             </div>

//             {/* The dynamic page content goes here */}
//             <main className="flex-1 w-full max-w-screen-xl mx-auto p-6 overflow-y-auto"> {/*flex-1 p-6 overflow-y-auto*/}
//               {children}
//             </main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

// const DashboardLayout = ({ children }) => {
//   return (
//     <DashProvider>
//       <DashboardLayoutContent>{children}</DashboardLayoutContent>
//     </DashProvider>
//   );
// };

// export default DashboardLayout;


import React from 'react';
import DashHeader from '../(common)/commponents/specific/DashHeader';
import DashSidebar from '../(common)/commponents/specific/DashSidebar';
import { DashProvider, useDashContext } from '../(common)/commponents/specific/DashContext';
import "../globals.css"; // Note: This should ideally be in your root layout.js

// This component provides the shared UI for the dashboard
// It uses a client directive because it uses client-side hooks like useDashContext
const DashboardLayoutContent = ({ children }) => {
  const { pageTitle, setPageTitle, activeKey, setActiveKey } = useDashContext();

  const handleSelect = (pageName, key) => {
    setPageTitle(pageName);
    setActiveKey(key);
  };

  return (
    <div className="flex min-h-screen">
      <DashSidebar onSelect={handleSelect} activeKey={activeKey} />
      <div className="flex-1 flex flex-col">
        <div className="w-full max-w-screen-xl">
          <DashHeader pageTitle={pageTitle} />
        </div>
        <main className="flex-1 w-full max-w-screen-xl mx-auto p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// This is the main layout component that wraps the content with the provider
export default function DashboardLayout({ children }) {
  return (
    <DashProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashProvider>
  );
}
