import axiosClient from "./axiosClient";

export interface FormType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedPolicy: boolean;
  role?: string;
}

const authApi = {
  register: (data: FormType) =>
    axiosClient.post("/auth/register/", data),

  login: (data: { email: string; password: string }) =>
    axiosClient.post("/auth/login/", data),

  refresh: (data: { refresh: string }) =>
    axiosClient.post("/auth/refresh/", data),

  me: () => axiosClient.get("/auth/me/"),

  logout: () => axiosClient.post("/auth/logout/"),
};

export default authApi;
