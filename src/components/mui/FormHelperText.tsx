import React from 'react'

import type { FormHelperTextProps } from '@mui/material/FormHelperText'
import { default as XFormHelperText } from '@mui/material/FormHelperText'

const FormHelperText: React.FC<FormHelperTextProps> = props => {
  return <XFormHelperText {...props} />
}

export default FormHelperText
