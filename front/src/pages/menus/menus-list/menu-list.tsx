import React from "react";
import { useNavigate } from "react-router-dom";

import CardUI from "../../../components/card-ui";
import menusService from "../menus.service";
import { MenuInterface } from "../interfaces/menu.interface";

const MenusRenderList = ({
  data,
  setMenus,
}: {
  data: MenuInterface[] | undefined;
  setMenus: React.Dispatch<React.SetStateAction<MenuInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editMenus = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteMenus = async (id: number | undefined) => {
    if (!id) return;
    await menusService.httpDelete(id);
    setMenus((oldMenusGroup) => oldMenusGroup?.filter((item) => item.id !== id));
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name}
          onEditClick={() => editMenus(item.id)}
          onDeleteClick={() => deleteMenus(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default MenusRenderList;
