import React from 'react'

import type { SelectProps } from '@mui/material/Select'
import { default as XSelect } from '@mui/material/Select'

const Select: React.FC<SelectProps> = props => {
  return <XSelect {...props} />
}

export default Select
