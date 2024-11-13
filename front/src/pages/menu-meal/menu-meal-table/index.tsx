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
import { AxiosError } from "axios";
import { endOfWeek, startOfWeek } from "date-fns";

const MenuMealTable = () => {
  const [menuMeal, setMenuMeal] = useState<MenuMealInterface[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const currentDate = new Date();
      const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
      const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

      try {
        const res = await menuMealService.httpGet();
        const filteredMenuMeals = res.filter((meal: MenuMealInterface) => {
          const mealDate = new Date(meal.date);
          return mealDate >= startDate && mealDate <= endDate;
        });

        const sortedMenuMeal = filteredMenuMeals.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setMenuMeal(sortedMenuMeal);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          console.error(error);
          // handleOpenSnackbar(error.response?.data["message"], "error");
        }
      }
    };
    handleData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Cardápio disponível</h2>
      <TableContainer component={Paper} style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="menu table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ backgroundColor: "#f0f0f0", color: "#000", fontWeight: "bold" }}>
                Data
              </TableCell>
              <TableCell align="center" style={{ backgroundColor: "#f0f0f0", color: "#000", fontWeight: "bold" }}>
                Refeição
              </TableCell>
              <TableCell align="center" style={{ backgroundColor: "#f0f0f0", color: "#000", fontWeight: "bold" }}>
                Nome
              </TableCell>
              <TableCell align="center" style={{ backgroundColor: "#f0f0f0", color: "#000", fontWeight: "bold" }}>
                Descrição
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuMeal.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
                  "&:nth-of-type(odd)": { backgroundColor: "#e0e0e0" },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{dayOfWeek(row.date)}</TableCell>
                <TableCell align="center">{row.meal.name}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MenuMealTable;
