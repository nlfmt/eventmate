import React from "react"
import c from "./ToggleButton.module.scss"
import * as Toggle from '@radix-ui/react-toggle';

// interface ToggleButtonProps extends Toggle.ToggleProps {

// }

const ToggleButton = (props: Toggle.ToggleProps) => (
  <Toggle.Root className={c.toggle} {...props}>
  </Toggle.Root>
);

export default ToggleButton;