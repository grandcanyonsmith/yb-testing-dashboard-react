import { Tab } from '@headlessui/react';
import PropTypes from 'prop-types';

const TabContainer = ({ activeTab, onTabChange, tabs }) => (
  <Tab.Group as="div" className="tabContainer " onChange={onTabChange}>
    {tabs.map((tab) => (
      <Tab 
        key={tab} 
        className={({ selected }) => `container mx-auto px-4 sm:px-6 lg:px-8 tabButton ${selected && tab === activeTab ? 'active' : ''}`}
      >
        {tab}
      </Tab>
    ))}
  </Tab.Group>
);

TabContainer.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TabContainer;