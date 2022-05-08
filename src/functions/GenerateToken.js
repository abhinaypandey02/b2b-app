import auth from '@react-native-firebase/auth';

const GenerateToken = async () => {
  let data = '';
  await auth()
    .currentUser.getIdToken(true)
    .then((token) => {
      data = token;
    });
  return data;
};
export default GenerateToken;