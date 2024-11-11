import React from 'react';

import type { CheckboxProps } from '@mui/material/Checkbox';
import { default as XCheckbox } from '@mui/material/Checkbox';

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return <XCheckbox {...props} />;
};

export default Checkbox;
