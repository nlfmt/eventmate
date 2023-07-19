import React, { useState } from "react";
import type { Event, User } from "@prisma/client";
import {
  CheckBoxOutlineBlankRounded,
  AddBoxRounded,
  DeleteOutlineRounded
} from "@mui/icons-material";
import c from "@/components/EventOverview/eventOverview.module.scss";
import Checkbox from "../Checkbox/Checkbox";


interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  assignedTo: string | null;
}

const EventChecklist: React.FC = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemAssignedTo, setNewItemAssignedTo] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (newItemText.trim() !== "") {
      const newItem: ChecklistItem = {
        id: checklistItems.length + 1,
        text: newItemText,
        completed: false,
        assignedTo: newItemAssignedTo.trim() !== "" ? newItemAssignedTo : null
      };

      setChecklistItems((prevItems) => [...prevItems, newItem]);
      setNewItemText("");
      setNewItemAssignedTo("");
      setError("");
    } else {
      setError("Bitte geben Sie einen Namen für den neuen Eintrag ein.");
    }
  };

  const handleItemToggle = (itemId: number) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteItem = (itemId: number) => {
    setChecklistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };


  return (
    <div className={c.checklist_Wrapper}>
      <h2>What we need:</h2>
      <div className={c.checklist}>
        {checklistItems.map((item) => (
          <div className={c.checklistItem} key={item.id}>
            <div className={c.itemLeft}>
              <Checkbox
                onClick={() => handleItemToggle(item.id)}
                className={item.completed ? c.completed : ""}
              />
              <p>{item.text}</p>
            </div>
            <div className={c.itemRight}>
              {item.assignedTo && (
                <p className={c.assignedTo}>{item.assignedTo}</p>
              )}
              <DeleteOutlineRounded
                onClick={() => handleDeleteItem(item.id)}
                className={c.deleteIcon}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={c.newItemWrapper}>
        <div className={c.newItem}>
          <AddBoxRounded onClick={handleAddItem} />
          <input
            type="text"
            placeholder="Neuer Eintrag"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Person zuweisen (optional)"
            value={newItemAssignedTo}
            onChange={(e) => setNewItemAssignedTo(e.target.value)}
          />
        </div>
        <div className={c.error}>
          {error && <p className={c.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default EventChecklist;
