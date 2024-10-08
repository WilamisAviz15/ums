import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import styles from "./ProfileForm.module.scss";
import authService from "../../auth/auth.service";
import { initialForm } from "./options";
import { ProfileInterface } from "../interfaces/profile.interface";
import profileService from "./profile.service";
import CardUI from "../../../components/card-ui";
import { Link } from "react-router-dom";
import ModalPayment from "../../../components/modal-payment";

const ProfileForm = () => {
  const [form, setForm] = useState<ProfileInterface>(initialForm);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    setForm(user);
  }, []);

  const updateProfile = async () => {
    if (!passwordsMatch) return;

    try {
      const res = await profileService.httpPut(form);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "newPassword" && form.confirmPassword !== value) {
      setPasswordsMatch(false);
    } else if (name === "confirmPassword" && form.newPassword !== value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Perfil - Editar</h1>
      </div>
      <form>
        <div>
          <TextField name="name" value={form.name} fullWidth label="Nome" onChange={(v) => handleInputChange(v)} />
          <TextField name="email" value={form.email} disabled={true} fullWidth label="Email" />
          <TextField name="register" value={form.register} disabled={true} fullWidth label="Matrícula" />
          <TextField type="password" name="password" value={form.password} fullWidth label="Senha atual" onChange={(v) => handleInputChange(v)} />
          <TextField type="password" name="newPassword" value={form.newPassword} fullWidth label="Nova senha" onChange={handlePasswordChange} />
          <TextField
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            fullWidth
            label="Repetir senha"
            onChange={handlePasswordChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? "As senhas não coincidem" : ""}
          />
          <Button variant="contained" color="primary" onClick={updateProfile}>
            Atualizar dados
          </Button>
        </div>
      </form>
      <div className={styles.title}>
        <h1>Minha Carteira Digital</h1>
      </div>
      <div>
        <CardUI
          key={1}
          title={""}
          isCardHeaderEnabled={false}
          customStyles={{
            width: "30%",
            backgroundColor: "#3f51b5",
            borderRadius: "25px",
          }}
          extraText={
            <div className={styles.wallet}>
              <h2>Saldo</h2>
              <h1>R$0,00</h1>
              <div className={styles.actions}>
                <Button variant="outlined" style={{ backgroundColor: "#fff" }} onClick={() => setOpenPaymentModal(true)}>
                  Adicionar Saldo
                </Button>
              </div>
              <Link to="">Meu histórico de transações</Link>
            </div>
          }
          iconButton={false}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
        <ModalPayment openModal={openPaymentModal} setOpenModal={setOpenPaymentModal} />
      </div>
    </div>
  );
};

export default ProfileForm;
