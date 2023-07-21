import DotNavigation from "../DotNavigation";
import c from "./createEvent.module.scss";

const CreateEventHeading = ({ count }: { count: number }) => {
  return (
    <div className={c.center}>
      <h1 className={c.heading}>Create Event</h1>
    </div>
  );
};
export default CreateEventHeading;
