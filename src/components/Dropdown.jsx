import React, { useState } from 'react';

export default function Dropdown({ title, options, selectedOptions, onOptionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="desktop-filter-toggle-button group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`ml-2 h-5 w-5 text-gray-500 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          {options.map((option) => (
            <div key={option} className="px-4 py-2">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={onOptionChange}
                  className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}