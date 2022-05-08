import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import CartList from "../Cart/CartCard";
import database from "@react-native-firebase/database";
import * as Print from "expo-print";
import {htmlString} from './htmlPDFGenerator'

import { theme } from "../../../config/themeFile";

const Container = styled.View`
  margin: 5px;
  padding: 10px;
  elevation: 4;
  background-color: #fff;
  border-radius: 5px;
`;
const Text = styled.Text`
  color: #000;
`;

const OrderCard = (props) => {
  const [hidden, _setHidden] = React.useState(true);
  // const price = props.map()

  const PrintPDF = async () => {
    try {
      await Print.printAsync({
        html: htmlString(props),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  console.log(props);
  return (
    <Container>
      <View style={{ width: "100%" }}>
        <Text>Order Made on : {props.date}</Text>
        <Text>
          {`\u20B9`}
          {props.delieveryPrice
            ? props.price + props.delieveryPrice
            : props.price}
        </Text>
        {props.delieveryPrice && (
          <Text>Delivery Rate : {props.delieveryPrice}</Text>
        )}
        <Text>Order Status: {props.status}</Text>
      </View>
      {props.status=="delievered" && (
        <Button
        color={"#adf243"}
        onPress={PrintPDF}
        style={{
          height: 40,
          width: "100%",
          marginTop: 10,
        }}
        mode="contained"
      >
        Download PDF
      </Button>
      )}
      
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 4,
        }}
      >
        <Button
          onPress={() => _setHidden(!hidden)}
          color={theme.green}
          style={{
            height: 40,
            width: props.status === "pending" ? "48%" : "100%",
          }}
          mode="contained"
        >
          {hidden ? "Show " : "Hide "}
          Details
        </Button>
        {props.status === "pending" && (
          <Button
            onPress={() => {
              props.CancelOrder(props.uniqueKey);
            }}
            color={theme.grey}
            style={{ height: 40, width: "48%" }}
            mode="contained"
          >
            Cancel Order
          </Button>
        )}
      </View>
      {!hidden &&
        props.product.map((item) => <CartList orderReview={true} {...item} />)}
    </Container>
  );
};
export default OrderCard;
