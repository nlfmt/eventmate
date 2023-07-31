import c from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api } from "@/utils/api";
import Card from "@/components/LandingPage/Card";
import type { Event } from "@prisma/client";
import SearchSection from "@/components/LandingPage/SearchSection";
import { type FilteredUser, classes } from "@/utils/utils";

import { useRouter } from "next/router";
import { ArrowForwardRounded } from "@mui/icons-material";
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";


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
      <PageWithSidebar>
        <SearchSection />
        <NewEventsSection />
        {session.data && <JoinedEventsSection />}
        {session.data && <MyEventsSection />}
      </PageWithSidebar>
    </>
  );
};

export default Home;

interface EventSectionProps {
  title?: string;
  className?: string;
  wrap?: boolean;
  fill?: boolean;
  component?: React.ComponentType<{ event: Event & {
    _count: { participants: number };
    author: FilteredUser;
  }}>;
  events:
    | (Event & { _count: { participants: number }; author: FilteredUser })[]
    | undefined;
  onShowMore?: () => void;
}

export const EventSection = ({component: MyComp = Card, ...props}: EventSectionProps) => {
  return (
    <div
      className={classes(c.eventSection, props.className)}
      data-wrap={props.wrap}
    >
      {props.title && (
      <div className={c.sectionTitle}>
          <span>{props.title}</span>
          <div />
          {props.onShowMore && (
            <button className={c.showMore} onClick={props.onShowMore}>
              <span>Show More</span>
              <ArrowForwardRounded />
            </button>
          )}
      </div>
      )}
      {props.events && props.events.length > 0 ? (
        <div className={c.eventList}>
          {props.events.map((event) => {
            return <MyComp key={event.id} event={event} />;
          })}
          {props.fill && <div className={c.filler} />}
          {props.fill && <div className={c.filler} />}
        </div>
      ) : props.events && props.events.length === 0 ? (
        <div className={c.noEvents}>No events found</div>
      ) : (
        <div className={c.loading}>Loading...</div>
      )}
    </div>
  );
};

const MyEventsSection = () => {
  const router = useRouter();
  const { data: events } = api.event.myEvents.useQuery();
  return <EventSection title="My Events" events={events} onShowMore={() => {
    router.push({
      pathname: "/search",
      query: { owned: 1 }
    })
  }} />;
};

const JoinedEventsSection = () => {
  const router = useRouter();
  const { data: events } = api.event.joinedEvents.useQuery();
  return <EventSection title="Joined Events" events={events} onShowMore={() => {
    router.push({
      pathname: "/search",
      query: { joined: 1 }
    })
  }} />;
};

const NewEventsSection = () => {
  const router = useRouter();
  const { data: events } = api.event.newEvents.useQuery();
  return <EventSection title="New Events" events={events} onShowMore={() => {
    router.push({
      pathname: "/search",
    })
  }} />;
};
