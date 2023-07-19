import { NextPage } from "next";
import Head from "next/head";
import type { Event, User } from "@prisma/client";
import { api } from "@/utils/api";
import { MenuOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

import EventHeader from "@/components/EventOverview/EventHeader";
import EventInformation from "@/components/EventOverview/EventInformation";
import EventInvitation from "@/components/EventOverview/EventInvitation";
import EventDescription from "@/components/EventOverview/EventDescription";
import EventChecklist from "@/components/EventOverview/EventChecklist";
import EventChat from "@/components/EventOverview/EventChat";

import c from "@/components/EventOverview/eventOverview.module.scss"
import TopBar from "@/components/LandingPage/TopBar";
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";
import EventOverviewContext from "@/contexts/EventOverviewContext";


const EventOverview: NextPage = () => {

  const router = useRouter();

  const { data, refetch: invalidate } = api.event.get.useQuery({ id: router.query.id as string }, { enabled: router.isReady });

  return (
    <>
      <Head>
        {/* ToDo: hier muss eigentlich der Titel bzw. die Id des Events hin */}
        <title>Event</title>
      </Head>
      <PageWithSidebar>
        <div className={c.center}>
          {data ? (
            <EventOverviewContext.Provider value={{ ...data, invalidate }}>
              <EventHeader />
              <EventInvitation />
              <EventInformation />
              {/* {data.event.latitude && data.event.longitude && (
                <>
                  <iframe
                    title="Map"
                    width="600"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${data.event.latitude},${data.event.longitude}&zoom=14`}
                    allowFullScreen
                  ></iframe>
                  <br />
                  <small>
                    <a
                      href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&amp;output=embed"
                      // style="color:#0000FF;text-align:left"
                      target="_blank"
                    >
                      See map bigger
                    </a>
                  </small>
                </>
              )} */}
              <EventDescription />
              <EventChecklist />
              {/* <EventChat /> */}
            </EventOverviewContext.Provider>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </PageWithSidebar>
    </>
  );
};

export default EventOverview;
