import { ReactElement } from "react";

export interface CardUIInterface {
  title: string;
  subTitle?: string;
  extraText?: ReactElement<any, any>;
  onIsManager?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
