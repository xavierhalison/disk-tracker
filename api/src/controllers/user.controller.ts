import { catchErrors } from "../utils/errorHandling";
import { getUser as getUserService } from "../services/user.service";
import { OK } from "../constants/http";

export const getUser = catchErrors(async (req, res) => {
  const { userId } = req;

  const user = await getUserService(userId);

  res.status(OK).json(user);
});
