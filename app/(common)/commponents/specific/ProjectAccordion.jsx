"use client";
import { useState } from "react";

const ProjectAccordion = ({ Milestone, tdate, target }) => {
  const [isOpen, setIsOpen] = useState(false);

  // safe ID for aria attributes
  const uniqueId = Milestone.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full border-t border-black/10">
      <h3>
        <button
          id={`button-${uniqueId}`}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center py-4 font-poppins font-medium text-base text-left hover:bg-gray-100 transition-colors duration-200"
          aria-expanded={isOpen}
          aria-controls={`panel-${uniqueId}`}
        >
          {Milestone}
          {/* Chevron icon */}
          <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>
      {isOpen && (
        <div
          id={`panel-${uniqueId}`}
          role="region"
          aria-labelledby={`button-${uniqueId}`}
          className="pb-4 px-2"
        >
          <p className="font-fira-sans text-base leading-[1.6]">
            <span className="font-semibold text-sm block mb-1 text-gray-700">{target}</span>
            {tdate}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectAccordion;