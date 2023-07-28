import c from "@/components/EventOverview/eventOverview.module.scss"
import { api } from "@/utils/api";


import {
  CheckRounded,
  NotInterestedRounded,
  DoNotDisturbRounded,
  AddRounded,
  EditRounded
} from "@mui/icons-material";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useContext, useState } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";



const EventInvitation = () => {
  const ctx = useContext(EventOverviewContext);
  
  
  const [denyStep1, setDenyStep1] = useState(false);
  
  const { mutateAsync: denyInvitation } = api.invitation.deny.useMutation();
  const { mutateAsync: _joinEvent } = api.event.join.useMutation();
  const { mutateAsync: _leaveEvent } = api.event.leave.useMutation();

  
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
      eventId: ctx.event.id,
    });

    ctx.invalidate();
  }

  async function accept() {
    setLoading({ ...loading, accept: true });

    await _joinEvent({
      id: ctx.event.id,
    });

    ctx.invalidate();
  }

  async function leaveEvent() {
    if (!denyStep1) {
      setDenyStep1(true);
      setTimeout(() => setDenyStep1(false), 3000);
      return;
    }
    setDenyStep1(false);
    setLoading({ ...loading, accept: true });

    await _leaveEvent({
      id: ctx.event.id,
    });

    ctx.invalidate();
    setLoading({ ...loading, accept: false });
  }

  async function joinEvent() {
    setLoading({ ...loading, accept: true });

    await _joinEvent({
      id: ctx.event.id,
    });

    ctx.invalidate();
    setLoading({ ...loading, accept: false });
  }

  async function editEvent() {
    // TODO: implement
  }

  return (
    <div className={c.invitation}>
      <div className={c.invitationText}>
        { ctx.isAuthor ? "You are the author" : ctx.isInvited ? "Accept Invite" : (ctx.isParticipant ? "You are participating" : "You are not participating") }
      </div>
      <div className={c.buttonGroup}>
        {ctx.isInvited ? (
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
          !ctx.isAuthor ? (
            ctx.isParticipant ? (
              <button className={c.leaveBtn} onClick={leaveEvent} data-confirm={denyStep1}>
                {loading.accept ? <LoadingSpinner /> : <NotInterestedRounded />}
                <span className={c.buttonLabel}>{denyStep1 ? "Confirm" : "Leave"}</span>
              </button>
            ) : (
              <button className={c.joinBtn} onClick={joinEvent}>
                {loading.accept ? <LoadingSpinner /> : <AddRounded />}
                <span className={c.buttonLabel}>Join</span>
              </button>
            )
          ) : (
            <button className={c.joinBtn} onClick={editEvent}>
              {loading.accept ? <LoadingSpinner /> : <EditRounded />}
              <span className={c.buttonLabel}>Edit Event</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default EventInvitation;