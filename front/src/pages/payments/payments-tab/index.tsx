import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";

import styles from "./PaymentsTab.module.scss";
import CardUI from "../../../components/card-ui";
import ModalPayment from "../../../components/modal-payment";
import paymentService from "../payment.service";
import { TransactionInterface } from "../interfaces/transaction.interface";
import authService from "../../auth/auth.service";
import { TabPanelProps } from "../interfaces/tab-panel-props.interface";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function PaymentsTabs() {
  const [currentTab, setCurrentTab] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [balance, setBalance] = useState<string>("0,00");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getUserTransactions = async (cpf: string) => {
    const res = await paymentService.httpGet(cpf);
    if (res) {
      setTransactions(res);
    }
  };

  const getUserBalance = async (cpf: string) => {
    const res = await paymentService.httpGetBalance(cpf);
    if (res) {
      setBalance(res);
    }
  };

  useEffect(() => {
    const user = authService.getUser();
    getUserBalance(user);
  }, []);

  useEffect(() => {
    if (currentTab === 1) {
      const user = authService.getUser();
      getUserTransactions(user.cpf);
    }
  }, [currentTab]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Carteira Digital" {...a11yProps(0)} />
          <Tab label="Histórico de pagamentos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <div>
          <CardUI
            key={1}
            title={""}
            isCardHeaderEnabled={false}
            customStyles={{
              width: "30%",
              backgroundColor: "#3f51b5",
              borderRadius: "25px",
            }}
            extraText={
              <div className={styles.wallet}>
                <h2>Saldo</h2>
                <h1>{balance}</h1>
                <div className={styles.actions}>
                  <Button variant="outlined" style={{ backgroundColor: "#fff" }} onClick={() => setOpenPaymentModal(true)}>
                    Adicionar Saldo
                  </Button>
                </div>
              </div>
            }
            iconButton={false}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <ModalPayment openModal={openPaymentModal} setOpenModal={setOpenPaymentModal} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <TableContainer component={Paper} style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="menu table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Data
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Tipo de transação
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Valor
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell align="center">{transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString("pt-BR") : "N/A"}</TableCell>
                  <TableCell align="center">{transaction.transactionType.name.replace("_", " ")}</TableCell>
                  <TableCell align="center">R$ {parseFloat(transaction.price).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Ver detalhes">
                      <IconButton onClick={() => console.log(transaction)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}
