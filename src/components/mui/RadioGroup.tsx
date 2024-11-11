import React from 'react'
import type { RadioGroupProps } from '@mui/material'
import { default as XRadioGroup } from "@mui/material/RadioGroup";

const RadioGroup: React.FC<RadioGroupProps> = props => {
  return <XRadioGroup {...props} />;
}

export default RadioGroup
