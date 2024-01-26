import React, {useEffect, useReducer, useState } from 'react';
import { HomeIcon } from '@heroicons/react/outline'
import logo from './oct_logo.png'
import { MenuIcon } from '@heroicons/react/outline';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
]


const LOADING_STATES = {
  idle: 'idle',
  submit: 'submit',
  execute: 'execute',
  fetchFileContents: 'fetchFileContents',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// SidebarMenu.jsx
// SidebarMenu.jsx
// SidebarMenu.jsx
function SidebarMenu({ isOpen: isSidebarOpen, setIsOpen }) {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  const handleToggle = () => {
    if (!isDesktopOrLaptop) {
      setIsOpen(!isSidebarOpen);
    }
  };

  // Ensure the toggle button is always visible on mobile screens
  return (
    <>
      <button onClick={handleToggle} className="md:hidden fixed top-0 left-0 z-50 m-4">
        <MenuIcon className="h-6 w-6 text-white" />
      </button>
      <div className={`transform transition-transform duration-200 ease-in-out bg-gray-900 px-6 overflow-y-auto z-50 ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'} md:translate-x-0 md:static md:w-64`}>
      <section aria-labelledby="filter-heading" className="border-t border-gray-600 py-6 dark:border-gray-700"></section>
      <div className={`fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out bg-gray-900 px-6 overflow-y-auto z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
        <div className={`fixed inset-0 bg-black-800 opacity-50 transition-opacity duration-200 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`} onClick={handleToggle}></div>
      <div className="relative h-full flex flex-col gap-y-5">
        <div className="flex h-16 items-center justify-between">
          <button onClick={handleToggle} >
          <img src={logo} alt="Menu Icon" style={{width: '50px', height: '50px'}} />
          </button>
        </div>
        <nav className="flex-1">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                  <a
  href={item.href}
  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-white bg-gray-900 hover:bg-gray-700"
>
  <item.icon className="h-6 w-6" aria-hidden="true" />
  {item.name}
</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
    </>
  )
}

export default SidebarMenu


