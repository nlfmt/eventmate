import React from "react";
import c from "./Card.module.scss";

import type { Event, User } from "@prisma/client";
import dayjs from "dayjs";

import {
  ParkRounded,
  MeetingRoomRounded,
  PersonRounded,
  GroupRounded,
  EventNoteRounded,
  WatchLater,
} from "@mui/icons-material";

const categories = {
  "outdoor": [ParkRounded, "Outdoor"],
  "indoor": [MeetingRoomRounded, "Indoor"],
  "concert": [EventNoteRounded, "Concert"],
  "online": [PersonRounded, "Online"],
  "other": [GroupRounded, "Other"],
} as const;

export interface CardProps {
  event: Event & { _count: { participants: number }, author: Omit<User, "password"> };
}

const Card = (props: CardProps) => {
  const { event } = props;
  const CategoryIcon = categories[event.category as keyof typeof categories][0];

  return (
    <div className={c.card} data-cat={event.category}>
      <div className={c.tags}>
        {event.tags.split(";").map((tag) => {
          return <span key={tag}>{tag}</span>;
        })}
      </div>

      <div className={c.middle}>
        <span className={c.title}>{event.title}</span>
      </div>

      <div className={c.info}>
        <div className={c.category}>
          <svg width={100} height={44} viewBox="0 0 100 44" className={c.categoryBG} xmlns="http://www.w3.org/2000/svg">
            <path d="M60 0C80 0 100 0 100 0V44C100 44 -32 44 8 44C48 44 30 0 60 0Z" fill="white" fillOpacity="0.5" />
          </svg>
          <div className={c.categoryIcon}>
            <CategoryIcon />
          </div>
        </div>

        <div className={c.infoItem}>
          <EventNoteRounded />
          <span>{dayjs(event.date).format("DD.MM.YYYY")}</span>
        </div>
        <div className={c.infoItem} style={{ direction: "rtl" }}>
          <PersonRounded />
          <span>{event.author.username}</span>
        </div>
        <div className={c.infoItem}>
          <WatchLater />
          <span>{dayjs(event.date).format("hh:mm")}</span>
        </div>
        <div className={c.infoItem} style={{ direction: "rtl" }}>
          <GroupRounded />
          <span>{event._count.participants}/{event.capacity}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
