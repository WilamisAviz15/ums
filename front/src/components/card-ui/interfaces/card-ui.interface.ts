import { ReactElement } from "react";

interface CustomStyles {
  [key: string]: string;
}

export interface CardUIInterface {
  title: string;
  subTitle?: string;
  extraText?: ReactElement<any, any>;
  customStyles?: CustomStyles;
  isDeletable?: boolean;
  isCardHeaderEnabled?: boolean;
  iconButton?: boolean;
  onIsManager?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
