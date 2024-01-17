import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SidebarMenu({ isOpen, setIsOpen }) {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out bg-gray-900 px-6 overflow-y-auto z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
      <div className={`fixed inset-0 bg-black opacity-50 transition-opacity duration-200 ease-in-out ${isOpen ? 'block' : 'hidden'} md:hidden`} onClick={handleToggle}></div>
      <div className="relative h-full flex flex-col gap-y-5">
        <div className="flex h-16 items-center justify-between">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <button onClick={handleToggle} className="md:hidden">
            <img src="path_to_your_icon" alt="Menu Icon" />
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
                      className={classNames(
                        item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
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
  )
}

export default SidebarMenu