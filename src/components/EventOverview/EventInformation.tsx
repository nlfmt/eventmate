import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"

import dayjs from "dayjs";
import type { Event, User } from "@prisma/client";
import {
  LocationOnRounded,
  GroupRounded,
  EventNoteRounded,
  WatchLater
} from "@mui/icons-material";


export interface InformationProps {
  event: Event & {
    _count: { participants: number };
  };
}


const EventInformation = (props: InformationProps) => {
  const { event } = props;
  const location = [event.latitude, event.longitude];

  return (
      <div className={c.information}>
        <div className={c.infoText}>
          <div className={c.infoItem}>
            <LocationOnRounded />
            <span>{/* // Location */}location</span>
          </div>

          <div className={c.infoItem}>
            <EventNoteRounded />
            <span>{dayjs(event.date).format("DD.MM.YYYY")}</span>
          </div>
          <div className={c.infoItem}>
            <WatchLater />
            <span>{dayjs(event.date).format("hh:mm")}</span>
          </div>
          <div className={c.infoItem} style={{ direction: "rtl" }}>
            <GroupRounded />
            <span>
              {event._count.participants}/{event.capacity}
            </span>
          </div>
        </div>
        <div className={c.infoMap}>
          <div className={c.map}>
          {/* // Location */}
          </div>
        </div>
      </div>
  );
}

export default EventInformation;