import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = (callBack) => {
  auth()
    .signOut()
    .then(() => {
      AsyncStorage.clear();
      if (callBack) callBack();
    });
};
export default Logout;
