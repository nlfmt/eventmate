import * as RCheckbox from '@radix-ui/react-checkbox';
import c from './Checkbox.module.scss';
import { CheckRounded } from '@mui/icons-material';
import { classes } from '@/utils/utils';

export interface CheckboxProps extends RCheckbox.CheckboxProps {
  className?: string;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = ({className, label, ...props}: CheckboxProps) => (
    <RCheckbox.Root
      className={classes(c.checkbox, className)}
      onCheckedChange={v => props.onCheckedChange?.(v != "indeterminate" && v)}
      {...props}
    >
      <div className={c.indicator} data-indicator>
        <RCheckbox.Indicator>
          <CheckRounded />
        </RCheckbox.Indicator>
      </div>

      {label && <span data-label>{label}</span>}
      
    </RCheckbox.Root>
);

export default Checkbox;