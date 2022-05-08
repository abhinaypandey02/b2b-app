import React from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { actions } from "../../../redux/CartAndOrders";
import { theme } from "../../../config/themeFile";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  padding: 5px;
  margin: 4px;
  border-radius: 10px;
  background-color: #fff;
  elevation: 4;
  flex-direction: row;
  align-items: center;
`;
const View = styled.View``;
const Image = styled.Image`
  height: ${(width * 15) / 100}px;
  border-radius: 10px;
  width: ${(width * 15) / 100}px;
`;
const ButtonView = styled.View`
  background-color: #000;
  border-radius: 10px;
  height: 30px;
  width: 30%;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

const CartCard = (props) => {
  const [data, _setData] = React.useState({
    productName: "",
    price: "",
    url: "",
    quantity: {},
    purchasePrice:null
  });
  const { productName, price, url, quantity,purchasePrice } = data;
  const Dispatch = useDispatch();
  const GetText = ({oldPrice, currentPrice,qunt=1}) => {
    var isRender = false;
    if (oldPrice) {
      if (oldPrice != currentPrice && oldPrice != "") {
        isRender = true;
      }
    }
    return (
      <>
        {isRender ? (
          <>
          <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: "#000" }}>
            {`\u20B9`}{oldPrice*qunt}
          </Text>
          <Text>{" "}</Text>
          </>
        ) : (<></>)}
      </>
    )
  }
  React.useEffect(() => {
    _setData({ ...props });
  }, [props]);

  return (
    <Container>
      <Image source={{ uri: url }} />
      <View
        style={{
          paddingLeft: 10,
          width: "50%",
          borderWidth: 0,
          borderColor: "#000",
        }}
      >
        <Text>
          {quantity.label} of {productName}
        </Text>
        <View  style={{ flexDirection: "row" }}>
        <GetText oldPrice={purchasePrice} currentPrice={price} qunt={quantity.quantity} />
        {Object.keys(quantity).length === 0 ? (
          <Text>
            {`\u20B9`}
            {price}
          </Text>
        ) : (
          <Text>
            {`\u20B9`}
            {price * quantity.quantity}
          </Text>
        )}
        </View>
        
      </View>
      {!props.orderReview && (
        <TouchableWithoutFeedback
          onPress={() => {
            Dispatch(
              actions.removeFromCart({
                index:props.index,
                message: `${quantity.label} of ${productName} remove from cart`,
              })
            );
            // AsyncStorage.getItem("cart").then((cart) => {
            //   const newArray = [...cart];
            //   newArray.splice(props.index, 1);
            //   AsyncStorage.setItem("cart", JSON.stringify(newArray));
            // });
          }}
        >
          <ButtonView>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>REMOVE</Text>
          </ButtonView>
        </TouchableWithoutFeedback>
      )}
    </Container>
  );
};
export default CartCard;
