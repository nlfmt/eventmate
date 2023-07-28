import c from "@/components/EventOverview/eventOverview.module.scss"



import { useContext } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";

import categories, { type Category } from "@/utils/categories";


const EventHeader = () => {
  const { event } = useContext(EventOverviewContext);

  const { participants } = event;

  const allowed = 2;
  const titleParts = event.title.split("\n");
  let title = titleParts.slice(0, allowed).join("\n");
  
  if (titleParts.length > 3) title += " " + titleParts.slice(allowed).join(" ");

  const category =
    categories[event.category as Category] ?? categories["other"];
  const categoryName = category?.[0];
  const CategoryIcon = category?.[1];

  return (
    <div className={c.heading} data-header data-cat={event.category}>
      <div className={c.categories}>
        <div className={c.tags}>
          {event.tags && event.tags.split(";").map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
        </div>
        <div className={c.categoryIcon}>
          <CategoryIcon />
          <span>{categoryName}</span>
        </div>
      </div>
      <div className={c.title_Wrapper}>
        {/* Event title */}
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
      </div>
      <div className={c.author}>
        <span>by <b>{event.author.username}</b></span>
        {participants.length > 3 ? (
          <span>
            Joined by{" "}
            <b>
              {participants[0]?.username}, {participants[1]?.username}
            </b>{" "}
            and <b>{event._count.participants - 2} more.</b>
          </span>
        ) : (
          <span>
            Joined by{" "}
            <b>{participants?.map((user) => user.username).join(", ")}</b>
          </span>
        )}
      </div>
    </div>
  ); 
};
export default EventHeader;