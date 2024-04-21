import { JwtPayload } from "@/CustomTypes/JwtPayload";
import { JwtResponse } from "@/CustomTypes/JwtResponse";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import jwt_decode from "jsonwebtoken";
import { applyAuthTokenInterceptor, getBrowserLocalStorage } from "axios-jwt";
import UserService from "@/service/UserService";

export const BASE_URL: string = "http://localhost:9999";

const routes = {
  users: `${BASE_URL}/users`,
  goods: `${BASE_URL}/goods`,
  categories: `${BASE_URL}/categories`,
  basket: `${BASE_URL}/basket`,
};

const getToken = () => {
  const tokens: string | null = localStorage.getItem("tokens");

  if (tokens) {
    return JSON.parse(tokens)?.accessToken;
  }
};

export const base_url = axios.create({
  baseURL: BASE_URL
});

// base_url.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const accessToken: string | null = localStorage.getItem("accessToken");
//     const refreshToken: string | null = localStorage.getItem("refreshToken");

//     if (accessToken && refreshToken) {
//       checkToken(JSON.parse(accessToken), JSON.parse(refreshToken));
//       config.headers = config.headers || {};
//       config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

export const applyConfig = () => {
  applyAuthTokenInterceptor(base_url, {
    getStorage: getBrowserLocalStorage,
    // () => ({
    //   async remove(key: string) {
    //     localStorage.removeItem(key);
    //   },
    //   async set(key: string, value: string) {
    //     localStorage.setItem(key, value);
    //   },
    //   async get(key: string) {
    //     return localStorage.getItem(key);
    //   },
    // }),
    header: "Authorization",
    headerPrefix: "Bearer ",
    tokenExpireFudge: 1,
    requestRefresh: (refreshToken) => UserService.refreshTokens(refreshToken),
  });
}

export const checkToken = (accessToken: string, refreshToken: string) => {
  let accessPayLoad: JwtPayload = jwt_decode.decode(accessToken) as JwtPayload;
  let currDate = new Date();
  currDate.setSeconds(new Date().getSeconds() + 5);
  if (new Date(accessPayLoad?.exp as number * 1000) > currDate) {
    return;
  }

  let refreshPayLoad: JwtPayload = jwt_decode.decode(
    refreshToken
  ) as JwtPayload;
  currDate = new Date();
  currDate.setSeconds(new Date().getSeconds() + 5);
  if (new Date(refreshPayLoad?.exp as number * 1000) > currDate) {
    return;
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    window.location.replace("/authorization");
  }
};

export default routes;
