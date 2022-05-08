import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Keyboard } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import SearchBarComponent from "../../../components/AuthenticatedServices/Home/SearchBar";
import ListOfVegies from "../../../components/AuthenticatedServices/Common/ListOfVegies";
import RequestHomePageData from "../../../api/RequestHomePageData";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text``;

const Home = ({ route }) => {
  const Focused = useIsFocused();
  const Navigation = useNavigation();

  const InputRef = React.createRef(null);

  const [keyboardOn, _setKeyboardOn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, _setData] = React.useState([]);
  const onChangeSearch = (query) => setSearchQuery(query);

  React.useEffect(() => {
    homeData()
  }, []);
  const homeData = async () =>{
    const datax = await RequestHomePageData();
    console.log("hello ",datax);
    _setData([...datax]);
  }
  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      _setKeyboardOn(true);
      console.log(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      _setKeyboardOn(false);
      setSearchQuery("");
      console.log(false);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);


  return (
    <Container>
      <SearchBarComponent
        inputRefer={InputRef}
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
      />
      {keyboardOn ? (
        <Button
          mode="contained"
          color="#000"
          style={{ width: "90%", alignSelf: "center", marginTop: 10 }}
          onPress={() => {
            Navigation.navigate("SearchScreen", { searchVal: searchQuery });
            _setKeyboardOn(false);
          }}
        >
          Search
        </Button>
      ) : data.length === 0 ? (
        <ActivityIndicator
          color="#000"
          size="large"
          style={{ padding: 20, width: "100%", alignSelf: "center" }}
        />
      ) : (
        <ListOfVegies data={data} />
      )}
    </Container>
  );
};
export default Home;
