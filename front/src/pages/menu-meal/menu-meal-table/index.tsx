import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import menuMealService from "../menu-meal.service";
import { MenuMealInterface } from "../interfaces/menu-meal.interface";
import { dayOfWeek } from "../../../shared/utils/utils";

const MenuMealTable = () => {
  const [menuMeal, setMenuMeal] = useState<MenuMealInterface[]>([]);
  useEffect(() => {
    const handleData = async () => {
      const res = await menuMealService.httpGet();
      setMenuMeal(res);
    };

    handleData();
  }, []);

  return (
    <>
      <h2>Cardápio disponível</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Refeição</TableCell>
              <TableCell align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuMeal.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.meal.name}</TableCell>
                <TableCell align="right">{dayOfWeek(row.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MenuMealTable;
