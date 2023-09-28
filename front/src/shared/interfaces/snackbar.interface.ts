export interface SnackbarInterface {
  isOpen: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}
