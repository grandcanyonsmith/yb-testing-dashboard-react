import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardHeader = ({ selectedRun, onViewCodeClick }) => {
  const navigate = useNavigate();

  if (!selectedRun) return null;

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="border-b border-gray-700 pb-5 bg-gray-800 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <button
          onClick={handleBackClick}
          className="self-start mb-4 sm:mb-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Back
        </button>
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-base font-semibold leading-6 text-white"
          >
            {selectedRun.formattedTestName}
          </h1>
          <p className="mt-1 truncate text-sm text-gray-400">
            ID: {selectedRun.id}
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
          <span className="inline-flex items-center rounded-full bg-blue-900 px-2 py-1 text-xs font-medium text-blue-200 ring-1 ring-inset ring-blue-600/20 mb-2 sm:mb-0 sm:mr-2">
            {selectedRun.team}
          </span>
          {selectedRun.status === "Passed" && (
            <span className="inline-flex items-center rounded-full bg-green-700 px-2 py-1 text-xs font-medium text-green-200 ring-1 ring-inset ring-green-600/20 mb-2 sm:mb-0 sm:mr-2">
              Passed
            </span>
          )}
          {selectedRun.status === "Failed" && (
            <span className="inline-flex items-center rounded-full bg-red-700 px-2 py-1 text-xs font-medium text-red-200 ring-1 ring-inset ring-red-600/20 mb-2 sm:mb-0 sm:mr-2">
              Failed
            </span>
          )}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="-my-2 flex items-center rounded-full bg-gray-700 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={onViewCodeClick}
                        className={classNames(
                          active
                            ? "bg-gray-600 text-gray-200"
                            : "text-gray-400",
                          "flex justify-between px-4 py-2 text-sm cursor-pointer",
                        )}
                      >
                        <span>View Code</span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
