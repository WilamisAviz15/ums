import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "./Metrics.module.scss";
import CardUI from "../../components/card-ui";
import ChartBar from "../../components/chart-bar";
import { MetricInterface } from "./interfaces/metric.interface";
import metricsService from "./metrics.service";
import { verifyVariabilityActive } from "../../shared/utils/utils";
import { MealMetricsData } from "./interfaces/meals-metrics.interface";

const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricInterface>();
  const cardStyle = {
    color: "#fff",
    backgroundColor: "#5ea9ff",
    fontFamily: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const [mealData, setMealData] = useState<MealMetricsData | undefined>();

  const getMetrics = async () => {
    const res = await metricsService.httpGet();
    setMetrics(res);
  };

  const getMealsData = async () => {
    const data = await constructMealMetrics();
    setMealData(data);
  };

  useEffect(() => {
    getMetrics();
    getMealsData();
    const options = verifyVariabilityActive("MetricsModule");
    setActiveOptions(options);
  }, []);

  const constructMealMetrics = async (): Promise<MealMetricsData> => {
    const mealsMetrics = await metricsService.getMetricsToChartBar();

    const labels = mealsMetrics.map((item) => format(new Date(item.date), "EEEE", { locale: ptBR }));

    return {
      labels,
      datasets: [
        {
          label: "Almoço",
          data: mealsMetrics.map((item) => item.options.almoco),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "red",
          borderWidth: 1,
        },
        {
          label: "Jantar",
          data: mealsMetrics.map((item) => item.options.jantar),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "blue",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
      {activeOptions.includes("chart") && mealData && <ChartBar mealData={mealData} />}
      {activeOptions.includes("cards") && (
        <div className={styles.metrics}>
          <CardUI
            key={1}
            title={"Refeições agendadas para hoje"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.totalToday}</b>
              </span>
            }
            customStyles={cardStyle}
            iconButton={false}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <CardUI
            key={1}
            title={"Refeições agendadas e pagas para hoje"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.totalTodayPaid}</b>
              </span>
            }
            iconButton={false}
            customStyles={{ ...cardStyle, backgroundColor: "#43dcbd" }}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <CardUI
            key={1}
            title={"Refeições agendadas e não pagas para hoje"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.totalTodayUnpaid}</b>
              </span>
            }
            customStyles={{ ...cardStyle, backgroundColor: "#ffc168" }}
            iconButton={false}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <CardUI
            key={1}
            title={"Refeições totais agendadas"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.total}</b>
              </span>
            }
            iconButton={false}
            customStyles={{ ...cardStyle, backgroundColor: "#ff6e86" }}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <CardUI
            key={1}
            title={"Refeições totais agendadas e pagas"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.totalPaid}</b>
              </span>
            }
            iconButton={false}
            customStyles={{ ...cardStyle, backgroundColor: "#b39ddb   " }}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
          <CardUI
            key={1}
            title={"Refeições totais agendadas e não pagas"}
            extraText={
              <span className={styles.extraText}>
                <b>{metrics?.totalNotPaid}</b>
              </span>
            }
            iconButton={false}
            customStyles={{ ...cardStyle, backgroundColor: "#f48fb1   " }}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Metrics;
