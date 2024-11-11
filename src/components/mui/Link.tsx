import React from 'react';

import type { LinkProps } from '@mui/material/Link';
import { default as XLink } from '@mui/material/Link';


const Link: React.FC<LinkProps> = (props) => {
    return <XLink {...props}>{props.children}</XLink>;
};

export default Link;
