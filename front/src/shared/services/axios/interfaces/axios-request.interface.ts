import { AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosRequest =
  | (<T = any, R = AxiosResponse<T, any>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D> | undefined
    ) => Promise<R>)
  | (<T = any, R = AxiosResponse<T, any>, D = any>(
      url: string,
      data?: D | undefined,
      config?: AxiosRequestConfig<D> | undefined
    ) => Promise<R>);

export interface ArgsInterface<T, D> {
  data?: T;
  config?: AxiosRequestConfig<D> | undefined;
}
