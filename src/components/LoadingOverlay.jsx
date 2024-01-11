import React from 'react';
import { RefreshIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

const LoadingOverlay = ({ loading }) => {
  return (
    <Transition
      show={loading}
      enter="transition-opacity duration-75"
      leave="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <RefreshIcon className="animate-spin h-32 w-32 text-white" />
      </div>
    </Transition>
  );
};

export default LoadingOverlay;