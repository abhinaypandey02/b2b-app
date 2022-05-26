import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Keyboard } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import SearchBarComponent from "../../../components/AuthenticatedServices/Home/SearchBar";
import ListOfVegies from "../../../components/AuthenticatedServices/Common/ListOfVegies";
import RequestHomePageData from "../../../api/RequestHomePageData";
import {useKeyboardState} from "../useKeyboardState";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Home = () => {
  const Navigation = useNavigation();

  const InputRef = React.createRef(null);
  const [isSearchFocused,setIsSearchFocused]=useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, _setData] = React.useState([]);
  const keyboardOn=useKeyboardState();
  const onChangeSearch = (query) => setSearchQuery(query);

  React.useEffect(() => {
    homeData();
  }, []);
  useEffect(()=>{
    if(!keyboardOn){
      onBlur();
    }
  },[keyboardOn])
  const homeData = async () =>{
    _setData([...await RequestHomePageData()]);
  }
  function onFocus() {
    setIsSearchFocused(true);
  }
  function onBlur(){
    setIsSearchFocused(false);
  }
  return (
    <Container>
      <SearchBarComponent
          onFocus={onFocus}
          onBlur={onBlur}
        inputRefer={InputRef}
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
      />
      {isSearchFocused ? (
        <Button
          mode="contained"
          color="#000"
          style={{ width: "90%", alignSelf: "center", marginTop: 10 }}
          onPress={() => {
            Navigation.navigate("SearchScreen", { searchVal: searchQuery });
            setIsSearchFocused(false);
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
        <ListOfVegies keyboardOn={keyboardOn} data={data} />
      )}
    </Container>
  );
};
export default Home;
