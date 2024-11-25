export interface ConfigInterface {
  [name: string]: {
    active: boolean;
    options: {
      [optionName: string]: boolean;
    };
  };
}
