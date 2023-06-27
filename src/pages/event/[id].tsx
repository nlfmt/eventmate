import { NextPage } from "next";
import Head from "next/head";
import type { Event, User } from "@prisma/client";
import { api } from "@/utils/api";
import { MenuOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

import EventHeader from "@/components/EventOverview/EventHeader";
import EventInformation from "@/components/EventOverview/EventInformation";
import EventInventation from "@/components/EventOverview/EventInvitation";
import EventDescription from "@/components/EventOverview/EventDescription";
import EventChecklist from "@/components/EventOverview/EventChecklist";
import EventChat from "@/components/EventOverview/EventChat";

import c from "@/components/eventOverview/eventOverview.module.scss"
import TopBar from "@/components/LandingPage/TopBar";


const Event: NextPage = () => {

  const router = useRouter();

  const { data: event } = api.event.get.useQuery({ id: router.query.id as string }, { enabled: router.isReady })

  return (
    <>
      <Head>
        {/* ToDo: hier muss eigentlich der Titel bzw. die Id des Events hin */}
        <title>Event</title>
      </Head>
      <main className={c.main}>
        <div className={c.center}>
          <TopBar />
          {event ? (
            <>
              <EventHeader event={event} />
              <EventInformation event={event} />
              <EventInventation event={event} />
              <EventDescription event={event} />
              <EventChecklist />
              {/* <EventChat /> */}
            </>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Event;
