import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import styles from "../Actions.module.scss";
import actionsService from "../actions.service";
import { ActionInterface } from "../interfaces/action.interface";
import ActionsRenderList from "./actions-list";

const ActionsList = () => {
  const [actions, setActions] = useState<ActionInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getActions = async () => {
      const res = await actionsService.httpGet();
      setActions(res.data);
    };
    getActions();
  }, [actions]);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <h1>Ações</h1>
      <div className={styles.actions__wrapper}>
        <div className={styles.actions__wrapper__index}>
          <ActionsRenderList data={actions} />
        </div>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default ActionsList;
