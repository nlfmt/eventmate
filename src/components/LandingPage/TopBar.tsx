import React from "react";
import EventMateLogo from "@/components/EventMateLogo";

import c from "./TopBar.module.scss";
import { MenuRounded, PersonRounded } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";


export interface TopBarProps {
  title?: string;
}

const TopBar = (props: TopBarProps) => {

  const session = useSession();
  
  return (
    <header className={c.topbar}>
      <EventMateLogo />
      <span className={c.title}>{props.title ?? "EventMate"}</span>

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

      <MenuRounded />
      
    </header>
  )
};

export default TopBar;
