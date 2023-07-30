import { ModalContext } from '@/components/Modal/Modal'
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import React, { useContext, useState } from 'react'

import c from "../eventOverview.module.scss"
import EventOverviewContext from '@/contexts/EventOverviewContext';
import { api } from '@/utils/api';
import Select from '@/components/Select/Select';
import categories, { Category } from '@/utils/categories';

const EditEventInfo = ({ onSubmit }: { onSubmit?: () => void }) => {

  const modal = useContext(ModalContext);
  const { event } = useContext(EventOverviewContext);
  const [editedDescription, setEditedDescription] = useState(event.description);
  const [editedTitle, setEditedTitle] = useState(event.title);
  const [editedTags, setEditedTags] = useState(event.tags);
  const [editedCategory, setEditedCategory] = useState(event.category);

  const { mutateAsync: updateEvent } = api.event.update.useMutation();

  async function onConfirm() {
    await updateEvent({
      id: event.id,
      description: editedDescription,
      title: editedTitle,
      tags: editedTags,
      category: editedCategory
    });
    modal.close();
    onSubmit?.();
  }

  return (
    <form className={c.dialogForm}>
      <h1 style={{ margin: 0 }}>Event Details</h1>  
      <div className={c.dialogInput}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          name='title'
          className={c.input}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      </div>
      <div className={c.dialogInput}>
        <label htmlFor="title">Tags</label>
        <input
          type="text"
          placeholder="Tags"
          className={c.input}
          value={editedTags}
          onChange={(e) => setEditedTags(e.target.value)}
        />
      </div>
      <div className={c.dialogInput}>
        <label htmlFor="title">Description</label>
        <textarea
          className={c.descriptionInput}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </div>
      <div className={c.dialogInput}>
        <label htmlFor="title">Category</label>
        <Select
          className={c.categorySelect}
          value={editedCategory}
          onValueChange={(v) => setEditedCategory(v as Category)}
          placeholder="Select a Category..."
          options={Object.entries(categories).map((c) => {
            return { value: c[0], label: c[1][0] };
          })}
        />
      </div>


      <div className={c.descriptionButtons}>
        <button
          className={c.cancelButton}
          onClick={() => {
            setEditedDescription(event.description);
            modal.close();
          }}
        >
          <CloseRounded />
          Cancel
        </button>
        <button className={c.submitButton} onClick={onConfirm}>
          <CheckRounded />
          Submit
        </button>
      </div>
    </form>
  );
}

export default EditEventInfo

/*
- Event Details
capacity
price
private

- Location & Time
date
latitude
longitude

- Event Info
title
description
category
*/