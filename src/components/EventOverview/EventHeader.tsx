import c from "@/components/EventOverview/eventOverview.module.scss"
import Router from "next/router"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ArrowBackRounded, CheckRounded, CloseRounded, EditRounded} from "@mui/icons-material";
import Link from "next/link";
import { useContext, useState } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";

import categories, { type Category } from "@/utils/categories";
import React from "react";


const EventHeader = () => {
  const { event } = useContext(EventOverviewContext);
  const ctx = useContext(EventOverviewContext);

  const { participants } = event;

  const allowed = 2;
  const titleParts = event.title.split("\n");
  let title = titleParts.slice(0, allowed).join("\n");
  
  if (titleParts.length > 3) title += " " + titleParts.slice(allowed).join(" ");

  const category =
    categories[event.category as Category] ?? categories["other"];
  const categoryName = category?.[0];
  const CategoryIcon = category?.[1];

  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [editedTitle, setEditedTitle] = useState(event.title);

  async function editTitle() {
    setIsEditingTitle(true);
  }

  async function handleTitleChange(e) {
    setEditedTitle(e.target.value);
  }

  async function handleSubmitTitle() {
    // TODO: Hier kannst du die API aufrufen, um die bearbeitete Beschreibung zu speichern
    // Zum Beispiel: api.updateEventDescription(event.id, editedDescription);
    setIsEditingTitle(false);
  }

  function handleCancelEditTitle() {
    setIsEditingTitle(false);
    setEditedTitle(event.title);
  }


  return (
    <div className={c.heading} data-header data-cat={event.category}>
      <div className={c.categories}>
        <div className={c.button}>
          <button onClick={()=> Router.back()} className={c.backButton}>
            <ArrowBackRounded />
          </button>
          <div className={c.tags}>
            {event.tags && event.tags.split(";").map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </div>
        </div>
        <div className={c.categoryIcon}>
          <CategoryIcon />
          <span>{categoryName}</span>
        </div>
      </div>
      <div className={c.title_Wrapper}>
        <span className={c.title}>
          {/* {title.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })} */}
          {ctx.isAuthor && 
            <button className={c.joinBtn} onClick={editTitle}>
              {isEditingTitle ? <LoadingSpinner /> : <EditRounded />}
            </button>
          }
        </span>
        <div className={c.title}>
          {isEditingTitle ? (
            <>
              <div className={c.popupContainer}>
                <textarea
                  className={c.descriptionInput}
                  value={editedTitle}
                  onChange={handleTitleChange}
                />
                <div className={c.descriptionButtons}>
                  <button className={c.joinBtn} onClick={handleSubmitTitle}>
                    <CheckRounded />Submit
                  </button>
                  <button className={c.joinBtn} onClick={handleCancelEditTitle}>
                    <CloseRounded />Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <span>{editedTitle}</span>
          )}
        </div>
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