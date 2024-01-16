import { Tab } from '@headlessui/react';
import PropTypes from 'prop-types';

const TabContainer = ({ activeTab, onTabChange, tabs }) => (
  <Tab.Group as="div" className="tabContainer mx-auto max-w-7xl sm:px-6 lg:px-8" onChange={onTabChange}>
    {tabs.map((tab) => (
      <Tab 
  key={tab} 
  className={({ selected }) => `container tabButton ${selected ? 'active' : ''}`}
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

