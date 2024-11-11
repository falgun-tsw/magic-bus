import React, { memo, useEffect, ReactNode } from "react";
import { Dialog as MDialog } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface DialogProps {
  openComponent?: (onClick: () => void) => ReactNode; // Change to accept a function with no parameters
  onOpen: () => void;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabledBackdropClick?: boolean;
  open?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  openComponent,
  onOpen,
  onClose,
  children,
  maxWidth = "sm",
  disabledBackdropClick = false,
  open = false,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const onClickOpenInside = () => {
    setDialogOpen(true);
    onOpen();
  };

  const onCloseInside = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if ((reason === 'backdropClick' || reason === 'escapeKeyDown') && disabledBackdropClick) {
      return;
    }
    setDialogOpen(false);
    onClose(event, reason);
  };

  const classes = useStyles();

  return (
    <>
      {openComponent ? openComponent(onClickOpenInside) : null}
      <MDialog
        onBackdropClick={() => false}
        disableEscapeKeyDown
        open={dialogOpen}
        onClose={onCloseInside}
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby="draggable-dialog-title"
        sx={{ borderRadius: "10px" }}
        classes={{ paper: classes.paper }}
      >
        {children}
      </MDialog>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "0px",
  },
  paper: {
    margin: 15,
    width: "100%",
    borderRadius: "14px !important",
  },
}));

export default memo(Dialog);
