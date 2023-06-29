import React from "react";
import TopBar, { TopBarProps } from "@/components/LandingPage/TopBar";
import Sidebar from "@/components/forms/Sidebar";

import common from "@/styles/common.module.scss";
import c from "./PageWithSidebar.module.scss";

export interface PageWithSidebarProps {
  children: React.ReactNode;
  topbar?: TopBarProps;
}

const PageWithSidebar = ({ children, topbar }: PageWithSidebarProps) => {
  return (
    <main className={common.main}>
      <TopBar {...topbar} />
      <div className={c.container}>
        <Sidebar />
        <div className={c.siteContent}>{children}</div>
      </div>
    </main>
  );
};

export default PageWithSidebar;
