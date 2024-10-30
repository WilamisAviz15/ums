import React from "react";
import { useNavigate } from "react-router-dom";

import CardUI from "../../../components/card-ui";
import { MenuGroupInterface } from "../interfaces/menu-group.interface";
import menusGroupsService from "../menus-groups.service";

const MenuGroupsRenderList = ({
  data,
  setMenusGroups,
}: {
  data: MenuGroupInterface[] | undefined;
  setMenusGroups: React.Dispatch<React.SetStateAction<MenuGroupInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editMenusGroups = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await menusGroupsService.httpDelete(id);
    setMenusGroups((oldMenusGroup) => oldMenusGroup?.filter((item) => item.id !== id));
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name}
          customStyles={{ borderTop: "6px solid rgba(21, 101, 192, 0.9)" }}
          onEditClick={() => editMenusGroups(item.id)}
          onDeleteClick={() => deleteAction(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default MenuGroupsRenderList;
