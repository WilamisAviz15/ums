import React from "react";
import { useNavigate } from "react-router-dom";

import CardUI from "../../../components/card-ui";
import rolesService from "../roles.service";
import { RoleInterface } from "../interfaces/role.interface";

const RolesRenderList = ({
  data,
  setRoles,
}: {
  data: RoleInterface[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<RoleInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editRoles = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteRoles = async (id: number | undefined) => {
    if (!id) return;
    await rolesService.httpDelete(id);
    setRoles((oldRoles) => oldRoles?.filter((item) => item.id !== id));
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name}
          onEditClick={() => editRoles(item.id)}
          onDeleteClick={() => deleteRoles(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default RolesRenderList;
