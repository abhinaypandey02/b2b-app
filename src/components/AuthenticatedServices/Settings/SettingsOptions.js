import React from "react";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { TouchableWithoutFeedback } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const SettingsButton = styled.View`
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  background-color: #000;
  elevation: 5;
`;
const PhoneNumberView = styled.View`
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  background-color: #fff;
  elevation: 10;
`;
const Text = styled.Text``;

const PhoneNo = () => {
  const [phone, _setPhone] = React.useState("");
  const Focused = useIsFocused();
  React.useEffect(() => {
    if (Focused) {
      _setPhone(auth().currentUser.phoneNumber);
    }
  }, [Focused]);
  return (
    <PhoneNumberView>
      <Text style={{ color: "#000" }}>Phone Number : {phone}</Text>
    </PhoneNumberView>
  );
};

const Options = ({ title }) => {
  const Navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Navigation.navigate("settingsNavigation", { screen: title });
      }}
    >
      <SettingsButton>
        <Text style={{ color: "#fff" }}>{title}</Text>
      </SettingsButton>
    </TouchableWithoutFeedback>
  );
};

const SettinsOptions = () => {
  return (
    <>
      <PhoneNo />
      <Options title="Contact Us" />
      <Options title="About Us" />
      <Options title="Terms And Conditions" />
    </>
  );
};
export default SettinsOptions;
