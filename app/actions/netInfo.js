import NetInfo from "@react-native-community/netinfo";
import { CHECK_NETWORK_STATUS } from "./types";

export const networkStatus = () => dispatch => {
  NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    dispatch({
      type: CHECK_NETWORK_STATUS,
      payload: { isConnected: state.isConnected }
    });
  });
};
