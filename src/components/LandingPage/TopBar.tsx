import React, { useContext } from "react";
import EventMateLogo from "@/components/EventMateLogo";

import c from "./TopBar.module.scss";
import { MenuRounded, PersonRounded } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AppContext from "@/contexts/AppContext";
import useMediaQuery from "@/hooks/useMediaQuery";


export interface TopBarProps {
  title?: string;
}

const TopBar = (props: TopBarProps) => {

  const session = useSession();
  const { setSidebarOpen } = useContext(AppContext);

  const fullSizeSidebar = useMediaQuery("(max-width: 1000px)");
  
  return (
    <header className={c.topbar}>
      {fullSizeSidebar && (
        <>
          <Link href="/">
            <EventMateLogo />
          </Link>
          <span className={c.title}>{props.title ?? "EventMate"}</span>
        </>
      )}

      <span style={{ flexGrow: 1 }} />

      {session.data ? (
        <Link href="/account" className={c.user}>
          <span>{session.data.user.name}</span>
          <PersonRounded />
        </Link>
      ) : (
        <Link href="/login" className={c.loginButton}>
          Login
        </Link>
      )}

      {fullSizeSidebar && <MenuRounded onClick={() => setSidebarOpen(v => !v)} />}
      
    </header>
  )
};

export default TopBar;
