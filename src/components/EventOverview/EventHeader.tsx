import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"
import type { Event, User } from "@prisma/client";



import {
  GroupRounded,
  TheaterComedyRounded,
  CelebrationRounded,
  SportsBasketballRounded,
  SchoolRounded,
  PaletteRounded,
  TipsAndUpdatesRounded,
} from "@mui/icons-material";

const categories = {
  show: ["Show", TheaterComedyRounded],
  party: ["Party", CelebrationRounded],
  sport: ["Sport", SportsBasketballRounded],
  education: ["Education", SchoolRounded],
  culture: ["Culture", PaletteRounded],
  meetup: ["Meetup", GroupRounded],
  other: ["Other", TipsAndUpdatesRounded],
} as const;
type Category = keyof typeof categories;

export interface HeaderProps {
  event: Event & {
    author: Omit<User, "password">;
  };
}

const EventHeader = (props: HeaderProps) => {
  const { event } = props;

  const allowed = 2;
  const titleParts = event.title.split("\n");
  let title = titleParts.slice(0, allowed).join("\n");
  console.log(title, titleParts);
  if (titleParts.length > 3) title += " " + titleParts.slice(allowed).join(" ");

  const category =
    categories[event.category as Category] ?? categories["other"];
  const categoryName = category?.[0];
  const CategoryIcon = category?.[1];

  return (
    <div 
      className={c.heading} 
      data-HEADER
      data-cat={event.category}
    >
      <div className={c.categories}>
          <div className={c.tags}>
            {event.tags.split(";").map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </div>
          <div className={c.categoryIcon}>
            <CategoryIcon />
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
          <span className={c.categoryName}>{categoryName}</span>
      </div>
      <div className={c.author}>
          <span>Erstellt von {event.author.username}</span>
      </div>
    </div>
  ); 
};
export default EventHeader;