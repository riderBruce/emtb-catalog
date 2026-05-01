import apiClient from "./api-client";

interface Entity {
  _id: string;
}

class HttpService<T extends Entity> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  get(_id: string) {
    const controller = new AbortController();
    const request = apiClient.get<T>(`${this.endpoint}/${_id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(_id: string) {
    return apiClient.delete(`${this.endpoint}/${_id}`);
  }

  add<TInput>(entity: TInput) {
    return apiClient.post<T>(this.endpoint, entity);
  }

  update(entity: T) {
    return apiClient.put<T>(`${this.endpoint}/${entity._id}`, entity);
  }
}

const create = <T extends Entity>(endpoint: string) =>
  new HttpService<T>(endpoint);

export default create;
