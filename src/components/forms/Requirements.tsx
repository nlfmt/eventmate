import { type MouseEventHandler, useContext } from "react";
import c from "./createEvent.module.scss";
import CreateEventContext from "@/contexts/CreateEventContext";
import cs from "@/styles/common.module.scss";
import { classes } from "@/utils/utils";

function Requirements({ click }: { click: MouseEventHandler }) {
  const ctx = useContext(CreateEventContext);
  const isFilledOut = ctx?.state?.numberMax && ctx?.state?.contribution && ctx?.state?.price;
  const isButtonDisabled = (!isFilledOut);
  
  if (!ctx) return null;
  return (
    <>
      <div className={c.container}>
        <h1 className={c.name}>Requirements</h1>
        {/* <h2 className={c.inline_heading}>Number of Participants</h2> */}
        <form className={c.form}>
          <input
            type="number"
            name="numberMax"
            placeholder="Member Maximum"
            max="1000"
            required
            value={ctx.state.numberMax}
            onChange={(e) =>
              ctx.updateState({
                numberMax: parseInt(e.target.value, 10),
              })
            }
          />
          <input
            type="text"
            name="contribution"
            placeholder="Contribution"
            value={ctx.state.contribution}
            onChange={(e) =>
              ctx.updateState({
                contribution: e.target.value,
              })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="5€"
            value={ctx.state.price}
            onChange={(e) =>
              ctx.updateState({ price: e.target.value })
            }
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
export default Requirements;
