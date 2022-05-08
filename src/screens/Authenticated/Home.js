import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";
import AsyncStore from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import axiosInitalize from "../../api/InitializeAxios";
import GenerateToken from "../../functions/GenerateToken";
import BottomNavigation from "./ApprovedScreens/BottomNavigation";
import ProvideDetails from "./ProvideDetails/ProvideDetails";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const Card = styled.View`
  height: 100px;
  width: 90%;
  background-color: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Text = styled.Text``;

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator color="#000" />
  </View>
);

const Home = ({ navigation }) => {
  const focused = useIsFocused();

  const [componentToBeRendered, _setComponent] = React.useState({
    component: <Loading />,
    value: null,
  });

  const Error = ({ onPress }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Network Error</Text>
      <Button
        onPress={() => {
          FetchStatus();
        }}
        mode="contained"
        color="#000"
        style={{ marginTop: 10 }}
      >
        Retry
      </Button>
    </View>
  );

  const FetchStatus = async () => {
    _setComponent({ component: <Loading />, value: null });
    if (focused) {
      const uid = await AsyncStore.getItem("uid");
      const token = await GenerateToken();
      console.log("token", token);
      console.log(uid);
      axiosInitalize
        .post(
          `/verifyIfVerified`,
          { data: { uid: uid } },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log("response", response.data);
          if (response.data.data === true) {
            _setComponent({ component: <Verified />, value: true });
          } else if (response.data.data === null) {
            _setComponent({ component: <UnVerified />, value: false });
          } else if (response.data.data === "pending") {
            _setComponent({ component: <InReview />, value: false });
          }
        })
        .catch((e) => {
          console.log(e);
          _setComponent({ component: <Error /> });
        });
    }
  };

  React.useEffect(() => {
    if (componentToBeRendered.value !== true) {
      FetchStatus();
    }
  }, [focused]);

  const Verified = () => <BottomNavigation />;

  const UnVerified = () => <ProvideDetails FetchStatus={FetchStatus} />;
  const InReview = () => (
    <Container>
      <Text style={{ color: "#000", fontSize: 20 }}>
        You Profile review is in progress
      </Text>
    </Container>
  );

  return <>{componentToBeRendered.component}</>;
};
export default (props) => <Home {...props} />;
