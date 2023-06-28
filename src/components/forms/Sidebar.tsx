import React, { useContext } from "react";
import Link from "next/link";
import c from "./Sidebar.module.scss";
import { ArrowForwardRounded, ChecklistRounded, ClearRounded, GroupsRounded, HomeRounded, InboxRounded, PersonRemove, PersonRounded, SearchRounded } from "@mui/icons-material";
import { classes } from "@/utils/utils";
import AppContext from "@/contexts/AppContext";
import { useSession } from "next-auth/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import EventMateLogo from "../EventMateLogo";
import { useRouter } from "next/router";

interface SidebarProps {
  sidebarOpen: boolean; // ob Seitenleiste geöffnet ist oder nicht
  toggleSidebar: () => void; // Funktion zum Umschalten der Seitenleiste
}

const Sidebar: React.FC = () => {
  const { sidebarOpen: sidebarState, setSidebarOpen } = useContext(AppContext);

  // On desktop, always show sidebar
  const fullSizeSidebar = useMediaQuery("(max-width: 1000px)");
  const sidebarOpen = fullSizeSidebar ? sidebarState : true;

  const { data: sessionData } = useSession();

  const sidebarClassName = classes(c.sidebar, sidebarOpen ? c.sidebarOpen : c.sidebarClosed);

  const closeIconClassName = c.closeIcon || ""; // Überprüfung auf undefined

  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className={sidebarClassName}>
      {!fullSizeSidebar && (
        <header>
          <EventMateLogo />
          <span>EventMate</span>
        </header>
      )}
      <nav className={c.link}>
        <SectionTitle title="Navigation" />
        <SidebarLink
          href="/"
          icon={<HomeRounded />}
          text="Home"
        />
        <SidebarLink
          href="/search"
          icon={<SearchRounded />}
          text="Search"
        />
        <SidebarLink
          href="/account"
          icon={<PersonRounded />}
          text="Account"
        />

        <SectionTitle title="Quick Links" />
        <SidebarLink
          href="/search?invited=1"
          icon={<InboxRounded />}
          text="Invitations"
          activatable={false}
        />
        <SidebarLink
          href="/search?owned=1"
          icon={<GroupsRounded />}
          text="My Events"
          activatable={false}
        />
        <SidebarLink
          href="/search?joined=1"
          icon={<ChecklistRounded />}
          text="Joined Events"
          activatable={false}
        />
      </nav>
      <p className={c.welcome}>
        Welcome back,
        <br />
        <span className={c.userName}>{sessionData?.user.name}</span>
      </p>
    </div>
  );
};


const SectionTitle = (props: { title?: string }) => {
  return (
    <div className={c.sectionTitle}>
      <span>{props.title}</span>
      <div />
    </div>
  )
}

const SidebarLink = (props: {
  icon: React.ReactNode;
  text: string;
  href: string;
  activatable?: boolean;
}) => {
  const { pathname } = useRouter();
  const activatable = props.activatable ?? true;

  return (
    <Link href={props.href} className={c.sidebarLink} data-active={activatable ? pathname === props.href : false}>
      {props.icon}
      <span>{props.text}</span>
      <ArrowForwardRounded />
    </Link>
  );
};

export default Sidebar;
