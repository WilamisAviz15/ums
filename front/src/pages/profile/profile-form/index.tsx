import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import styles from "./ProfileForm.module.scss";
import authService from "../../auth/auth.service";
import { initialForm } from "./options";
import { ProfileInterface } from "../interfaces/profile.interface";
import profileService from "./profile.service";

const ProfileForm = () => {
  const [form, setForm] = useState<ProfileInterface>(initialForm);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    </div>
  );
};

export default ProfileForm;
