import React, { useEffect, useState } from "react";

import styles from "./Actions.module.scss";
import actionsService from "./actions.service";
import ActionsList from "./actions-list";
import { ActionInterface } from "./interfaces/action.interface";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Actions = () => {
  const [actions, setActions] = useState<ActionInterface[]>();
  useEffect(() => {
    const getActions = async () => {
      const res = await actionsService.httpGet();
      setActions(res.data);
    };
    getActions();
  }, []);

  return (
    <div className={styles.actions}>
      <h1>Ações</h1>
      <div className={styles.actions__wrapper}>
        <div className={styles.actions__wrapper__index}>
          <ActionsList data={actions} />
        </div>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Actions;
