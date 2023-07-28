import { useContext, type MouseEventHandler } from 'react';
import c from './createEvent.module.scss';
import CreateEventContext from '@/contexts/CreateEventContext';
import cs from "@/styles/common.module.scss";
import { classes } from '@/utils/utils';

const Plans = ({click }: { click: MouseEventHandler }) => {

 const ctx = useContext(CreateEventContext)
  const isEventInfoValid = ctx?.state?.eventInfo;
  const isButtonDisabled = (!isEventInfoValid);

 
  if (!ctx) return null
  return (
    <>
      <div className={c.container}>
        <h1 className={c.name}>What are you Planning?</h1>
        <form className={c.form}>
          <textarea
            className={c.eventInfo}
            name="eventInfo"
            placeholder="Event info"
            required
            value={ctx.state.eventInfo}
            onChange={(e) => ctx.updateState({ eventInfo: e.target.value })}
          />
          <button
            className={classes(cs.submitButton, c.formSubmitButton)}
            onClick={click}
            disabled={isButtonDisabled}
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
}
export default Plans;
