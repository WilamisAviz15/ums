import React from "react";

import CardUI from "../../../components/card-ui";
import { ActionInterface } from "../interfaces/action.interface";
import actionsService from "../actions.service";

const ActionsRenderList = ({ data }: { data: ActionInterface[] | undefined }) => {
  const editAction = (id: number | undefined) => {
    if (!id) return;
    console.log(id);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await actionsService.httpDelete(id);
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
