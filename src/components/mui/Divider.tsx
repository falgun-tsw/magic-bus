import React from 'react'

import type { DividerProps } from '@mui/material/Divider'
import { default as XDivider } from '@mui/material/Divider'

const Divider: React.FC<DividerProps> = props => {
  return <XDivider {...props}>{props.children}</XDivider>
}

export default Divider
