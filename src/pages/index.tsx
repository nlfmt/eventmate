import c from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { MenuOutlined } from "@mui/icons-material";

import { api } from "@/utils/api";
import Card from "@/components/LandingPage/Card";
import type { Event, User } from "@prisma/client";
import dayjs from "dayjs";

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
        <header className={c.navbar}>
          <span>EventMate</span>
          <MenuOutlined />
        </header>
        <div className={c.searchSection}>
          <div className={c.searchBar}>
            <input type="text" placeholder="Search for events" />
            <input type="text" placeholder="Search for events" />
          </div>
        </div>
        {session.data && <JoinedEventsSection />}
        {session.data && <MyEventsSection />}
      </main>
    </>
  );
};

export default Home;

interface EventSectionProps {
  title: string;
  events: (Event & { _count: { participants: number }, author: User })[] | undefined;
}

const EventSection = (props: EventSectionProps) => {
  return (
    <div className={c.eventSection}>
      <div className={c.sectionTitle}>
        <span>{props.title}</span>
        <div/>
      </div>
      {props.events ? (
        <div className={c.eventList}>
          {props.events.map((event) => {
            return <Card key={event.id} event={event} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const MyEventsSection = () => {
  const { data: events } = api.event.myEvents.useQuery();
  return <EventSection title="My Events" events={events} />;
}

const JoinedEventsSection = () => {
  const { data: events } = api.event.joinedEvents.useQuery();
  return <EventSection title="Joined Events" events={events} />;
}