import React from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import axiosInitialize from "../../../api/InitializeAxios";
import GenerateToken from "../../../functions/GenerateToken";
import auth from "@react-native-firebase/auth";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import OrderList from "../../../components/AuthenticatedServices/Orders/OrderList";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text`
  color: #000;
`;

const Orders = () => {
  const Focused = useIsFocused();
  const Navigation = useNavigation();
  const State = useSelector((state) => state.CartAndOrders.orders);
  const [data, _setData] = React.useState([]);
  React.useEffect(() => {
    _setData([...State]);
  }, [State]);
  const FetchOrders = async () => {
    const token = await GenerateToken();
    axiosInitialize
      .post(
        `/fetchOrder`,
        { phone: auth().currentUser.phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        let ordersArr = response.data.data;
        if (ordersArr != null) {
          ordersArr.sort(function (a, b) {
            return parseInt(b.milliseconds) - parseInt(a.milliseconds);
          });
        }
        _setData([...ordersArr]);
      });
  };
  React.useEffect(() => {
    const subsriber = Navigation.addListener('focus', () => {
      FetchOrders();
    });
    return subsriber;
  }, [Focused]);

  return (
    <Container>
      <Text style={{ fontSize: 30, padding: 10, fontWeight: "bold" }}>
        Orders
      </Text>
      {data.length === 0 ? (
        <Text style={{ paddingLeft: 10 }}>No Orders yet</Text>
      ) : (
        <OrderList fetchOrder={FetchOrders} data={data} />
      )}
    </Container>
  );
};
export default Orders;
