import React from "react";
import * as Select from "@radix-ui/react-select";
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded, CheckRounded } from "@mui/icons-material";

import c from "./Select.module.scss"
import { classes } from "@/utils/utils";
import OverlayContext from "@/contexts/OverlayContext";

interface SelectProps extends RadixSelectProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string; disabled?: boolean }[];
  allowEmpty?: boolean;
  className?: string;
}

const SelectComp = ({ label, options, placeholder, allowEmpty, className, ...props }: SelectProps) => {

  const [open, setOpen] = React.useState(false);
  const { setOverlay } = React.useContext(OverlayContext);

  return (
    <Select.Root
      open={open}
      onOpenChange={v => {
        setOpen(v);
        // For some reason we have to use a timeout to make the cards
        // ignore click events after the overlay is closed
        setTimeout(() => setOverlay(v), 0);
      }}
      {...props}
    >
      <Select.Trigger className={classes(c.SelectTrigger, className)} aria-label={label}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={c.SelectArrow}>
          <KeyboardArrowDownRounded />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={c.SelectContent}>
          <Select.ScrollUpButton className={c.SelectScrollButton}>
            <KeyboardArrowUpRounded />
          </Select.ScrollUpButton>
          <Select.Viewport className={c.SelectViewport}>
            {allowEmpty && (
              <SelectItem value="">
                {placeholder}
              </SelectItem>
            )}
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={c.SelectScrollButton}>
            <KeyboardArrowDownRounded />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef(({ children, ...props }: { children: React.ReactNode, value: string, disabled?: boolean }, forwardedRef: React.Ref<HTMLDivElement>) => {
  return (
    <Select.Item  {...props} className={c.SelectItem} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={c.SelectItemIndicator}>
        <CheckRounded />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectComp;
