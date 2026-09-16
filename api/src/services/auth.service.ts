import assert from "node:assert";
import jwt from "jsonwebtoken";

import UserModel, { UserDocument } from "../models/user.model";
import { HttpError } from "../utils/errorHandling";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import SessionModel, { SessionDocument } from "../models/session.model";

import { ONE_DAY_MS, thirtyDaysFromNow } from "../constants/time";

export type AuthParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const newSession = async (user: UserDocument, userAgent?: string) => {
  const userId = user._id;

  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  const refreshToken = jwt.sign(sessionInfo, JWT_REFRESH_SECRET!, {
    expiresIn: "30d",
  });

  const accessToken = jwt.sign({ ...sessionInfo, userId }, JWT_SECRET!, {
    expiresIn: "15m",
  });

  return {
    user: user.omitPassword(),
    refreshToken,
    accessToken,
  };
};

export const createAccount = async ({
  email,
  password,
  userAgent,
}: AuthParams) => {
  const existingUser = await UserModel.exists({ email });

  assert(!existingUser, new HttpError(CONFLICT, "Email already in use."));

  const user = await UserModel.create({
    email,
    password,
  });

  return newSession(user, userAgent);
};

export const login = async ({ email, password, userAgent }: AuthParams) => {
  const user = await UserModel.findOne({ email });
  assert(user, new HttpError(UNAUTHORIZED, "Invalid email or password."));

  const isValid = user.comparePassword(password);
  assert(isValid, new HttpError(UNAUTHORIZED, "Invalid email or password."));

  return newSession(user, userAgent);
};

type RefreshTokenPayload = {
  sessionId: string;
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET!);
  const { sessionId } = payload as RefreshTokenPayload;

  const session = await SessionModel.findById(sessionId);
  assert(session, new HttpError(UNAUTHORIZED, "Invalid refresh token."));

  const now = new Date();
  assert(
    now > session.expiresAt,
    new HttpError(UNAUTHORIZED, "Session expired."),
  );

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - now.getTime() <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = jwt.sign(
    { sessionId: session.id },
    JWT_REFRESH_SECRET!,
    {
      expiresIn: "30d",
    },
  );

  const accessToken = jwt.sign({ sessionId: session.id }, JWT_SECRET!, {
    expiresIn: "15m",
  });

  return { accessToken, newRefreshToken };
};
