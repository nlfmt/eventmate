import React from "react";
import Link from "next/link";
import c from "./Sidebar.module.scss";
import { ClearRounded, HomeRounded, InboxRounded } from "@mui/icons-material";

interface SidebarProps {
  sidebarOpen: boolean; // ob Seitenleiste geöffnet ist oder nicht
  toggleSidebar: () => void; // Funktion zum Umschalten der Seitenleiste
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const sidebarClassName = `${c.sidebar}${sidebarOpen ? ` ${c.sidebarOpen}` : ""}`;

  const closeIconClassName = c.closeIcon || ""; // Überprüfung auf undefined

  return (
    <div className={sidebarClassName}>
      <header>
        EventMate
        <ClearRounded className={c.closeIcon} onClick={toggleSidebar} />
      </header>
      <nav className={c.link}>
        <Link href="#">
          <a className={c.color}>
            <HomeRounded />
            <span>Home</span>
          </a>
        </Link>
        <Link href="#">
          <a className={c.color}>
            <InboxRounded />
            <span>Invitations</span>
          </a>
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
