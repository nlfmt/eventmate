import { PersonAddRounded } from "@mui/icons-material";
import c from "./createEvent.module.scss";
import cs from "@/styles/common.module.scss"
import { MouseEventHandler, useContext } from "react";
import CreateEventContext from "@/contexts/CreateEventContext";
import Checkbox from "@/components/Checkbox/Checkbox";
import { classes } from "@/utils/utils";

function Invited({click, createEvent }: { click: MouseEventHandler, createEvent: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  const ctx = useContext(CreateEventContext);
  if (!ctx) return null;
  return (
    <div className={c.container}>
      <h1 className={c.name}>Who is invited?</h1>
      <form className={c.form}>
        <div className={c.time}>
          <Checkbox
            label="Private"
            className={c.checkbox}
            checked={ctx.state.private}
            onCheckedChange={(v) => {
              ctx.setState({
                ...ctx.state,
                private: v,
              });
            }}
          />
        </div>
        <button type="button" className={classes(c.submitButton, c.formSubmitButton)}>
          <PersonAddRounded /> Invite a friend
        </button>
        <button
          className={classes(cs.submitButton, c.formSubmitButton)}
          onClick={createEvent}
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
export default Invited;
