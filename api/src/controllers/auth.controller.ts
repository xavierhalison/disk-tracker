import { CREATED, OK } from "../constants/http";
import { createAccount, login } from "../services/auth.service";
import { catchErrors } from "../utils/errorHandling";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await login(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json(user);
});

export const logoutHandler = catchErrors(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  return res.status(200).json({ message: "ok" });
});
