export interface ConfigInterfaceInit {
  name: string;
  database: DatabaseConfigInterface;
  selectedModules: SelectedModules;
}

export interface SelectedModules {
  [moduleName: string]: ModuleConfig;
}

export interface ModuleConfig {
  active: boolean;
  name: string;
  options: {
    [optionName: string]: boolean;
  };
}

export type DatabaseType = "mysql" | "postgres" | "mssql" | "sqlite";

export interface DatabaseConfigInterface {
  name: string;
  type: DatabaseType;
  port: number;
  username: string;
  password: string;
}
