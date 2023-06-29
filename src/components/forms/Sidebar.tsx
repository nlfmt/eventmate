import React, { useContext } from "react";
import Link from "next/link";
import c from "./Sidebar.module.scss";
import { AddRounded, ArrowForwardRounded, ChecklistRounded, GroupsRounded, HomeRounded, InboxRounded, PersonRounded, SearchRounded } from "@mui/icons-material";
import { classes } from "@/utils/utils";
import AppContext from "@/contexts/AppContext";
import { useSession } from "next-auth/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import EventMateLogo from "../EventMateLogo";
import { useRouter } from "next/router";


const Sidebar: React.FC = () => {
  const { data: sessionData } = useSession();
  const { sidebarOpen: sidebarState } = useContext(AppContext);

  // On desktop, always show sidebar
  const fullSizeSidebar = useMediaQuery("(max-width: 1000px)");
  const sidebarOpen = fullSizeSidebar ? sidebarState : true;
  const sidebarClassName = classes(c.sidebar, sidebarOpen ? c.sidebarOpen : c.sidebarClosed);



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
        {fullSizeSidebar && <div style={{ flexGrow: 1 }} />}
        <SidebarLink
          href="/event/create"
          icon={<AddRounded />}
          text="Create Event"
          activatable={false}
          className={c.createEvent}
        />
      </nav>
      {!fullSizeSidebar && (
        <p className={c.welcome}>
          Welcome back,
          <br />
          <span className={c.userName}>{sessionData?.user.name}</span>
        </p>
      )}
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
  className?: string;
}) => {
  const { setSidebarOpen } = useContext(AppContext);
  const { pathname } = useRouter();
  const activatable = props.activatable ?? true;
  const current = activatable ? pathname === props.href : false;

  return (
    <Link
      onClick={() => {
        if (!current) setSidebarOpen(false)
      }}
      href={props.href}
      className={classes(c.sidebarLink, props.className)}
      data-active={current}
    >
      {props.icon}
      <span>{props.text}</span>
      <ArrowForwardRounded />
    </Link>
  );
};

export default Sidebar;
