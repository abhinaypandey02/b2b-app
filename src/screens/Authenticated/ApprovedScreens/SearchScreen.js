import React from "react";
import styled from "styled-components/native";
import { Text, View, ActivityIndicator, Keyboard } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import VegetableCard from "../../../components/AuthenticatedServices/Common/VegetableCard";
import axiosInitialize from "../../../api/InitializeAxios";
import GenerateToken from "../../../functions/GenerateToken";
import ListOfVegies from "../../../components/AuthenticatedServices/Common/ListOfVegies";

const Container = styled.View``;

const SearchScreen = ({ route, navigation }) => {
  const [searchVal, _setSearchVal] = React.useState("");
  const [keyboardOn, _setKeyboardOn] = React.useState(false);

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      _setKeyboardOn(true);
      console.log(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      _setKeyboardOn(false);
      console.log(false);
    });
    return () => {};
  }, []);

  React.useEffect(() => {
    _setSearchVal(route.params.searchVal);
    _setSearchQuery({ ...SearchQuery, loading: true });
    Request(route.params.searchVal);
  }, [route.params]);

  const [SearchQuery, _setSearchQuery] = React.useState({ loading: true });

  const Request = (search) => {
    (async () => {
      const token = await GenerateToken();
      axiosInitialize
        .post(
          `/searchQuery`,
          { data: { search: search.toLowerCase() } },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((request) => {
          _setSearchQuery({ ...request.data.data, loading: false });
        });
    })();
  };

  if (route.params) {
    return (
      <Container>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            onPress={() => {
              navigation.goBack();
            }}
            style={{ width: "8%", padding: 5 }}
            name="arrow-back"
            color="#000"
            size={25}
          />
          <Searchbar
            style={{ margin: 5, width: "90%" }}
            placeholder="Search"
            onChangeText={(e) => {
              _setSearchVal(e);
            }}
            value={searchVal}
            theme={{ colors: { text: "black", primary: "black" } }}
          />
        </View>
        {keyboardOn ? (
          <Button
            mode="contained"
            color="#000"
            style={{ width: "90%", margin: 10, alignSelf: "center" }}
            onPress={() => {
              _setSearchQuery({ loading: true });
              Request(searchVal);
              Keyboard.dismiss();
            }}
          >
            Search
          </Button>
        ) : !SearchQuery.loading ? (
          Object.keys(SearchQuery).length > 2 ? (
            <VegetableCard {...SearchQuery} />
          ) : (
            <Text style={{ padding: 20, color: "#000" }}>
              No products match your search
            </Text>
          )
        ) : (
          <ActivityIndicator
            style={{ width: "100%", padding: 20, alignSelf: "center" }}
            color="#000"
          />
        )}
      </Container>
    );
  }
  return <Container />;
};
export default SearchScreen;
