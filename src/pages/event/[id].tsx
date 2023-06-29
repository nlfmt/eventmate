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
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";


const Event: NextPage = () => {

  const router = useRouter();

  const { data } = api.event.get.useQuery({ id: router.query.id as string }, { enabled: router.isReady });

  return (
    <>
      <Head>
        {/* ToDo: hier muss eigentlich der Titel bzw. die Id des Events hin */}
        <title>Event</title>
      </Head>
      <PageWithSidebar>
        <div className={c.center}>
          {data ? (
            <>
              <EventHeader event={data.event} />
              <EventInformation event={data.event} />
              <EventInventation {...data} />
              <EventDescription event={data.event} />
              <EventChecklist />
              {/* <EventChat /> */}
            </>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </PageWithSidebar>
    </>
  );
};

export default Event;
