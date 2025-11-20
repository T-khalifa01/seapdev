'use client'
import {useState} from "react";



const ProjectList = ({ Milestone, tdate }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Create a unique, clean ID for accessibility attributes
  const uniqueId = Milestone.replace('projectlistbutton').toLowerCase();
  return (
    <>
      {/* Desktop View: Standard Table Row (visible for screens >= 1024px) */}
      <tr className="hidden lg:table-row border-t border-solid border-black/10">
        <td className="py-[19px] pr-4 font-poppins font-medium text-base md:text-lg lg:text-xl leading-[1.4] whitespace-nowrap">
          {Milestone}
        </td>
        <td className="py-[19px] pl-4 font-fira-sans text-right text-base lg:text-xl leading-[1.6] whitespace-nowrap">
          {tdate}
        </td>
      </tr>

      {/* Mobile/Tablet View: Dropdown Accordion Item (visible for screens < 1024px) */}
      <div className="lg:hidden w-full">
        {/* Use a semantic heading for each accordion item for better document outline */}
        <h3 className="border-t border-solid border-black/10 last:border-b-0"> {/* Last item should not have bottom border if parent container handles it */}
          <button
            id={`button-${uniqueId}`} // ID for aria-labelledby on the panel px-4
            onClick={toggleOpen}
            className="w-full flex justify-between items-center py-4  font-poppins font-medium text-base text-left  hover:bg-gray-100 transition-colors duration-200"
            aria-expanded={isOpen} // Indicates to screen readers if the panel is open
            aria-controls={`panel-${uniqueId}`} // Links button to the controlled panel content
          >
            {Milestone}
            {/* Chevron icon for visual feedback */}
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </h3>
        {isOpen && (
          <div
            id={`panel-${uniqueId}`} // ID matching aria-controls
            role="region" // Semantic: designates a perceivable section of content
            aria-labelledby={`button-${uniqueId}`} // Links panel content to its controlling button
            className=" pb-4 " // Background for opened content, adjust as needed px-4
          >
            <p className="font-fira-sans text-base leading-[1.6] ">
              <span className="font-semibold text-sm block mb-1 text-gray-700">Target Date:</span>
              {tdate}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectList;