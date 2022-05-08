import React from "react";
import styled from "styled-components/native";
import { FlatList, Dimensions } from "react-native";

import VegetableCard from "./VegetableCard";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
`;

const ListOfVegies = ({ data }) => {
  const [list, _setList] = React.useState([...data]);
  React.useEffect(() => {
    _setList([...data].sort((a, b) => a.productName - b.productName));
    // console.log(data);
  }, [data]);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ width: width, paddingBottom: 100 }}
      renderItem={({ item, index }) =>
        !item.hide ? <VegetableCard {...item} /> : <></>
      }
      data={list}
      keyExtractor={(item) => item.productName}
    />
  );
};
export default ListOfVegies;
