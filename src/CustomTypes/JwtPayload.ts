
export type JwtPayload = {
  sub?: string; // Субъект токена
  exp?: number; // Время истечения токена
  iat?: number; // Время создания токена
  firstName?: string;
  lastName?: string;
  birthDate?: number;
  id?: number;
  roles?: string[];
};
