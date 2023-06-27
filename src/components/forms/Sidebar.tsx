import React, { useContext } from "react";
import Link from "next/link";
import c from "./Sidebar.module.scss";
import { ClearRounded, HomeRounded, InboxRounded } from "@mui/icons-material";
import { classes } from "@/utils/utils";
import AppContext from "@/contexts/AppContext";

interface SidebarProps {
  sidebarOpen: boolean; // ob Seitenleiste geöffnet ist oder nicht
  toggleSidebar: () => void; // Funktion zum Umschalten der Seitenleiste
}

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);

  const sidebarClassName = classes(c.sidebar, sidebarOpen ? c.sidebarOpen : c.sidebarClosed);

  const closeIconClassName = c.closeIcon || ""; // Überprüfung auf undefined

  return (
    <div className={sidebarClassName}>
      {/* <header>
        EventMate
        <ClearRounded className={c.closeIcon} onClick={() => setSidebarOpen(v => !v)} />
      </header> */}
      <div className={c.divider}></div>
      <nav className={c.link}>
        <Link href="#" className={c.color}>
            <HomeRounded />
            <span>Home</span>
        </Link>
        <Link href="#" className={c.color}>
            <InboxRounded />
            <span>Invitations</span>
        </Link>
      </nav>
      <p className={c.welcome}>
        Welcome Back,
        <br />
        <span className={c.userName}>Antonia</span>
      </p>
    </div>
  );
};

export default Sidebar;
