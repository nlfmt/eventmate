import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"

import {
  CheckBoxOutlineBlankRounded,
  AddBoxRounded
} from "@mui/icons-material";


interface ItemProps {
  name: string;
  assignedTo: string | null;
}


const EventChecklist = (props: ItemProps) => {
  return (
      <div className={c.checklist_Wrapper}>
        <h2>Was wir brauchen:</h2>
        <div className={c.checklist}>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Pichnickdecke</p>
            <p>@Nadine</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Wasser</p>
            <p>hier eintragen</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Cola</p>
            <p>@Tom</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Bretzeln</p>
            <p>hier eintragen</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Kuchen</p>
            <p>@Julia</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Kekse</p>
            <p>hier eintragen</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Fußball</p>
            <p>hier eintragen</p>
          </div>
          <div className={c.checklistItem}>
            <CheckBoxOutlineBlankRounded />
            <p>Musikbox</p>
            <p>@Alex</p>
          </div>
        </div>
        <AddBoxRounded />
      </div>
  );
}

export default EventChecklist;

