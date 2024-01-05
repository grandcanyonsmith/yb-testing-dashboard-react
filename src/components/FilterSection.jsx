import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const FilterSection = ({ handleFilterChange }) => {
  const filters = [
    {
      id: 'team',
      name: 'Team',
      options: [
        { value: 'Legacy', label: 'Legacy', checked: false },
        { value: 'Publishing', label: 'Publishing', checked: false },
        { value: 'Celebrations', label: 'Celebrations', checked: false },
      ],
    },
    {
      id: 'status',
      name: 'Status',
      options: [
        { value: 'Passed', label: 'Passed', checked: false },
        { value: 'Failed', label: 'Failed', checked: false },
        { value: 'Untested', label: 'Untested', checked: false },
      ],
    },
    {
      id: 'testType',
      name: 'Test Type',
      options: [
        { value: 'UI Tests', label: 'UI Tests', checked: false },
        { value: 'API Tests', label: 'API Tests', checked: false },
      ],
    },
  ];

  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilter = (id, value, checked) => {
    handleFilterChange(id, value, checked);
    if (checked) {
      setActiveFilters((prev) => [...prev, { value, label: `${id}: ${value}` }]);
    } else {
      setActiveFilters((prev) => prev.filter((filter) => filter.value !== value));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8 dark:bg-gray-800 container mx-auto px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6 dark:border-gray-700">
      <div className="flex items-center justify-end ">
    <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
            {filters.map((section, sectionIdx) => (
              <Popover
                as="div"
                key={section.name}
                id={`desktop-menu-${sectionIdx}`}
                className="relative inline-block text-left"
              >
                <div>
                <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white dark:text-gray-200 dark:hover:text-white">
                    <span>{section.name}</span>
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-gray-800 p-4 shadow-2xl ring-1 dark:text-gray-300 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-gray-300">
                    <form className="space-y-4 text-white">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:text-indigo-400 dark:focus:ring-indigo-400"
                            onChange={(e) => handleFilter(section.id, e.target.value, e.target.checked)}
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-white dark:text-gray-300"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </Popover.Group>
        </div>

        <div className="hidden bg-gray-900">
  <div className="hidden mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
    <h3 className="sm:block text-sm font-medium text-gray-300">
      Filters
      <span className="sr-only">, active</span>
    </h3>

    <div aria-hidden="true" className="hidden h-5 w-px bg-gray-600 sm:ml-4 sm:block" />

    <div className="mt-2 sm:ml-4 sm:mt-0">
      <div className="-m-1 flex flex-wrap items-center">
        {activeFilters.map((activeFilter) => (
          <span
            key={activeFilter.value}
            className="m-1 inline-flex items-center rounded-full border border-gray-700 bg-gray-800 py-1.5 pl-3 pr-2 text-sm font-medium text-gray-200"
          >
            <span>{activeFilter.label}</span>
            <button
  type="button"
  className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-500 hover:bg-gray-700 hover:text-gray-300"
  onClick={() => handleFilter(activeFilter.value, activeFilter.value, false)}
>
              <span className="sr-only">Remove filter for {activeFilter.label}</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
</section>
</div>
);
};

export default FilterSection;