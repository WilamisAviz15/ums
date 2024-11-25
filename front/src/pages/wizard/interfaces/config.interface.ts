export interface ConfigInterface {
  name: string;
  database: string;
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
