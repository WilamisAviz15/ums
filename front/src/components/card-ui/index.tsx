import React from "react";
import { Card, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CardUI = ({ title }: { title: string }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
    </Card>
  );
};

export default CardUI;
