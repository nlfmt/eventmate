import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"
import type { Event, User } from "@prisma/client";
import { api } from "@/utils/api";


import {
  CircleRounded,
  CheckRounded,
  NotInterestedRounded,
  DoNotDisturbRounded,
  PlusOneRounded,
  AddRounded
} from "@mui/icons-material";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";

export interface InvitationProps {
  event: Event & {
    _count: { participants: number };
  };
  isInvited: boolean;
  isParticipant: boolean;
  isAuthor: boolean;
}


const EventInvitation = (props: InvitationProps) => {
  const { event } = props;

  const { data: participants } = api.event.getParticipants.useQuery({ eventId: event.id })

  const [denyStep1, setDenyStep1] = useState(false);

  const { mutateAsync: denyInvitation } = api.invitation.deny.useMutation();
  const { mutateAsync: joinEvent } = api.event.join.useMutation();

  const [loading, setLoading] = useState({ accept: false, deny: false });


  async function deny() {
    if (!denyStep1) {
      setDenyStep1(true);
      setTimeout(() => setDenyStep1(false), 3000);
      return;
    }
    setDenyStep1(false);
    setLoading({ ...loading, deny: true });

    await denyInvitation({
      eventId: props.event.id,
    });

    // ctx?.invalidate();
  }

  async function accept() {
    setLoading({ ...loading, accept: true });

    await joinEvent({
      id: props.event.id,
    });

    // ctx?.invalidate();
  }



  return (
    <div className={c.invitation}>
      <div className={c.invitationText}>
        <h2>Einladung annehmen</h2>
        <div className={c.participants}>
          {participants && participants.length > 3 && (
            <span>
              {participants[0]?.username}, {participants[1]?.username} und{" "}
              {event._count.participants - 2} weitere Teilnehmer.
            </span>
          )}
        </div>
      </div>
      <div className={c.buttonGroup}>
        {props.isInvited ? (
          <>
            <button className={c.acceptBtn} onClick={accept}>
              {loading.accept ? <LoadingSpinner /> : <CheckRounded />}
              <span className={c.buttonLabel}>Accept</span>
            </button>
            <button
              className={c.denyBtn}
              data-confirm={denyStep1}
              onClick={deny}
            >
              {loading.deny ? <LoadingSpinner /> : <DoNotDisturbRounded />}
              <span className={c.buttonLabel}>
                {denyStep1 ? "Confirm" : "Deny"}
              </span>
            </button>
          </>
        ) : (
          !props.isAuthor &&
          (props.isParticipant ? (
            <button className={c.leaveBtn}>
              <NotInterestedRounded />
              <span className={c.buttonLabel}>Leave</span>
            </button>
          ) : (
            <button className={c.joinBtn}>
              <AddRounded />
              <span className={c.buttonLabel}>Join</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default EventInvitation;