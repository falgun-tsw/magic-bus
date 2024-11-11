import React from 'react'

import type { FormControlProps } from '@mui/material/FormControl'
import { default as XFormControl } from '@mui/material/FormControl'

const FormControl: React.FC<FormControlProps> = props => {
  return <XFormControl {...props} />
}

export default FormControl
