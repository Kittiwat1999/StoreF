import axiosClient from "./axiosClient";

const authApi = {
  register: (data: { email: string; password: string; role: string }) =>
    axiosClient.post("/auth/register/", data),

  login: (data: { email: string; password: string }) =>
    axiosClient.post("/auth/login/", data),

  refresh: (data: { refresh: string }) =>
    axiosClient.post("/auth/refresh/", data),

  me: () => axiosClient.get("/auth/me/"),

  logout: () => axiosClient.post("/auth/logout/"),
};

export default authApi;
