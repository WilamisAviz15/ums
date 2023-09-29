import React from "react";

import CardUI from "../../../components/card-ui";
import { ActionInterface } from "../interfaces/action.interface";

const ActionsList = ({ data }: { data: ActionInterface[] | undefined }) => {
  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => <CardUI key={item.id} title={item.name} />);
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default ActionsList;
