import axios from "axios";

export function Get() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    handleRequest(descriptor);
  };
}

export function Post() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    handleRequest(descriptor);
  };
}

export function Put() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    handleRequest(descriptor);
  };
}

export function Patch() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    handleRequest(descriptor);
  };
}

export function Delete() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    handleRequest(descriptor);
  };
}

function handleRequest(descriptor: PropertyDescriptor) {
  const originalRequest = descriptor.value;

  return (descriptor.value = function (...args: any[]) {
    axios.interceptors.request.use((config) => {
      if (!config.url?.endsWith("login") && !config.url?.endsWith("refresh-token") && !config.url?.endsWith("logout")) {
        // config.headers["Authorization"] = `Bearer ${authService.getBearer()}`;
      }

      return config;
    });

    return originalRequest.apply(this, args);
  });
}
