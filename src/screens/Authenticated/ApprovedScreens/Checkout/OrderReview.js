import React from "react";
import styled from "styled-components/native";
import { Text, View, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import Header from "../../../../components/AuthenticatedServices/Common/Header";
import CartList from "../../../../components/AuthenticatedServices/Cart/CartList";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const OrderReview = ({ navigation }) => {
  const Focused = useIsFocused();
  const [delieveryPrice, setDelieveryPrice] = React.useState(null);

  const [price, _setPrice] = React.useState("");
  const State = useSelector((state) => state.CartAndOrders.cart);
  const [address, _setAddress] = React.useState(null);

  React.useEffect(() => {
    const { uid } = auth().currentUser;
    database()
      .ref(`users/${uid}/details/shopAddress`)
      .once("value", (snap) => {
        if (snap.val()) {
          _setAddress(snap.val());
        }
      });
  }, []);
  React.useEffect(() => {
    if (Focused) {
      let price = 0;
      State.map((item) => {
        price += parseInt(item.price * item.quantity.quantity);
      });

      database()
        .ref(`delieveryRate`)
        .once("value", (snap) => {
          if (price < 1000) {
            setDelieveryPrice(parseInt(snap.val()["under1000"]));
          } else if (price < 2000) {
            setDelieveryPrice(parseInt(snap.val()["1to2"]));
          } else if (price < 3000) {
            setDelieveryPrice(parseInt(snap.val()["2to3"]));
          } else if (price < 4000) {
            setDelieveryPrice(parseInt(snap.val()["3to4"]));
          } else {
            setDelieveryPrice(parseInt(snap.val()["4andUp"]));
          }
        });
    }
  }, [Focused]);

  React.useEffect(() => {
    if (Focused) {
      let price = 0;
      State.map((item) => {
        price += parseInt(item.price * item.quantity.quantity);
      });
      _setPrice(price);
    }
  }, [Focused]);

  // const { houseNo, sector, pinCode } = route.params;

  return (
    <>
      <Header title="Review Your Order" />
      <Container>
        <Text style={{ fontSize: 15, marginTop: -5, color: "#000" }}>
          Order Delievering at
        </Text>
        {address ? <Text>{address}</Text> : <ActivityIndicator color="#000" />}
        {delieveryPrice !== null ? (
          <Text style={{ color: "#000" }}>
            Delievery Charges : {delieveryPrice}
          </Text>
        ) : (
          <ActivityIndicator color="#000" />
        )}
        <View style={{ height: 10 }} />
        <CartList orderReview={true} data={State} />
        {delieveryPrice === null ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Payment", { delieveryPrice });
            }}
            color="#000"
          >
            Pay {`\u20B9`}
            {price + delieveryPrice}
          </Button>
        )}
      </Container>
    </>
  );
};
export default OrderReview;
