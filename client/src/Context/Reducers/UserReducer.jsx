import { CLEARUSER, SETUSER } from "../Actions/ActionType";

const initialstate = {
  _user: {},
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SETUSER:
      return { ...state, _user: action.payload };
    case CLEARUSER:
      return { ...state, _user: {} };
    default:
      return state;
  }
};

export default UserReducer;
