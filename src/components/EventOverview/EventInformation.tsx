import c from "@/components/EventOverview/eventOverview.module.scss"
import React, { useContext, useState } from 'react';


import dayjs from "dayjs";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  GroupRounded,
  EventNoteRounded,
  WatchLater,
  EditRounded,
  CheckRounded,
  CloseRounded
} from "@mui/icons-material";
import EventLocation from "./EventLocation";
import EventOverviewContext from "@/contexts/EventOverviewContext";


const EventInformation = () => {
  const ctx = useContext(EventOverviewContext);
  
  const [isEditingDate, setIsEditingDate] = React.useState(false);
  const [editedDate, setEditedDate] = useState(ctx.event.date);

  const [isEditingTime, setIsEditingTime] = React.useState(false);
  const [editedTime, setEditedTime] = useState(ctx.event.time);

  const [isEditingParticipants, setIsEditingParticipants] = React.useState(false);
  const [editedParticipants, setEditedParticipants] = useState(ctx.event.participants);



  const event = ctx.event;
  const latitude = event.latitude;
  const longitude = event.longitude;

  async function editDate() {
    setIsEditingDate(true);
  }

  async function handleDateChange(date) {
    setEditedDate(date);
  }

  async function handleSubmitDate() {
    // TODO: Hier kannst du die API aufrufen, um das bearbeitete Datum zu speichern
    // Zum Beispiel: api.updateEventDate(event.id, editedDate);
    setIsEditingDate(false);
  }

  function handleCancelEditDate() {
    setIsEditingDate(false);
    setEditedDate(event.date);
  }

  async function editTime() {
    setIsEditingTime(true);
  }

  async function handleTimeChange(time) {
    setEditedTime(time);
  }

  async function handleSubmitTime() {
    // TODO: Hier kannst du die API aufrufen, um das bearbeitete Datum zu speichern
    // Zum Beispiel: api.updateEventDate(event.id, editedDate);
    setIsEditingTime(false);
  }

  function handleCancelEditTime() {
    setIsEditingTime(false);
    setEditedTime(event.time);
  }

  async function editParticipants() {
    setIsEditingParticipants(true);
  }

  async function handleParticipantsChange(participants) {
    setEditedParticipants(participants);
  }

  async function handleSubmitParticipants() {
    // TODO: Hier kannst du die API aufrufen, um das bearbeitete Datum zu speichern
    // Zum Beispiel: api.updateEventDate(event.id, editedDate);
    setIsEditingParticipants(false);
  }

  function handleCancelEditParticipants() {
    setIsEditingParticipants(false);
    setEditedParticipants(event.capacity);
  }

  return (
      <div className={c.information}>
          {/* <div className={c.infoItem}>
            <LocationOnRounded />
            {(latitude && longitude) && <EventLocation />}
            <span>location</span>
          </div> */}

          <div className={c.leftInfo}>
            <div className={c.infoBox}>
              <EventNoteRounded />
              <div className={c.infoItem}>
                {/* <span>{dayjs(event.date).format("DD.MM.YYYY")}</span> */}
                {ctx.isAuthor && 
                  <button className={c.joinBtn} onClick={editDate}>
                    {isEditingDate ? <LoadingSpinner /> : <EditRounded />}
                  </button>
                }
                {/* <div className={c.editItem}>
                  {isEditingDate ? (
                      <>
                        <div className={c.popupContainer}>
                          <div className={c.datePickerContainer}>
                            <input
                              className={c.datePickerInput}
                              type="date"
                              value={dayjs(editedDate).format("YYYY-MM-DD")}
                              onChange={(e) => handleDateChange(e.target.value)}
                            />
                          </div>
                          <div className={c.descriptionButtons}>
                            <button className={c.joinBtn} onClick={handleSubmitDate}>
                              <CheckRounded />Submit
                            </button>
                            <button className={c.joinBtn} onClick={handleCancelEditDate}>
                              <CloseRounded />Cancel
                            </button>
                          </div>
                        </div>
                      </>
                    ): (
                      <span>{dayjs(editedDate).format("DD.MM.YYYY")}</span>
                    )}
                </div> */}
              </div>
            </div>
            <div className={c.infoBox}>
              <WatchLater />
              <div className={c.infoItem}>
                {/* <span>{dayjs(event.date).format("HH:mm")}</span> */}
                {ctx.isAuthor && 
                  <button className={c.joinBtn} onClick={editTime}>
                    {isEditingTime ? <LoadingSpinner /> : <EditRounded />}
                  </button>
                }
                {/* <div className={c.editItem}>
                  {isEditingTime ? (
                      <>
                        <div className={c.popupContainer}>
                          <div className={c.datePickerContainer}>
                            <input
                              className={c.datePickerInput}
                              type="time"
                              value={dayjs(editedTime).format("HH:mm")}
                              onChange={(e) => handleTimeChange(e.target.value)}
                            />
                          </div>
                          <div className={c.descriptionButtons}>
                            <button className={c.joinBtn} onClick={handleSubmitTime}>
                              <CheckRounded />Submit
                            </button>
                            <button className={c.joinBtn} onClick={handleCancelEditTime}>
                              <CloseRounded />Cancel
                            </button>
                          </div>
                        </div>
                      </>
                    ): (
                      <span>{dayjs(editedTime).format("HH:mm")}</span>
                    )}
                </div> */}
              </div>
            </div>
            <div className={c.infoBox}>
              <GroupRounded />
              <div className={c.infoItem}>
                {/* <span>
                  {event._count.participants}/{event.capacity}
                </span> */}
                {ctx.isAuthor && 
                  <button className={c.joinBtn} onClick={editParticipants}>
                    {isEditingParticipants ? <LoadingSpinner /> : <EditRounded />}
                  </button>
                }
                {/* <div className={c.editItem}>
                  {isEditingParticipants ? (
                      <>
                        <div className={c.popupContainer}>
                          <div className={c.datePickerContainer}>
                            <input
                              className={c.datePickerInput}
                              type="number"
                              value={editedParticipants}
                              onChange={(e) => handleParticipantsChange(e.target.value)}
                            />
                          </div>
                          <div className={c.descriptionButtons}>
                            <button className={c.joinBtn} onClick={handleSubmitParticipants}>
                              <CheckRounded />Submit
                            </button>
                            <button className={c.joinBtn} onClick={handleCancelEditParticipants}>
                              <CloseRounded />Cancel
                            </button>
                          </div>
                        </div>
                      </>
                    ): (
                      <span>
                        {event._count.participants}/{editedParticipants}
                      </span>
                    )}
                </div> */}
              </div>
            </div>
          </div>
          {(latitude && longitude) && (
            <EventLocation />
          )}

        {/* <div className={c.infoMap}>
          <div className={c.map}>
          </div>
        </div> */}
      </div>
  );
}

export default EventInformation;