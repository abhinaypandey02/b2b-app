import React from "react";
import { Searchbar } from "react-native-paper";

const SearchBarComponent = ({ searchQuery, onChangeSearch, InputRef,onBlur, onFocus }) => {
  return (
    <Searchbar
        onPressIn={onFocus}
        onFocus={onFocus}
        onBlur={onBlur}
      ref={InputRef}
      style={{ margin: 5 }}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      theme={{ colors: { text: "black", primary: "black" } }}
    />
  );
};
export default SearchBarComponent;
