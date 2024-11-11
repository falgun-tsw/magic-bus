import React from 'react';

import type { GridProps } from '@mui/material/Grid';
import { default as XGrid } from '@mui/material/Grid';


const Grid: React.FC<GridProps> = (props) => {
    return <XGrid {...props}>{props.children}</XGrid>;
};

export default Grid;
