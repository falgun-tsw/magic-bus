import React from 'react'

import type { MenuItemProps } from '@mui/material/MenuItem'
import { default as XMenuItem } from '@mui/material/MenuItem'

const MenuItem: React.FC<MenuItemProps> = props => {
  return <XMenuItem {...props} />
}

export default MenuItem
