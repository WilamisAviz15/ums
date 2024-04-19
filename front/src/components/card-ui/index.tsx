import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardUIInterface } from "./interfaces/card-ui.interface";
import authService from "../../pages/auth/auth.service";

const CardUI = ({
  title,
  subTitle,
  extraText,
  customStyles,
  isDeletable = true,
  onIsManager,
  onEditClick,
  onDeleteClick,
}: CardUIInterface) => {
  const [openDropdown, setOpenDropdown] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenDropdown(event.currentTarget);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  const isAdminOrManager = () => {
    const privilege = authService.getUserBiggerPrivilege();
    return privilege === 1 || privilege === 2;
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={customStyles}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        action={
          <>
            <IconButton aria-label="settings" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="menu" anchorEl={openDropdown} open={Boolean(openDropdown)} onClose={handleClose}>
              {isAdminOrManager() && !onIsManager && (
                <MenuItem
                  onClick={() => {
                    onEditClick();
                    handleClose();
                  }}
                >
                  Editar
                </MenuItem>
              )}
              {isDeletable ? (
                <MenuItem
                  onClick={() => {
                    onDeleteClick();
                    handleClose();
                  }}
                >
                  Excluir
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    onDeleteClick();
                    handleClose();
                  }}
                  disabled
                >
                  Excluir
                </MenuItem>
              )}
            </Menu>
          </>
        }
        title={title}
        subheader={subTitle}
      />
      {extraText && (
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {extraText}
          </Typography>
        </CardContent>
      )}
      {isAdminOrManager() && onIsManager && (
        <CardActions>
          <Button size="small" onClick={onIsManager}>
            Confirmar
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardUI;
