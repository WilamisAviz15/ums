import React from "react";
import { useNavigate } from "react-router-dom";

import CardUI from "../../../components/card-ui";
import { ActionInterface } from "../interfaces/action.interface";
import actionsService from "../actions.service";

const ActionsRenderList = ({
  data,
  setActions,
}: {
  data: ActionInterface[] | undefined;
  setActions: React.Dispatch<React.SetStateAction<ActionInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editAction = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await actionsService.httpDelete(id);
    setActions((oldAction) => oldAction?.filter((item) => item.id !== id));
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name}
          onEditClick={() => editAction(item.id)}
          onDeleteClick={() => deleteAction(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default ActionsRenderList;
