import React, { useState } from "react";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardUIInterface } from "./interfaces/card-ui.interface";

const CardUI = ({ title, onEditClick, onDeleteClick }: CardUIInterface) => {
  const [openDropdown, setOpenDropdown] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenDropdown(event.currentTarget);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        action={
          <>
            <IconButton aria-label="settings" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="menu" anchorEl={openDropdown} open={Boolean(openDropdown)} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  onEditClick();
                  handleClose();
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteClick();
                  handleClose();
                }}
              >
                Excluir
              </MenuItem>
            </Menu>
          </>
        }
        title={title}
      />
    </Card>
  );
};

export default CardUI;
