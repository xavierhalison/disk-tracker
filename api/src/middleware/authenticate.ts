import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import assert from "node:assert";
import { UNAUTHORIZED } from "../constants/http";
import { HttpError } from "../utils/errorHandling";

const { JWT_SECRET } = process.env;

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  assert(accessToken, new HttpError(UNAUTHORIZED, "Unauthorized"));

  const { userId, sessionId } = jwt.verify(accessToken, JWT_SECRET!) as {
    userId: string;
    sessionId: string;
  };

  assert(userId, new HttpError(UNAUTHORIZED, "Unauthorized"));

  req.userId = userId;
  req.sessionId = sessionId;

  next();
};

export default authenticate;
