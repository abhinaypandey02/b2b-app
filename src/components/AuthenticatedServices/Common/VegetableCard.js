import React from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Picker } from "react-native-woodpicker";

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
  background-color: ${theme.green};
  border-radius: 10px;
  elevation: 2;
  height: 30px;
  width: 15%;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

const VegetableCard = (props) => {
  const State = useSelector((state) => state.CartAndOrders.cart);
  const inCart=State.find(o=>o.itemDatabase===props.itemDatabase);

  const [data, _setData] = React.useState({
    name: "",
    price: "",
    prevPrice: "",
    image: "",
    miniDescription: "",
    minQuantity: "",
    maxQuantity: "",
    prefix: "",
    purchasePrice:""
  });
  const [quantity, _setQuantity] = React.useState({
    quantity: 0,
  });
  const Dispatch = useDispatch();
  const { prevPrice, productName, price, url, miniDescription, minQuantity, maxQuantity } =
    data;
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    _setData({ ...props });
  }, [props]);

  const GetText = ({oldPrice, currentPrice}) => {
    var isRender = false;
    if (oldPrice) {
      if (oldPrice != currentPrice && oldPrice != "") {
        isRender = true;
      }
    }
    return (
      <>
        {isRender ? (
          <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: "#000" }}>
            {`\u20B9`}{oldPrice}
          </Text>
        ) : (<></>)}
      </>
    )
  }
  return (
    <Container
      style={{
        height: "auto",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: url }} />
      <View
        style={{
          paddingLeft: 10,
          width: "35%",
          borderWidth: 0,
          borderColor: "#000"
        }}
      >
        <Text style={{ color: "#000" }}>{productName} </Text>
        <Text style={{ fontSize: 10, color: "#000" }}>
          {miniDescription}
        </Text>
        <View style={{ flexDirection: "row" }}>

          {Object.keys(quantity).length === 0 ? (
            <Text style={{ color: "#000" }}>
              {" "}
              {`\u20B9`}
              {price}/{data.prefix}
            </Text>
          ) : (
            <Text style={{ color: "#000" }}>
              {" "}
              {`\u20B9`}
              {price}/{data.prefix}
              {quantity.quantity === 0
                ? ""
                : `- \u20B9${price * quantity.quantity} `}
            </Text>
          )}
        </View>
      </View>

      {props.outOfStock ? (
        <Text
          style={{
            color: "#ff0000",
            width: "auto",
            alignSelf: "center",
            textAlign: "center",
            marginLeft: 20,
          }}
        >
          Out of Stock
        </Text>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              onPress={() => {
                if (quantity.quantity >= 0) {
                  if (data.minQuantity < quantity.quantity) {
                    _setQuantity({
                      label: `${quantity.quantity - 1}${data.prefix}`,
                      quantity: quantity.quantity - 1,
                    });
                  } else {
                    _setQuantity({
                      label: `${0}${data.prefix}`,
                      quantity: 0,
                    });
                  }
                }
              }}
              name="minuscircle"
              size={24}
            />
            <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
              {quantity.quantity}
            </Text>

            <MaterialIcons
              onPress={() => {
                if (data.maxQuantity > quantity.quantity) {
                  if (quantity.quantity === 0) {
                    _setQuantity({
                      label: `${parseInt(data.minQuantity)}${data.prefix}`,
                      quantity: parseInt(data.minQuantity),
                    });
                  } else {
                    _setQuantity({
                      label: `${quantity.quantity + 1}${data.prefix}`,
                      quantity: quantity.quantity + 1,
                    });
                  }
                }
              }}
              name="add-circle-outline"
              size={30}
            />
          </View>

          <TouchableWithoutFeedback
            onPress={async () => {
              if (quantity.quantity === 0) {
                Dispatch(actions.message("Please select a quantity first"));
              } else {
                let porodObj = data;
                porodObj.purchasePrice = price;
                porodObj.prevPrice = price;
                console.log("VC",porodObj);
                Dispatch(
                  actions.addToCart({
                    message: `${quantity.quantity}${data.prefix} ${productName} added to cart`,
                    data: {
                      ...porodObj,
                      quantity: {
                        ...quantity,
                        label: `${quantity.quantity}${data.prefix}`,
                      },
                      quantitySold: undefined,
                    },
                  })
                );
              }
            }}
          >
            <ButtonView style={{backgroundColor:(inCart?"red":"#5ee363")}}>
              <Text style={{ fontWeight: "bold", color: "white" }}>Add{inCart&&"ed"}</Text>
            </ButtonView>
          </TouchableWithoutFeedback>
        </>
      )}
    </Container>
  );
};
export default VegetableCard;
