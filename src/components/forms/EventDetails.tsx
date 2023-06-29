import { MouseEventHandler, useContext, useState } from "react";
import c from "./createEvent.module.scss";
import cs from "@/styles/common.module.scss";
import CreateEventContext from "@/contexts/CreateEventContext";
import { today } from "@internationalized/date";
import Select from "@/components/Select/Select";

import categories, { type Category } from "@/utils/categories";
import { classes } from "@/utils/utils";

function EventDetails({ click }: { click: MouseEventHandler }) {
  const ctx = useContext(CreateEventContext)
 
  const isFilledOut = ctx?.state?.name && ctx?.state?.location && ctx?.state?.date && ctx?.state?.appt && ctx?.state?.category;
  const isButtonDisabled = (!isFilledOut);
 
 
 
  if (!ctx) return null
  return (
    <>
      <div className={c.container}>
        {/* <h1 className={c.name}>Event Details</h1> */}
        <form className={c.form}>
          <input type="text" name="name" placeholder="Event name" value={ctx.state.name} required onChange={e => ctx.setState({
            ...ctx.state, name: e.target.value
          })}/>
          <input type="text" name="location" placeholder="Location" value={ctx.state.location} required onChange={e => ctx.setState({
            ...ctx.state, location: e.target.value
          })}/>
          <div className={c.time}>
            <input
              type="date"
              id="start"
              name="date"
              placeholder="2018-07-22"
              min={today.toString()}
              max="9999-31-12"
              required
              value={ctx.state.date} 
              onChange={e => ctx.setState({
                ...ctx.state, date: e.target.value
              })}
              
            />
            <input
              type="time"
              id="appt"
              name="appt"
              min="09:00"
              max="18:00"
              required
              value={ctx.state.appt} 
              onChange={e => ctx.setState({
                ...ctx.state, appt: e.target.value
              })}
            />
          </div>
          <input type="text" name="tags" placeholder="Tags"
          value={ctx.state.tags} 
          onChange={e => ctx.setState({
            ...ctx.state, tags: e.target.value
          })} />
          <Select
            className={c.selectBox}
            value={ctx.state.category}
            allowEmpty
            onValueChange={(v) => ctx.setState({
              ...ctx.state, category: v
            })}
            placeholder="Select a Category..."
            options={Object.entries(categories).map((c) => {
              return { value: c[0], label: c[1][0] };
            })}
          />
          <button className={classes(cs.submitButton, c.formSubmitButton)} onClick={click} disabled={isButtonDisabled}>Next</button>
        </form>
      </div>
    </>
  );
}

export default EventDetails;
