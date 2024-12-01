import { format, utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

import { FormErrors } from "../../pages/auth/interfaces/auth-register.interface";
import configService from "../../pages/config/config.service";

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

export const verifyVariabilityActive = (module: string) => {
  if (module === "AuthenticationModule") {
    return ["GoogleAPI", "LocalDB"];
  }

  if (configService.getConfig() != null) {
    const moduleConfig = configService.getConfig()![module];
    if (moduleConfig.active) {
      const options = Object.entries(moduleConfig.options)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      return options;
    }
  }

  return [];
};
