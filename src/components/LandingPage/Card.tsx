import React, { useContext, useState } from "react";
import c from "./Card.module.scss";

import type { Event, User } from "@prisma/client";
import dayjs from "dayjs";

import {
  PersonRounded,
  GroupRounded,
  EventNoteRounded,
  WatchLater,
  ExpandLessRounded,
} from "@mui/icons-material";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/router";

import categories, { type Category } from "@/utils/categories";
import OverlayContext from "@/contexts/OverlayContext";
import { FilteredUser } from "@/utils/utils";

export interface CardProps {
  event: Event & {
    _count: { participants: number };
    author: FilteredUser;
  };
}

const Card = (props: CardProps) => {
  const { event } = props;
  // Only allow two newlines in the title
  const allowed = 2;
  const titleParts = event.title.split("\n");
  let title = titleParts.slice(0, allowed).join("\n");
  if (titleParts.length > 3) title += " " + titleParts.slice(allowed).join(" ");

  const category =
    categories[event.category as Category] ?? categories["other"];
  const categoryName = category?.[0];
  const CategoryIcon = category?.[1];

  const [small, setSmall] = useState(true);
  const desktop = useMediaQuery("(min-width: 500px)");
  const router = useRouter();

  const { overlay } = useContext(OverlayContext);

  const onCardClick: React.MouseEventHandler<HTMLDivElement> = async e => {
    if (e.defaultPrevented) return;
    if (!desktop && small) return setSmall(false);
    await router.push(`/event/${event.id}`);
  }

  return (
    <div
      className={c.card}
      data-cat={event.category}
      data-small={desktop ? false : small}
      onClick={overlay ? undefined : onCardClick}
    >
      <div
        className={c.collapse}
        onClick={overlay ? undefined : (e) => {
          if (e.defaultPrevented) return;
          e.preventDefault();
          e.stopPropagation();
          setSmall(true);
        }}
      >
        <ExpandLessRounded />
      </div>
      <div className={c.tags}>
        {event.tags && event.tags.split(";").map((tag) => {
          return <span key={tag}>{tag}</span>;
        })}
      </div>

      <div className={c.middle}>
        <span className={c.title}>
          {title.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </span>
        <span className={c.categoryName}>{categoryName}</span>
      </div>

      <div className={c.info}>
        <div className={c.category}>
          <svg
            className={c.categoryBG}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
          >
            <path
              fill="white"
              fillOpacity="0.5"
              d="M200,100H0C50,100,50,0,100,0H200Z"
            />
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
          <span>
            {event._count.participants}/{event.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
