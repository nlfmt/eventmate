import c from "@/components/EventOverview/eventOverview.module.scss";
import { useContext, useState } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";
import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CloseRounded, CheckRounded, EditRounded } from "@mui/icons-material";

const EventDescription = () => {
  const { event } = useContext(EventOverviewContext);
  const ctx = useContext(EventOverviewContext);
  const [isEditingDescription, setIsEditingDescription] = React.useState(false);
  const [editedDescription, setEditedDescription] = useState(event.description);

  async function editDescription() {
    setIsEditingDescription(true);
  }

  async function handleDescriptionChange(e) {
    setEditedDescription(e.target.value);
  }

  async function handleSubmitDescription() {
    // TODO: Hier kannst du die API aufrufen, um die bearbeitete Beschreibung zu speichern
    // Zum Beispiel: api.updateEventDescription(event.id, editedDescription);
    setIsEditingDescription(false);
  }

  function handleCancelEditDescription() {
    setIsEditingDescription(false);
    setEditedDescription(event.description);
  }

  return (
    <div className={c.description}>
      <div className={c.descriptionTitle}>
        <h2>Description</h2>
        {ctx.isAuthor && (
          <button className={c.joinBtn} onClick={editDescription}>
            {isEditingDescription ? <LoadingSpinner /> : <EditRounded />}
          </button>
        )}
      </div>
      <div className={c.descriptionText}>
        {isEditingDescription ? (
          <>
            <div className={c.popupContainer}>
              <textarea
                className={c.descriptionInput}
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
              <div className={c.descriptionButtons}>
                <button className={c.joinBtn} onClick={handleSubmitDescription}>
                  <CheckRounded />Submit
                </button>
                <button className={c.joinBtn} onClick={handleCancelEditDescription}>
                  <CloseRounded />Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <span>{editedDescription}</span>
        )}
      </div>
    </div>
  );
};

export default EventDescription;
