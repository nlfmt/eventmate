import React, { useState } from "react";
import Link from "next/link";
import c from "./MenuBar.module.scss";
import { ClearRounded, MenuRounded, SearchRounded } from "@mui/icons-material";

interface MenuBarProps {
  sidebarOpen: boolean; // Prop für Status der Sidebar
  toggleSidebar: () => void; // Funktion zum Umschalten der Sidebar
  menuVisible: boolean; // Neue Prop für Sichtbarkeit des Menüs
}

const MenuBar: React.FC<MenuBarProps> = ({ sidebarOpen, toggleSidebar, menuVisible}) => {
  const handleMenuClick = () => {
    toggleSidebar(); // Toggle-Funktion für Seitenleiste aufrufen
  };

  return (
        <div className={c.menuBar}>
          <header>
            <MenuRounded className={c.svgMenu} onClick={handleMenuClick} />
            <span>EventMate</span>
            <SearchRounded className={c.svgSearch} />
          </header>
          {!menuVisible && sidebarOpen && (
        <div className={c.sidebar}>
          <header>
            EventMate
            <ClearRounded className={c.closeIcon} onClick={handleMenuClick} />
          </header>
          <nav className={c.link}>
            <Link href="#">
              <a className={c.color}>
                <span>Home</span>
              </a>
            </Link>
            <Link href="#">
              <a className={c.color}>
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
      )}
    </div>
  );
};

export default MenuBar;
