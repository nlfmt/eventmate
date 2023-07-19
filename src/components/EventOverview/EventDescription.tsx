import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"

import type { Event, User } from "@prisma/client";
import { useContext } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";



const EventDescription = () => {
  const { event } = useContext(EventOverviewContext);

  return (
      <div className={c.description}>
          <h2>Description</h2>
          <div className={c.descriptionText}>
            <span>{event.description}</span>
          </div>
      </div>
  );
}

export default EventDescription;
