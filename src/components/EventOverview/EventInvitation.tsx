import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"
import type { Event, User } from "@prisma/client";
import { api } from "@/utils/api";


import {
  CircleRounded,
  CheckRounded,
  NotInterestedRounded
} from "@mui/icons-material";


export interface InvitationProps {
  event: Event & {
    _count: { participants: number };
  };
}


const EventInvitation = (props: InvitationProps) => {
  const { event } = props;

  const { data: participants } = api.event.getParticipants.useQuery({ eventId: event.id })


  return (
      <div className={c.invitation}>
        <div className={c.invitationText}>
          <h2>Einladung annehmen</h2>
          <div className={c.participants}>
            {(participants&& participants.length>3)&&(
              <span>
              {participants[0]?.username}, {participants[1]?.username} und {event._count.participants - 2} weitere Teilnehmer.
              </span>
            )}
          </div>
        </div>
        <div className={c.invitationField}>
          <button className={c.tick}>
            <div className={c.tickCircle}>
              <CircleRounded />
            </div>
            <div className={c.tickIcon}>
              <CheckRounded />
            </div>
          </button>
          <button className={c.cross}>
            <div className={c.crossCircle}>
              <CircleRounded />
            </div>
            <div className={c.crossIcon}>
              <NotInterestedRounded />
            </div>
          </button>
        </div>
      </div>
  );
}

export default EventInvitation;