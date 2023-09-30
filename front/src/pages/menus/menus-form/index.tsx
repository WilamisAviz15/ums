import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./MenusForm.module.scss";
import menusService from "../menus.service";
import { MenuInterface } from "../interfaces/menu.interface";
import { initialForm } from "./options";
import { MenuGroupInterface } from "../../menus-groups/interfaces/menu-group.interface";
import menusGroupsService from "../../menus-groups/menus-groups.service";

const MenusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<MenuInterface>(initialForm);
  const [menuGroup, setMenuGroup] = useState<MenuGroupInterface[]>([]);
  const [selectedMenuGroup, setSelectedMenuGroup] = useState("");

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await menusService.httpGetById(+id);
      setForm(res);
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
      if (id) {
        const res = await menusService.httpPut(form);
      } else {
        const res = await menusService.httpPost(form);
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
          <TextField
            label="Nome"
            variant="outlined"
            name="name"
            onChange={(v) => handleInputChange(v)}
            value={form.name}
          />
          <TextField
            label="Chave do menu"
            variant="outlined"
            name="menuKey"
            onChange={(v) => handleInputChange(v)}
            value={form.menuKey}
          />
          <TextField
            label="Rota"
            variant="outlined"
            name="route"
            onChange={(v) => handleInputChange(v)}
            value={form.route}
          />
          <TextField
            name="menuGroupId"
            value={id ? form.menuGroupId : selectedMenuGroup}
            fullWidth
            select
            label="Grupo de menu"
            onChange={(v) => handleSelectChange(v)}
          >
            {menuGroup.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={createMenu}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MenusForm;
