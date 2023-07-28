import React, { useContext, useState } from "react";
import type { Event, Requirement, RequirementFulfillment, User } from "@prisma/client";
import {
  CheckBoxOutlineBlankRounded,
  AddBoxRounded,
  DeleteOutlineRounded,
  AddRounded,
  RemoveRounded
} from "@mui/icons-material";
import c from "@/components/EventOverview/EventChecklist.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import EventOverviewContext from "@/contexts/EventOverviewContext";
import { api } from "@/utils/api";
import { classes } from "@/utils/utils";
import { useSession } from "next-auth/react";

const ChecklistContext = React.createContext<(() => void)>(() => {});

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  assignedTo: string | null;
}

const EventChecklist: React.FC = () => {

  const { event, isAuthor } = useContext(EventOverviewContext);
  const [open, setOpen] = useState<string | null>(null);

  const { data: requirements, refetch } = api.requirement.get.useQuery({ eventId: event.id });

  return (
    <ChecklistContext.Provider value={refetch}>
      <div className={c.wrapper}>
        <h2>Checklist</h2>
        <div className={c.checklist}>
          {!requirements ? (
            <p>Loading</p>
          ) : (
            requirements.length === 0 ? (
              <p>No requirements</p>
            ) : requirements.map((req) => (
              <Requirement key={req.id} requirement={req} open={open} setOpen={setOpen} />
            ))
          )}
          {isAuthor && (<>
            <div className={c.placeholder} />
            <AddRequirementForm />
          </>)}
        </div>
      </div>
    </ChecklistContext.Provider>
  );
};

const AddRequirementForm = () => {
  const { event } = useContext(EventOverviewContext);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const disabled = !amount || !description;

  const { mutateAsync: addRequirement } = api.requirement.create.useMutation();
  const refetchRequirements = useContext(ChecklistContext);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await addRequirement({
      eventId: event.id,
      count: parseInt(amount),
      description
    });

    refetchRequirements();

    setAmount("");
    setDescription("");
  }

  return (
    <form className={classes(c.addForm, c.addRequirement)} onSubmit={onSubmit}>
      <input
        className={c.amount}
        data-small={!!amount}
        type="number"
        min="1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className={c.description}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={disabled}>Add</button>
    </form>
  );
}


type Fulfillment = { quantity: number, user: { username: string }, id: string };
interface RequirementProps {
  requirement: Requirement & {
    fulfillments: Fulfillment[]
  },
  open: string | null,
  setOpen: (v: string | null) => void,
}

const Requirement = ({ requirement, open, setOpen }: RequirementProps) => {
  const provided = requirement.fulfillments.reduce((acc, f) => acc + f.quantity, 0);
  const fulfilled = provided === requirement.count;
  const isOpen = open === requirement.id;

  const { isParticipant, isAuthor } = useContext(EventOverviewContext);
  const { mutateAsync: removeRequirement } = api.requirement.delete.useMutation();
  const refetchRequirements = useContext(ChecklistContext);

  async function remove() {
    await removeRequirement({ requirementId: requirement.id });
    refetchRequirements();
  }

  return (
    <div className={c.item}>
      <div className={c.info} onClick={() => {
        setOpen(isOpen ? null : requirement.id);
      }}>
        <span className={c.count} data-fulfilled={fulfilled}>
          <span className={c.l}>{provided}</span>
          <span>/</span>
          <span className={c.n}>{requirement.count}</span>
        </span>
        <span className={c.description}>{requirement.description}</span>
        {isAuthor && (
          <button className={c.removeBtn} onClick={remove}>Remove</button>
        )}
        {isOpen ? <RemoveRounded /> : <AddRounded />}
      </div>

      <div className={c.fulfillments} data-open={isOpen}>
        <div className={c.fullfillmentWrapper}>
          {requirement.fulfillments.map((f) => (
            <Fulfillment key={f.user.username} fulfillment={f} />
          ))}
          {!fulfilled && isParticipant && <AddFulfillmentForm requirementId={requirement.id} />}
        </div>
      </div>
    </div>
  );
}


const AddFulfillmentForm = ({ requirementId }: { requirementId: string }) => {
  const { event } = useContext(EventOverviewContext);
  const [amount, setAmount] = useState<string>("");
  const refetchRequirements = useContext(ChecklistContext);

  const disabled = !amount;

  const { mutateAsync: addFulfillment } = api.requirement.addFulfillment.useMutation();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await addFulfillment({
      requirementId,
      quantity: parseInt(amount)
    });

    refetchRequirements();

    setAmount("");
  }

  return (
    <form className={classes(c.addForm, c.addFulfillment)} onSubmit={onSubmit}>
      <input
        type="number"
        min="1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" disabled={disabled}>Provide</button>
    </form>
  );
}


interface FulfillmentProps {
  fulfillment: Fulfillment
}

const Fulfillment = ({ fulfillment }: FulfillmentProps) => {
  const { user, quantity } = fulfillment;
  const { data: session } = useSession();

  const { mutateAsync: removeFulfillment } = api.requirement.removeFulfillment.useMutation();
  const refetchRequirements = useContext(ChecklistContext);

  async function remove() {
    await removeFulfillment({ fulfillmentId: fulfillment.id });
    refetchRequirements();
  }

  return (
    <div className={c.fulfillment}>
      <span className={c.quantity}>{quantity}</span>
      <span>from</span>
      <span className={c.username}>{user.username}</span>
      {session?.user?.name === user.username && (
        <button className={c.removeBtn} onClick={remove}>Remove</button>
      )}
    </div>
  );
}

export default EventChecklist;
