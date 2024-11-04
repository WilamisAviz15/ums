import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Payments.module.scss";
import { PaymentsTabs } from "./payments-tab";

const Payments = () => {
  return (
    <div className={styles.payments}>
      <PaymentsTabs />
    </div>
  );
};

export default Payments;
