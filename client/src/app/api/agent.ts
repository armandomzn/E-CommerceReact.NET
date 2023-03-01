import axios, { AxiosError, AxiosResponse } from "axios";
import { Product } from "../models/products";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = async () => {
  return new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
};

axios.defaults.baseURL = "http://localhost:5001/api/";

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    console.log("Error from interceptor", error);
    const { data, status } = error.response as AxiosResponse;
    console.log(data);

    switch (status) {
      case 400:
        if (data.errors) {
          let modelStateErrors: string[] = [];
          for (const key in data.errors) {
            modelStateErrors = [...modelStateErrors, data.errors[key]];
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("server-error", { state: { error: data } });
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const requests = {
  get: <T>(url: string) => {
    return axios.get<T>(url).then(responseBody);
  },
  post: <T>(url: string, body: {}) => {
    return axios.post<T>(url, body).then(responseBody);
  },
  put: <T>(url: string, body: {}) => {
    return axios.put<T>(url, body).then(responseBody);
  },
  delete: <T>(url: string) => {
    return axios.delete<T>(url).then(responseBody);
  },
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Catalog = {
  list: (): Promise<Product[]> => requests.get<Product[]>("products"),
  details: (id: string): Promise<Product> =>
    requests.get<Product>(`products/${id}`),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
