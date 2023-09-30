import { format } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

import { FormErrors } from "../../pages/auth/interfaces/auth-register.interface";

export const isFormErrors = (obj: FormErrors | { error: string }): obj is FormErrors => {
  return !("error" in obj);
};

export const errorMessages = (errors: FormErrors | { error: string }) => {
  if (isFormErrors(errors)) {
    return Object.entries(errors)
      .filter(([, fieldErrors]) => fieldErrors.length > 0)
      .map(([field, fieldErrors]) => `${field}: ${fieldErrors.join(", ")}`)
      .join("\n");
  } else {
    return errors.error;
  }
};

export const formatDate = (date: Date) =>
  format(new Date(date), "dd/MM/yyyy", {
    timeZone: "America/Sao_Paulo",
  });

export const dayOfWeek = (date: Date) =>
  format(new Date(date), "EEEE", {
    timeZone: "America/Sao_Paulo",
    locale: ptBR,
  });
