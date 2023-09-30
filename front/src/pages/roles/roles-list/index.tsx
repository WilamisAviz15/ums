import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import styles from "../Roles.module.scss";
import RolesRenderList from "./role-list";
import { RoleInterface } from "../interfaces/role.interface";
import rolesServices from "../roles.service";

const RolesList = () => {
  const [roles, setRoles] = useState<RoleInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getRoles = async () => {
      const res = await rolesServices.httpGet();
      setRoles(res);
    };
    getRoles();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.roles__title}>
        <h1>Perfis de acesso</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.roles__wrapper}>
        <RolesRenderList data={roles} setRoles={setRoles} />
      </div>
    </>
  );
};

export default RolesList;
