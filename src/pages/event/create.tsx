import c from "@/components/forms/createEvent.module.scss";
import cs from "@/styles/common.module.scss";
import EventDetails from "@/components/forms/EventDetails";
import Plans from "@/components/forms/Plans";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import DotNavigation from "@/components/DotNavigation";
import CreateEventHeading from "@/components/forms/CreateEventHeading";
import Requirements from "@/components/forms/Requirements";
import Invited from "@/components/forms/Invited";
import Finished from "@/components/forms/Finished";
import CreateEventContext, { EventInfo, FullEventInfo } from "@/contexts/CreateEventContext";
import PageWithSidebar from "@/components/PageWithSidebar/PageWithSidebar";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { classes } from "@/utils/utils";
import { Event } from "@prisma/client";

const CreateEvent: NextPage = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState<EventInfo>({
    private: false,
  });
  const [createdEvent, setCreatedEvent] = useState<Event | null>(null);

  const router = useRouter();

  function onClick() {
    setCount((v) => {
      console.log("count was", v);
      return v + 1;
    });
  }

  function back() {
    setCount((v) => v - 1);
  }

  const { mutateAsync: backendCreateEvent } = api.event.create.useMutation();

  async function createEvent(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const data = state as FullEventInfo;

    const dateTimeString = `${data.date}T${data.appt}:00`;

    const event = await backendCreateEvent({
      ...data,
      tags: data.tags
        .split(",")
        .map(v => v.trim())
        .filter(Boolean)
        .join(";"),
        date: new Date(dateTimeString)
    });

    setCreatedEvent(event);
    setCount(4);

    // await router.push(`/event/${event.id}`);
  }

  return (
    <>
      <Head>
        <title>Create Event</title>
      </Head>
      <PageWithSidebar>
        <div className={c.background}>
          <CreateEventHeading count={count} />
          <DotNavigation count={count} />
          
          <CreateEventContext.Provider value={{ state, setState }}>
            {count === 0 && <EventDetails click={onClick} />}
            {count === 1 && <Plans click={onClick} />}
            {count === 2 && <Requirements click={onClick} />}
            {count === 3 && <Invited click={onClick} createEvent={createEvent} />}
            {count === 4 && <Finished event={createdEvent} />}
            {count >= 1 && count < 4 && (
              <button className={c.back} onClick={back}>
                Back
              </button>
            )}
          </CreateEventContext.Provider>
        </div>
      </PageWithSidebar>
    </>
  );
};

export default CreateEvent;
