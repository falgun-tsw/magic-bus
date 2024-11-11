import React from 'react'

import type { InputLabelProps } from '@mui/material/InputLabel'
import { default as XInputLabel } from '@mui/material/InputLabel'

const InputLabel: React.FC<InputLabelProps> = props => {
  return <XInputLabel {...props} />
}

export default InputLabel
