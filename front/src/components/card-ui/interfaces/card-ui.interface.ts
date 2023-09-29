import { ReactElement } from "react";

export interface CardUIInterface {
  title: string;
  subTitle?: string;
  extraText?: ReactElement<any, any>;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
