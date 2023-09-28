import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface CartToastProps {
  open: boolean;
  handleClose: (event?: React.SyntheticEvent, reason?: string) => void;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  time?: number;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CartToast({ open, handleClose, message, time = 1000, severity }: CartToastProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={time}
      onClose={() => handleClose()}
    >
      <div>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}
