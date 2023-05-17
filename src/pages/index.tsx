import c from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { MenuOutlined } from "@mui/icons-material";

import { api } from "@/utils/api";
import Card from "@/components/LandingPage/Card";
import type { Event, User } from "@prisma/client";
import SearchSection from "@/components/LandingPage/SearchSection";
import { classes } from "@/utils/utils";

export const PlaceHolderSideBar = () => {
  return (
    <header className={c.navbar}>
      <span>EventMate</span>
      <MenuOutlined />
    </header>
  );
};

const Home: NextPage = () => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>EventMate</title>
        <meta
          name="description"
          content="Easily create and manage events with our intuitive platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={c.main}>
        {/* <SideBar /> */}
        <PlaceHolderSideBar />

        <SearchSection />
        <NewEventsSection />
        {session.data && <JoinedEventsSection />}
        {session.data && <MyEventsSection />}
      </main>
    </>
  );
};

export default Home;

interface EventSectionProps {
  title?: string;
  className?: string;
  events:
    | (Event & { _count: { participants: number }; author: User })[]
    | undefined;
}

export const EventSection = (props: EventSectionProps) => {
  return (
    <div className={classes(c.eventSection, props.className)}>
      {props.title && <div className={c.sectionTitle}>
        <span>{props.title}</span>
        <div />
      </div>}
      {props.events && props.events.length > 0 ? (
        <div className={c.eventList}>
          {props.events.map((event) => {
            return <Card key={event.id} event={event} />;
          })}
        </div>
      ) : (props.events && props.events.length === 0) ? (
        <div className={c.noEvents}>No events found</div>
      ) : (
        <div className={c.loading}>Loading...</div>
      )}
    </div>
  );
};

const MyEventsSection = () => {
  const { data: events } = api.event.myEvents.useQuery();
  return <EventSection title="My Events" events={events} />;
};

const JoinedEventsSection = () => {
  const { data: events } = api.event.joinedEvents.useQuery();
  return <EventSection title="Joined Events" events={events} />;
};

const NewEventsSection = () => {
  const { data: events } = api.event.newEvents.useQuery();
  return <EventSection title="New Events" events={events} />;
};