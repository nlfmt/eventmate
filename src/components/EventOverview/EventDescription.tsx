import c from "@/components/EventOverview/eventOverview.module.scss";
import { useContext, useState } from "react";
import EventOverviewContext from "@/contexts/EventOverviewContext";
import React from "react";

const EventDescription = () => {
  const { event } = useContext(EventOverviewContext);

  return (
    <div className={c.description}>
      <div className={c.descriptionTitle}>
        <h2>Description</h2>
      </div>
      <div className={c.descriptionText}>
        <span>{event.description}</span>
      </div>
    </div>
  );
};

export default EventDescription;
