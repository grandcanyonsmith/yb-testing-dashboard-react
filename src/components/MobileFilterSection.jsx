import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon, ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MobileFilterSection({ handleFilterChange, }) {
  const [open, setOpen] = useState(false);
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
  
  // Use the filters array directly in your component
  return (
    <div className="bg-gray-900">
      <button
        type="button"
        className="px-4 py-2 text-white bg-indigo-600 rounded mt-4 sm:hidden"
        onClick={() => setOpen(!open)}
      >
        Filters
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40 flex sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative w-full max-w-xs h-full ml-auto flex flex-col overflow-y-auto bg-gray-900 py-4 pb-6 shadow-xl text-white">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 flex items-center justify-center rounded-md bg-black p-2 text-white-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <form className="mt-4 px-4 space-y-6">
        {filters.map((section) => (
          <Disclosure as="div" key={section.id} className="border-t border-gray-200 py-6">
            {({ open }) => (
              <>
                <h3 className="-mx-2 -my-3 flow-root">
                  <Disclosure.Button className="px-2 py-3 w-full flex items-center justify-between text-sm text-white-50 bg-gray-900">
                    <span className="font-medium text-white">{section.name}</span>
                    <ChevronDownIcon
                      className={classNames(open ? '-rotate-180' : 'rotate-0', 'ml-6 h-5 w-5 transform')}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="space-y-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        value={option.value}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
}




