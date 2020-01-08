import { CHECK_NETWORK_STATUS } from "../actions/types";

export const checkNetworkStatus = (state = {}, action) => {
  switch (action.type) {
    case CHECK_NETWORK_STATUS: {
      return { network: action.payload };
    }
    default:
      return state;
  }
};
