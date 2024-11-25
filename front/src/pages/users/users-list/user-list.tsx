import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns-tz";

import CardUI from "../../../components/card-ui";
import styles from "./Users.module.scss";
import { UserInterface } from "../interfaces/user.interface";
import userService from "../users.service";
import { Chip } from "@mui/material";

const UserRenderList = ({ data, setUsers }: { data: UserInterface[] | undefined; setUsers: React.Dispatch<React.SetStateAction<UserInterface[] | undefined>> }) => {
  const navigate = useNavigate();
  const editAction = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await userService.httpDelete(id);
    setUsers((oldUsers) => oldUsers?.filter((item) => item.id !== id));
  };

  const getUserRoles = (item: UserInterface) => {
    return item.roles?.map((role) => <Chip label={role.name} />);
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name}
          customStyles={{ borderTop: "6px solid rgba(21, 101, 192, 0.9)" }}
          extraText={
            <span className={styles.extraText}>
              <span>Email: {item.email}</span>
              <br />
              <span>CPF: {item.cpf}</span>
              <br />
              {getUserRoles(item)}
            </span>
          }
          onEditClick={() => editAction(item.id)}
          onDeleteClick={() => deleteAction(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default UserRenderList;
