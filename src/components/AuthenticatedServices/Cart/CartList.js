import React from "react";
import styled from "styled-components/native";
import { FlatList, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import CartCard from "./CartCard";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
`;

const List = ({ ItemsInCart, ...rest }) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 20 }}
    data={ItemsInCart}
    renderItem={({ item, index }) => (
      <CartCard orderReview={rest.orderReview} {...item} index={index} />
    )}
    keyExtractor={(item) => Math.random() * 100}
  />
);

const CartList = (props) => {
  return (
    <Container>
      <List ItemsInCart={props.data} orderReview={props.orderReview} />
    </Container>
  );
};
export default CartList;
