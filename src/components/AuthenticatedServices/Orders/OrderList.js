
import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

import OrderCard from "./OrderCard";

const Container = styled.View``;

const Data = [];

const OrderList = (props) => {
  const CancelOrder = (key) => {
    database()
      .ref(`order/${auth().currentUser.phoneNumber}/${key}`)
      .update({status:'cancelled'})
      .then(() => {
        props.fetchOrder();
      });
  };
  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        data={props.data}
        renderItem={({ item }) => (
          <OrderCard CancelOrder={CancelOrder} {...item} />
        )}
        // keyExtractor={(item) => item.name}
      />
    </Container>
  );
};
export default OrderList;
