import * as RCheckbox from '@radix-ui/react-checkbox';
import c from './Checkbox.module.scss';
import { CheckRounded } from '@mui/icons-material';

const Checkbox = (props: RCheckbox.CheckboxProps) => (
  <RCheckbox.Root className={c.root}>
    <RCheckbox.Indicator className={c.indicator}>
      <CheckRounded />
    </RCheckbox.Indicator>
  </RCheckbox.Root>
);

export default Checkbox;