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
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.actions__title}>
        <h1>Ações</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.actions__wrapper}>
        <ActionsRenderList data={actions} setActions={setActions} />
      </div>
    </>
  );
};

export default ActionsList;
