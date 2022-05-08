import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import AsyncStore from "@react-native-async-storage/async-storage";
//unauthenticated screens

import UnAuthneticatedWelcome from "../screens/Unauthenticted/Welcome";

//authenticated screen
import Home from "../screens/Authenticated/Home";
import CheckoutNavigation from "./CheckoutNavigation";
import SettingsNavigation from "./SettingsNavigation";
import SearchScreen from "./../screens/Authenticated/ApprovedScreens/SearchScreen";

const Stack = createStackNavigator();

const AuthenticatedScreens = () => (
  <Stack.Navigator initialRouteName="home" headerMode="none">
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="checkout" component={CheckoutNavigation} />
    <Stack.Screen name="settingsNavigation" component={SettingsNavigation} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
  </Stack.Navigator>
);

const UniteNavigator = () => {
  useEffect(() => {
    AsyncStore.getItem("login").then((data) => {
      console.log(data);
      if (data === "true") {
        _setInitialRouteName("homeScreen");
        _setLoading(false);
      } else {
        _setInitialRouteName("entry");
        _setLoading(false);
      }
    });
  }, []);
  const [loading, _setLoading] = useState(true);
  const [initialRouteName, _setInitialRouteName] = useState("");
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#000" />
      </View>
    );
  }
  return (
    <Stack.Navigator initialRouteName={initialRouteName} headerMode="none">
      <Stack.Screen name="homeScreen" component={AuthenticatedScreens} />
      <Stack.Screen name="entry" component={UnAuthneticatedWelcome} />
    </Stack.Navigator>
  );
};

export default UniteNavigator;
