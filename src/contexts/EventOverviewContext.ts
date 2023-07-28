import { createContext } from "react";

import { type Event } from "@prisma/client"
import { type FilteredUser } from "@/utils/utils";

export interface EventOverviewContext {
  event: Event & {
    _count: { participants: number };
    author: FilteredUser;
    participants: FilteredUser[];
  };
  isInvited: boolean;
  isParticipant: boolean;
  isAuthor: boolean;
  invalidate: () => void;
}

export default createContext<EventOverviewContext>({} as EventOverviewContext);
