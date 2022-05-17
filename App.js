import React, { useEffect } from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import messaging from '@react-native-firebase/messaging';

import store from "./src/redux/store";
import Navigator from "./src/navigation/navigation";

const App = () => {
  const loadFCM = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    loadFCM()
    messaging().subscribeToTopic("all").then(()=>{
      console.log("Subscribed to all")
    })
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} backgroundColor="#000" />
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
