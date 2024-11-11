import React from "react";
import { Stack as MStack, StackProps } from '@mui/material'; // Import Stack and its props from MUI


const Stack: React.FC<StackProps> = (props) => {
    return (
        <MStack {...props} />
    );
}

export default React.memo(Stack);