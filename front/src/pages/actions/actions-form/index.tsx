import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ActionsForm = () => {
  const [form, setForm] = useState<any>();
  const createAction = () => {};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <h1 className="title">Criar Evento</h1>
      <form className="form" onSubmit={createAction}>
        <div>
          <TextField
            className="textField"
            id="outlined-basic"
            label="Titulo do Evento"
            variant="outlined"
            name="nome"
            onChange={(v) => handleInputChange(v)}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            name="descricao"
            onChange={(v) => handleInputChange(v)}
          />

          <TextField
            className="textField"
            id="outlined-basic"
            label="Local"
            variant="outlined"
            name="local"
            onChange={(v) => handleInputChange(v)}
          />
          <Button title="Criar" />
        </div>
      </form>
    </>
  );
};

export default ActionsForm;
