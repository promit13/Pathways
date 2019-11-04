import firebase from 'react-native-firebase';
import { ACTION_REGISTER, ACTION_LOGIN, CHECK_USER } from './types';

export const handleUserStatus = (user) => (dispatch) => {
  console.log(user.uid);
  firebase.firestore()
  .collection("users")
  .doc(user.uid)
  .onSnapshot((response) => {
    const currentUser = response.data();
    dispatch({
      type: CHECK_USER,
      payload: {...currentUser, userId: user.uid},
    });
  });
}