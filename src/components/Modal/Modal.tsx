import React, { useState } from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { classes } from '@/utils/utils';

import c from "./Modal.module.scss"
import { CloseRounded } from '@mui/icons-material';

export interface ModalProps {
  children: React.ReactNode;
  triggerContent?: React.ReactNode;
  triggerClass?: string;
  className?: string;
  onClose?: () => void;
}

export const ModalContext = React.createContext<{ close: () => void, open: () => void }>({
  close: () => {},
  open: () => {},
});

const Modal = ({ children, className, triggerClass, triggerContent, onClose }: ModalProps) => {

  const [open, setOpen] = useState(false);


  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
      }}
    >
      <Dialog.Trigger asChild>
        <button className={classes(c.trigger, triggerClass)}>
          {triggerContent}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={c.overlay} />
        <Dialog.Content className={classes(c.content, className)}>
          <ModalContext.Provider
            value={{
              close: () => {
                setOpen(false);
                onClose?.();
              },
              open: () => setOpen(true),
            }}
          >
            <Dialog.Close asChild>
              <button className={c.iconButton} aria-label="Close">
                <CloseRounded />
              </button>
            </Dialog.Close>
            {children}
          </ModalContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal