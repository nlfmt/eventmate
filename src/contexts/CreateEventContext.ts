import { type Dispatch, type SetStateAction, createContext } from "react";

export type FullEventInfo = {
  name: string 
  location: string
  date: string
  appt: string
  tags: string
  eventInfo: string
  numberMin: number
  numberMax: number
  contribution: string
  price: string
  private: boolean
  category: string
}

export type EventInfo = Partial<FullEventInfo>;

interface CreateEventContext {
  state: EventInfo
  setState: Dispatch<SetStateAction<EventInfo>>
  
}
export default createContext<CreateEventContext | null>(null);
