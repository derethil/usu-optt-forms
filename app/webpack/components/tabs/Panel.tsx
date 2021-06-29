import React from "react";
import { TabsContext } from "./Tabs";

export interface IPanelProps {
  label: string
}

export const Panel: React.FC<IPanelProps> = props => {
  const tabs = React.useContext(TabsContext);
  return tabs?.activeTab === props.label ? <div>{props.children}</div> : null
}