import React, { useEffect, useState } from "react";
import { Button, Checkbox, IconButton, ListItemText, MenuItem, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./UsersForm.module.scss";
import usersService from "../users.service";
import { initialForm } from "./options";
import { UserInterface } from "../interfaces/user.interface";
import { RoleInterface } from "../../roles/interfaces/role.interface";
import rolesService from "../../roles/roles.service";
import authService from "../../auth/auth.service";

const MenusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<UserInterface>(initialForm);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ id: number }[]>([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      usersService.httpGetById(+id).then((res) => {
        setForm(res);
        if (res.roles) {
          const userRoles = res.roles.map((role) => ({ id: role.id } as { id: number }));
          setSelectedRoles(userRoles);
        }
      });
    };

    handleData();
    getRoles();
  }, []);

  const getRoles = async () => {
    const roles = await rolesService.httpGet();
    setRoles(roles);
  };

  const createUser = async () => {
    const userRoles = selectedRoles.map((role) => ({ userId: id ? +id : 0, roleId: role.id }));
    try {
      const formUser = {
        ...form,
        userRoles,
      };

      if (id) {
        const res = await usersService.httpPut(formUser);
      } else {
        delete formUser["confirmPassword"];
        const res = await usersService.httpPost(formUser);
      }
      navigate(-1);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  const handleChange = (event: any) => {
    setSelectedRoles(() => [...event.target.value.map((val: number) => ({ id: val }))]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const getSelectedRoleNames = () => {
    const selectedRoleNames: string[] = [];
    for (const roleId of selectedRoles) {
      const role = roles.find((r) => r.id === roleId.id);
      if (role) {
        selectedRoleNames.push(role.name!);
      }
    }
    return selectedRoleNames.join(", ");
  };

  const getRoleIds = () => selectedRoles.map((role) => role.id);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "password" && form.confirmPassword !== value) {
      setPasswordsMatch(false);
    } else if (name === "confirmPassword" && form.password !== value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Usuários - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <TextField label="Nome" variant="outlined" name="name" onChange={(v) => handleInputChange(v)} value={form.name} />
          <TextField label="Email" variant="outlined" name="email" onChange={(v) => handleInputChange(v)} value={form.email} />
          <TextField label="CPF" variant="outlined" name="cpf" onChange={(v) => handleInputChange(v)} value={form.cpf} />
          <TextField label="Matrícula" variant="outlined" name="register" onChange={(v) => handleInputChange(v)} value={form.register} />
          {!id && (
            <div className={styles.password}>
              <TextField type="password" name="password" value={form.password} fullWidth label="Senha" onChange={handlePasswordChange} />
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
            </div>
          )}
          <TextField
            select
            label="Perfis de acesso"
            variant="outlined"
            fullWidth
            SelectProps={{
              multiple: true,
              renderValue: () => getSelectedRoleNames(),
              value: getRoleIds(),
              onChange: handleChange,
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                <Checkbox checked={selectedRoles.some((selectedRole) => selectedRole.id === role.id)} />
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={createUser}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MenusForm;
