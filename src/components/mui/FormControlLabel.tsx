import React from 'react';

import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { default as XFormControlLabel } from '@mui/material/FormControlLabel';

const FormControlLabel: React.FC<FormControlLabelProps> = (props) => {
    return <XFormControlLabel {...props} />;
};

export default FormControlLabel;
