import axios, { AxiosResponse } from "axios";

import { environment } from "../../../environments/environment";
import { ArgsInterface } from "./interfaces/axios-request.interface";
import { Delete, Get, Patch, Post, Put } from "../../../decorators/axios.decorator";
import { Singleton } from "../../classes/Singleton";

export class HttpClient extends Singleton<HttpClient> {
  constructor() {
    super();
  }

  @Get()
  async get<T = any, D = AxiosResponse<T, any>>(path: string, args?: ArgsInterface<T, D>) {
    return (async () => await axios.get<D>(`${environment.api}/${path}`, args?.config))();
  }

  @Post()
  async post<T = any, D = AxiosResponse<T, any>>(path: string, args: ArgsInterface<T, D>) {
    const { data, config } = args;

    return (async () => await axios.post<D>(`${environment.api}/${path}`, data, config))();
  }

  @Put()
  async put<T = any, D = AxiosResponse<T, any>>(path: string, args: ArgsInterface<T, D>) {
    const { data, config } = args;

    return (async () => await axios.put<D>(`${environment.api}/${path}`, data, config))();
  }

  @Patch()
  async patch<T = any, D = AxiosResponse<T, any>>(path: string, args: ArgsInterface<T, D>) {
    const { data, config } = args;

    return (async () => await axios.patch<D>(`${environment.api}/${path}`, data, config))();
  }

  @Delete()
  async delete<T = any, D = AxiosResponse<T, any>>(path: string, args: ArgsInterface<T, D>) {
    const { config } = args;

    return (async () => await axios.delete<D>(`${environment.api}/${path}`, config))();
  }
}

const http = HttpClient.getInstance(HttpClient);
export default http;
