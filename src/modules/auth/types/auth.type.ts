export type AuthResponse = {
  accessToken: string;
  accessExp?: number;
  refreshToken?: string;
  refreshExp?: number;
};

export type TokenPayload = {
  id: string;
  studentId?: string;
};

export type JwtAccessPayload = {
  studentId?: string;
  id: string;
  iat: number;
  exp: number;
};
