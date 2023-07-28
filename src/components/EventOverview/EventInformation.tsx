import c from "@/components/EventOverview/eventOverview.module.scss"
import React, { useContext } from 'react';


import dayjs from "dayjs";
import {
  GroupRounded,
  EventNoteRounded,
  WatchLater
} from "@mui/icons-material";
import EventLocation from "./EventLocation";
import EventOverviewContext from "@/contexts/EventOverviewContext";


const EventInformation = () => {
  const ctx = useContext(EventOverviewContext);

  const event = ctx.event;
  const latitude = event.latitude;
  const longitude = event.longitude;

  return (
      <div className={c.information}>
          {/* <div className={c.infoItem}>
            <LocationOnRounded />
            {(latitude && longitude) && <EventLocation />}
            <span>location</span>
          </div> */}

          <div className={c.leftInfo}>
            <div className={c.infoItem}>
              <EventNoteRounded />
              <span>{dayjs(event.date).format("DD.MM.YYYY")}</span>
            </div>
            <div className={c.infoItem}>
              <WatchLater />
              <span>{dayjs(event.date).format("HH:mm")}</span>
            </div>
            <div className={c.infoItem}>
              <GroupRounded />
              <span>
                {event._count.participants}/{event.capacity}
              </span>
            </div>
          </div>
          {(latitude && longitude) && (
            <EventLocation />
          )}

        {/* <div className={c.infoMap}>
          <div className={c.map}>
          </div>
        </div> */}
      </div>
  );
}

export default EventInformation;