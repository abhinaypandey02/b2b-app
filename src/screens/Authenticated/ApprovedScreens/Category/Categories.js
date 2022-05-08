import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import GenerateToken from "../../../../functions/GenerateToken";

import axiosInitialize from "../../../../api/InitializeAxios";

import CategoriesBannerImage from "../../../../components/AuthenticatedServices/Categories/CategoriesBannerImage";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text``;

const Categories = () => {
  const Focused = useIsFocused();
  const FetchCategories = async () => {
    const token = await GenerateToken();
    axiosInitialize
      .post(
        "/fetchCategories",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        _setData([...response.data.data]);
      });
  };
  React.useEffect(() => {
    if (Focused) FetchCategories();
  }, [Focused]);
  React.useEffect(() => {
    FetchCategories();
  }, []);

  const [data, _setData] = React.useState([]);

  return (
    <Container>
      <Text
        style={{
          fontSize: 30,
          padding: 10,
          fontWeight: "bold",
          paddingBottom: 0,
          color: "#000",
        }}
      >
        Categories
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.length === 0 ? (
          <ActivityIndicator
            color="#000"
            size="small"
            style={{ padding: 20, width: "100%", alignSelf: "center" }}
          />
        ) : (
          data.map(
            (item) =>
              item.name !== "Homepage" && <CategoriesBannerImage {...item} />
          )
        )}
      </ScrollView>
    </Container>
  );
};
export default Categories;
