import React from 'react'

import type { CardProps } from '@mui/material/Card'
import { default as XCard } from '@mui/material/Card'

const Card: React.FC<CardProps> = props => {
  return <XCard {...props}>{props.children}</XCard>
}

export default Card
