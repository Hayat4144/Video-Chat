import { CLEARUSER, SETUSER } from "./ActionType";

export const SetUserAction = (payload) => {
  return {
    type: SETUSER,
    payload,
  };
};

export const ClearUserAction = () => {
  return {
    type: CLEARUSER,
  };
};
