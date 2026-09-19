import UserModel from "../models/user.model";
import { HttpError } from "../utils/errorHandling";
import { NOT_FOUND } from "../constants/http";
import assert from "node:assert";

export const getUser = async (userId: string) => {
  const user = await UserModel.findOne({ _id: userId });

  assert(user, new HttpError(NOT_FOUND, "User not found"));

  return user.omitPassword();
};
