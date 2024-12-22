export type AuthParams = {
  chainId: string;
  address: string;
  signature: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type NonceParams = {
  address: string;
  chainId: string;
};

export type NonceResponse = {
  msg: string;
  nonce: number;
};

type JwtToken = {
  token: string;
  expiresIn: number;
};

export type AuthResponse = {
  authorizationToken: JwtToken;
  refreshToken: JwtToken;
};

export type RefreshTokenResponse = {
  authorizationToken: JwtToken;
};
