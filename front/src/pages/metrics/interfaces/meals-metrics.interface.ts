interface MealOptions {
  almoco: number;
  jantar: number;
}

export interface MealMetric {
  date: string;
  options: MealOptions;
}

export interface MealMetricsData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
