import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import authService from "../../pages/auth/auth.service";
import { verifyVariabilityActive } from "../../shared/utils/utils";

export default function ModalInfoPayment({
  schedule,
  openModal,
  setOpenModal,
}: {
  schedule: any;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initializeForm = () => {
    return {
      name: authService.getUser().name,
      cpf: authService.getUser().cpf,
      price: 0.0,
    };
  };

  const [form, setForm] = useState<{ name: string; cpf: string; price: number }>(initializeForm());
  const [activeOptions, setActiveOptions] = useState<string[]>([]);

  useEffect(() => {
    console.log(">>>", schedule);
    const options = verifyVariabilityActive("PaymentsModule");
    setActiveOptions(options);
  }, []);

  useEffect(() => {
    if (!openModal) {
      setForm(initializeForm());
    }
  }, [openModal]);

  const handleClose = () => setOpenModal(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Dialog
      open={openModal}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      disableEscapeKeyDown={true}
      fullWidth={true}
      maxWidth="sm"
      sx={{ zIndex: 3000 }}
    >
      <DialogTitle>
        Pagamento de Refeição
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: "20px" }}>
        <form onSubmit={() => {}}></form>
      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px" }}>
        <Button onClick={() => {}} color="primary" variant="contained">
          Realizar pagamento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
