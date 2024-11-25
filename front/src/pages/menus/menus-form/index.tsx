import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, TextField, Checkbox, FormControlLabel, ListItemText } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./MenusForm.module.scss";
import menusService from "../menus.service";
import { MenuInterface } from "../interfaces/menu.interface";
import { initialForm } from "./options";
import { MenuGroupInterface } from "../../menus-groups/interfaces/menu-group.interface";
import menusGroupsService from "../../menus-groups/menus-groups.service";
import { RoleInterface } from "../../roles/interfaces/role.interface";
import rolesService from "../../roles/roles.service";

const MenusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<MenuInterface>(initialForm);
  const [menuGroup, setMenuGroup] = useState<MenuGroupInterface[]>([]);
  const [selectedMenuGroup, setSelectedMenuGroup] = useState("");
  const [actionsMenu, setActionsMenu] = useState<number[]>([]);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const handleData = async () => {
      await rolesService.httpGet().then((res) => {
        if (res) {
          setRoles(res);
        }
      });
      if (!id) return;
      const res = await menusService.httpGetById(+id);
      setForm(res);
      const apiResponse = [1, 2];
      setActionsMenu(apiResponse);
    };

    handleData();
    getMenuGroups();
  }, []);

  const getMenuGroups = async () => {
    const menuGroups = await menusGroupsService.httpGet();
    setMenuGroup(menuGroups);
  };

  const createMenu = async () => {
    try {
      const updatedForm = { ...form };
      if (id) {
        await menusService.httpPut(updatedForm);
      } else {
        await menusService.httpPost(updatedForm);
      }
      navigate(-1);
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedMenuGroup(event.target.value);
    handleInputChange(event);
  };

  const handleCheckboxChange = (value: number) => {
    if (actionsMenu.includes(value)) {
      setActionsMenu(actionsMenu.filter((action) => action !== value));
    } else {
      setActionsMenu([...actionsMenu, value]);
    }
  };

  const isChecked = (value: number) => actionsMenu.includes(value);

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

  const handleChange = (event: any) => {
    setSelectedRoles(() => [...event.target.value.map((val: number) => ({ id: val }))]);
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Menus - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <TextField label="Nome" variant="outlined" name="name" onChange={(v) => handleInputChange(v)} value={form.name} />
          <TextField label="Chave do menu" variant="outlined" name="menuKey" onChange={(v) => handleInputChange(v)} value={form.menuKey} />
          <TextField label="Rota" variant="outlined" name="route" onChange={(v) => handleInputChange(v)} value={form.route} />
          <TextField name="menuGroupId" value={id ? form.menuGroupId : selectedMenuGroup} fullWidth select label="Grupo de menu" onChange={(v) => handleSelectChange(v)}>
            {menuGroup.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <div>
            <div>
              <h3>Ações do menu</h3>
            </div>
            <FormControlLabel control={<Checkbox checked={isChecked(1)} onChange={() => handleCheckboxChange(1)} />} label="MENU" />
            <FormControlLabel control={<Checkbox checked={isChecked(2)} onChange={() => handleCheckboxChange(2)} />} label="LISTAR" />
            <FormControlLabel control={<Checkbox checked={isChecked(3)} onChange={() => handleCheckboxChange(3)} />} label="INCLUIR" />
            <FormControlLabel control={<Checkbox checked={isChecked(4)} onChange={() => handleCheckboxChange(4)} />} label="EDITAR" />
            <FormControlLabel control={<Checkbox checked={isChecked(5)} onChange={() => handleCheckboxChange(5)} />} label="EXCLUIR" />
          </div>
          <div>
            <div>
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
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={createMenu}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MenusForm;
