import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import c from "./createEvent.module.scss";
import cs from "@/styles/common.module.scss";
import { type Event } from "@prisma/client";
import { classes } from "@/utils/utils";
import Link from "next/link";

function Finished({ event }: { event: Event | null }) {
  return (
    <>
      <div className={c.container}>
        <div className={c.finishedContainer}>
          <h1 className={c.name}>Great! You have created a new event!</h1>
          <h2 className={c.inline_heading}>
            <CheckCircleOutlineIcon />
          </h2>
          {event && <Link
            href={`/event/${event?.id}`}
            className={classes(cs.submitButton, c.formSubmitButton)}
          >
            Go to Event Page
          </Link>}
        </div>
      </div>
    </>
  );
}
export default Finished;
