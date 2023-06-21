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
export type Category = keyof typeof categories;

export default categories