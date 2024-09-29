import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import authService from "../../pages/auth/auth.service";
import modalPaymentService from "./modal-payment.service";

export default function ModalPayment({ openModal, setOpenModal }: { openModal: boolean; setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const initializeForm = () => {
    return {
      name: authService.getUser().name,
      cpf: authService.getUser().cpf,
      price: 0.0,
    };
  };

  const [form, setForm] = useState<{ name: string; cpf: string; price: number }>(initializeForm());
  const [qrCodePix, setQrCodePix] = useState<{ imagemQrcode: string; qrcode: string }>();

  useEffect(() => {
    if (!openModal) {
      setForm(initializeForm());
      setQrCodePix({ imagemQrcode: "", qrcode: "" });
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

  const handleGenerateQRCode = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const finalForm = {
      ...form,
      price: parseFloat(form.price.toString()).toFixed(2),
    };

    const response = await modalPaymentService.httpPost(finalForm);

    const { imagemQrcode, qrcode } = response;

    if (response) {
      setQrCodePix({ imagemQrcode, qrcode });
    }
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
        Adicionar saldo na carteira
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
        <form onSubmit={handleGenerateQRCode}>
          {!qrCodePix?.imagemQrcode && !qrCodePix?.qrcode && (
            <TextField name="price" type="number" inputProps={{ min: 0 }} value={form.price} fullWidth label="Valor" onChange={handleInputChange} />
          )}
          {qrCodePix?.imagemQrcode && qrCodePix.qrcode && (
            <div style={{ backgroundColor: "#ff6b00", textAlign: "center", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
              <p style={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>Leia ou copie o QR Code Pix e pague utilizando o aplicativo do seu banco.</p>
              <div style={{ backgroundColor: "white", padding: "10px", display: "inline-block" }}>
                <img src={qrCodePix.imagemQrcode} alt="QR Code" style={{ width: "200px", height: "200px" }} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#ff6b00",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    border: "1px solid #ff6b00",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() => navigator.clipboard.writeText(qrCodePix.qrcode)}
                  startIcon={<i className="fa fa-copy" />}
                >
                  Copiar código
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
      {!qrCodePix?.imagemQrcode && !qrCodePix?.qrcode && (
        <DialogActions sx={{ padding: "10px 24px" }}>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleGenerateQRCode()} color="primary" variant="contained">
            Gerar pagamento Pix
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
