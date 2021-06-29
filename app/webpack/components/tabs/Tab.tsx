import React from "react";
import { TabsContext } from "./Tabs";

export interface ITabProps {
  label: string
}

export const Tab: React.FC<ITabProps> = props => {
  const tabs = React.useContext(TabsContext)!;
  return (
    <div className="tab">
      <button onClick={() => tabs.setActiveTab(props.label)}>
        {props.children}
      </button>
    </div>
  )
}