import React from 'react'

import type { CardContentProps } from '@mui/material/CardContent'
import { default as XCardContent } from '@mui/material/CardContent'

const CardContent: React.FC<CardContentProps> = props => {
  return <XCardContent {...props}>{props.children}</XCardContent>
}

export default CardContent
