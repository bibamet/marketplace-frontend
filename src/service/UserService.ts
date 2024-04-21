"use client";

import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import CreateUserQuery from "../CustomTypes/CreateUserCommandType";
import { UserQuery } from "../CustomTypes/UserQueryType";
import { UserAuthorizeQuery } from "@/CustomTypes/UserAuthorizeQueryType";
import { UpdateUserCommand } from "@/CustomTypes/UpdateUserCommand";
import { UpdateUserPasswordCommand } from "@/CustomTypes/UpdateUserPasswordCommand";
import { JwtResponse } from "@/CustomTypes/JwtResponse";
import routes, { applyConfig, base_url } from "@/lib/routes";
import { Token } from "axios-jwt/dist/src/Token";
import {
  IAuthTokens,
  applyAuthTokenInterceptor,
  getBrowserLocalStorage,
} from "axios-jwt";

class UserService {
  public static createUser = async (
    newUser: CreateUserQuery
  ): Promise<JwtResponse> => {
    return await axios
      .post(routes.users, newUser)
      .then((response: AxiosResponse<JwtResponse>) => {
        return response.data;
      });
  };

  public static authorizeUser = async (
    user: UserAuthorizeQuery
  ): Promise<JwtResponse> => {
    return await axios
      .post(`${routes.users}/login`, user)
      .then((response: AxiosResponse<JwtResponse>) => response.data);
  };

  public static updateUserInfo = async (
    user: UpdateUserCommand,
    id: number
  ): Promise<UserQuery> => {
    return await axios
      .put(`${routes.users}/${id}`, user)
      .then((response: AxiosResponse<UserQuery>) => response.data);
  };

  public static updateUserPassword = async (
    user: UpdateUserPasswordCommand,
    id: number
  ): Promise<void> => {

    console.log("1 - ", base_url)

    applyConfig();

    console.log("2 - ", base_url)


    return await base_url
      // .put(`${routes.users}/pass/${id}`, user)
      .post(`/users/pass/${id}`, user)
      .then((response: AxiosResponse<void>) => response.data);
  };

  public static refreshTokens = async (
    refreshToken: Token
  ): Promise<IAuthTokens | Token> => {
    return await axios
      .post(`${routes.users}/refresh`, refreshToken)
      .then((response: AxiosResponse<IAuthTokens>) => response.data);
  };
}

export default UserService;
