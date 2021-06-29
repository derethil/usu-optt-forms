import React, { useState, createContext } from "react";

import { Tab, ITabProps } from './Tab';
import { Panel, IPanelProps } from './Panel';

interface ITabsContext {
  activeTab: string,
  setActiveTab: (label: string) => void
}

const tabsCtxDefault = {
  activeTab: "a",
  setActiveTab: (newActiveTab: string) => { }
}

export const TabsContext = createContext<ITabsContext | undefined>(
  undefined
)

type TabsProps = {
  default: string
}

const Tabs: React.FC<TabsProps> & { Tab: typeof Tab, Panel: typeof Panel } = props => {
  const [activeTab, setActiveTab] = useState(props.default);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs }