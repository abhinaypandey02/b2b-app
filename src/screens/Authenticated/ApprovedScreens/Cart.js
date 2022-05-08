import React from "react";
import styled from "styled-components/native";
import CartList from "../../../components/AuthenticatedServices/Cart/CartList";
import CheckOutButton from "../../../components/AuthenticatedServices/Cart/CheckOutButton";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text``;

const Cart = () => {
  const [data, _setData] = React.useState([]);
  const State = useSelector((state) => state.CartAndOrders.cart);
  React.useEffect(() => {
    _setData([...State]);
    console.log(State.length, State);
  }, [State]);

  return (
    <Container>
      <Text
        style={{ fontSize: 30, padding: 10, fontWeight: "bold", color: "#000" }}
      >
        Cart
      </Text>
      {data.length > 0 ? (
        <>
          <CartList data={data} />
          <CheckOutButton />
        </>
      ) : (
        <Text style={{ padding: 10, color: "#000" }}>
          You dont have any items in your cart
        </Text>
      )}
    </Container>
  );
};
export default Cart;
