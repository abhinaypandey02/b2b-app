import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonView = styled.View`
  background-color: #000;
  align-items: center;
`;
const Text = styled.Text`
  padding: 20px;
`;

const CheckOutButton = () => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => Navigation.navigate("checkout")}
    >
      <ButtonView>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>CHECKOUT</Text>
      </ButtonView>
    </TouchableOpacity>
  );
};
export default CheckOutButton;
