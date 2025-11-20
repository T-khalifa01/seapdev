// components/specific/SubmissionModal.js
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function SubmissionModal({ success, onReset }) {
  const modalRef = useRef(null);
  
  const title = success ? 'Submission Successful!' : 'Submission Failed';
  const message = success
    ? 'Your investment form has been submitted successfully.'
    : 'An error occurred during submission. Please try again.';
  const titleColor = success ? 'text-green-600' : 'text-red-600';
  const buttonColor = success ? 'bg-green-accent hover:bg-lemon-accent' : 'bg-red-600 hover:bg-red-700';

  // This function will close the modal and take the user back to the previous page.
  const handleClose = () => {
    // onReset is a good name for this, as it closes the modal and also resets the form state.
    // The previous page would be the form itself, but in its initial state.
    onReset();
    window.history.back();
  };

  // Function to handle clicks outside the modal content.
  const handleBackdropClick = (e) => {
    // Check if the click happened on the backdrop (modalRef.current) and not on the modal's content.
    if (modalRef.current && e.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <div
      ref={modalRef} // Assign the ref to the backdrop div
      onClick={handleBackdropClick} // Add the click handler to the backdrop
      className="fixed inset-0 bg-gray-900/20 flex items-center justify-center z-50 transition-all duration-300"
    >
      <div className="bg-white rounded-lg p-4 max-w-sm w-full mx-4 shadow-xl text-center">
        <h3 className={`text-2xl font-bold mb-4 ${titleColor}`}>{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        
        {/* Buttons are now side-by-side space-x-4*/}
        <div className="flex flex-row gap-2 ">
          <Link href="/">
            <button
              className="w-full py-2 px-2 rounded-lg text-white font-semibold bg-bleus-secondary hover:bg-lemon-accent transition-colors duration-300 focus:outline-none text-nowrap "
              onClick={handleClose} // We'll use the same close logic for both buttons.
            >
              Go to Homepage
            </button>
          </Link>
          <button
            className={`w-full py-2 px-2 rounded-lg text-white font-semibold ${buttonColor} transition-colors duration-300 focus:outline-none`}
            onClick={handleClose}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}