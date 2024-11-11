import React from 'react';

import type { TypographyProps } from '@mui/material/Typography';
import { default as XTypography } from '@mui/material/Typography';


const Typography: React.FC<TypographyProps> = (props) => {
    return <XTypography {...props}>{props.children}</XTypography>;
};

export default Typography;
