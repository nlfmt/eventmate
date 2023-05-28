import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"


interface ItemProps {
  name: string;
  assignedTo: string | null;
}


const EventChecklist = (props: ItemProps) => {
  return (
      <div className={c.checklist}>
         <h2>Was wir brauchen:</h2>
        
      </div>
  );
}

export default EventChecklist;

