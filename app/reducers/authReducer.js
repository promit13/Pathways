import { ACTION_LOGIN, ACTION_REGISTER, CHECK_USER } from '../actions/types';

export const checkUser = (state = {}, action) => {
  switch (action.type) {
    case CHECK_USER: {
      return { user: action.payload };
    }
    default:
      return state;
  }
};
