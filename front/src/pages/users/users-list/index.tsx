import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import styles from "../Users.module.scss";
import { UserInterface } from "../interfaces/user.interface";
import usersService from "../users.service";
import UserRenderList from "./user-list";

const UsersList = () => {
  const [users, setUsers] = useState<UserInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      const res = await usersService.httpGet();
      setUsers(res);
    };
    getUsers();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.users__title}>
        <h1>Usuários</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.users__wrapper}>
        <UserRenderList data={users} setUsers={setUsers} />
      </div>
    </>
  );
};

export default UsersList;
