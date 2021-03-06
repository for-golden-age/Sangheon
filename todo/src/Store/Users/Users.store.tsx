import { createReducer } from "typesafe-actions";
import { UsersActionTypes, IReqGetUsers, IUsersState } from ".";
export const REQ_GET_USERS = "users/REQ_GET_USERS";
export const RES_GET_USERS = "users/RES_GET_USERS";

const initialState: IUsersState = {
  userList: [],
};

const users = createReducer<IUsersState, UsersActionTypes>(initialState, {
  [RES_GET_USERS]: (state: IUsersState, action: UsersActionTypes) => {
    return { ...state, userList: action.payload.users };
  },
});

export const reqGetUsers: () => IReqGetUsers = () => ({
  type: REQ_GET_USERS,
});

export default users;
