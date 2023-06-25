import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"

import type { Event, User } from "@prisma/client";



export interface DescriptionProps {
  event: Event;
}


const EventDescription = (props: DescriptionProps) => {
  const { event } = props;

  return (
      <div className={c.description}>
          <h2>Beschreibung</h2>
          <div className={c.descriptionText}>
            <span>{event.description}</span>
          </div>
      </div>
  );
}

export default EventDescription;
