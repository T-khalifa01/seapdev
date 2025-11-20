'use client';

import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ label, name, value, options, onChange, disabled = false, withSearchBar = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        e.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex];
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const floatingLabelWrapper = "relative mb-6";
  const floatingInput = "peer w-full h-12 px-0 py-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-green-accent transition-colors duration-300 placeholder-transparent";
  const floatingLabel = "absolute left-0 -top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-full peer-focus:text-sm";

  return (
    <div className={floatingLabelWrapper} ref={dropdownRef}>
      <div
        tabIndex={0}
        className={`${floatingInput} relative cursor-pointer px-2 flex justify-between items-center bg-whitish-secondary ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${name}-label`}
        aria-controls={`${name}-list`}
      >
        <span className={`${value ? 'text-gray-800' : 'text-gray-500'}`}>
          {value || 'Select an option'}
        </span>
        <svg
          className="w-5 h-5 text-gray-400 transform transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <label id={`${name}-label`} htmlFor={name} className={`${floatingLabel} ${value ? 'top-0 -translate-y-full text-sm' : ''}`}>{label}</label>

      {isOpen && (
        <div id={`${name}-list`} role="listbox" className="absolute z-10 w-full mt-1 bg-whitish-secondary border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {withSearchBar && (
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-1.5 outline-none text-sm rounded-md border border-gray-300 focus:border-green-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <ul ref={listRef}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 m-1 rounded-full cursor-pointer transition-colors duration-150 hover:bg-Lighter-BlueShade ${
                    option === value
                      ? 'bg-green-50 text-green-800 font-medium'
                      : highlightedIndex === index
                      ? 'bg-Lighter-BlueShade'
                      : 'text-gray-700'
                  }`}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;