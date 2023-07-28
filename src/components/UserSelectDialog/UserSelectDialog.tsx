import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import c from './UserSelectDialog.module.scss';
import { api } from '@/utils/api';
import { AddRounded, CheckRounded, CloseRounded, PersonSearchRounded } from '@mui/icons-material';
import { classes } from '@/utils/utils';


interface UserSelectDialogProps {
  /** If you can select multiple users in the dialog */
  multiple?: boolean;
  /** The text to show on the trigger when nothing is selected */
  emptyText?: React.ReactNode;
  /** An array of selected usernames */
  selected: string[];
  /** A function to set the selected usernames */
  setSelected: (selected: string[]) => void;
  className?: string;
}

/** A popup dialog that lets you select one or many users */
const UserSelectDialog = ({ multiple, selected, setSelected, emptyText, className }: UserSelectDialogProps) => {
  
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const title = multiple ? "Select Users" : "Select User";

  const resultsRef = React.useRef<HTMLDivElement>(null);

  const { data } = api.search.user.useQuery({
    query,
    page: 1,
    pageSize: 10,
  }, { enabled: query.length > 1, onSuccess: () => {
    setTimeout(() => {
      // scroll to bottom
      if (resultsRef.current) resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }, 1);
  } });

  function add(username: string) {
    if (multiple) {
      setSelected([...selected, username]);
    } else {
      setSelected([username]);
    }
  }

  function remove(username: string) {
    setSelected(selected.filter(u => u !== username));
  }

  return (
    <Dialog.Root open={open} onOpenChange={v => {
      setQuery("");
      setOpen(v);
    }}>
      <Dialog.Trigger asChild>
        <button className={classes(c.trigger, className)}>
          {selected.length == 0 ? (
            emptyText ?? `Select ${multiple ? "Users" : "User"}`
            ) : (
              multiple ? `${selected.length} User${selected.length > 1 ? "s" : ""} selected` : selected[0]
            )
          }
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={c.overlay} />
        <Dialog.Content className={c.content}>
          <header className={c.header}>
            <Dialog.Title className={c.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={c.iconButton} aria-label="Close">
                <CloseRounded />
              </button>
          </Dialog.Close>
          </header>
          {/* <Dialog.Description className={c.description}>
            Search for users to select them
          </Dialog.Description> */}
          <div className={c.searchInput}>
            <PersonSearchRounded />
            <input
              id="query"
              placeholder="Search for a User"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={c.results} ref={resultsRef}>
            {selected.map(u => (
              <div key={u} data-selected onClick={() => remove(u)}>
                {u}
                <CheckRounded />
              </div>
            ))}
            {data && (
              data.users
                .filter(u => !selected.includes(u.username))
                .map(u => (
                  <div key={u.username} onClick={() => add(u.username)}>
                    {u.username}
                    <AddRounded />
                  </div>
                ))
            )}
          </div>
          <Dialog.Close asChild>
            <button className={c.closeBtn}>Done</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
  }

export default UserSelectDialog;