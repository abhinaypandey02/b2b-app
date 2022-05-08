import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";

const BannerView = styled.ImageBackground`
  width: 95%;
  height: 150px;
  align-self: center;
  margin-vertical: 10px;
`;
const Text = styled.Text`
  color: #fff;
`;
const View = styled.View``;

const NameView = {
  position: "absolute",
  bottom: 4,
  left: 10,
};

const CategoriesBannerImage = ({ url, name }) => {
  const Navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => Navigation.navigate("CategoryProduct", { title: name })}
    >
      <BannerView
        imageStyle={{ borderRadius: 10 }}
        source={{
          uri: url,
        }}
      >
        <View
          style={{
            ...NameView,
            left: 2,
            bottom: 2,
            backgroundColor: "#000",
            height: 22,
            width: "50%",
            borderRadius: 5,
          }}
        />
        <Text style={{ ...NameView, fontWeight: "bold" }}>{name}</Text>
      </BannerView>
    </TouchableWithoutFeedback>
  );
};
export default CategoriesBannerImage;
