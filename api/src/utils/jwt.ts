import jwt from "jsonwebtoken";

export const signJwt = (
  payload: object,
  secret: string,
  options?: jwt.SignOptions,
) => jwt.sign(payload, secret, options);

export const verifyJwt = (token: string, secret: string) =>
  jwt.verify(token, secret);
