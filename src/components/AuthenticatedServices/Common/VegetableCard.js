import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components/native";
import {Dimensions, TouchableWithoutFeedback, TextInput, Keyboard, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {actions} from "../../../redux/CartAndOrders";
import {theme} from "../../../config/themeFile";
import {useKeyboardState} from "../../../screens/Authenticated/useKeyboardState";
const {width} = Dimensions.get("screen");

const Container = styled.View`
  padding: 5px;
  margin: 4px;
  border-radius: 10px;
  background-color: #fff;
  elevation: 4;
  flex-direction: row;
  align-items: center;
`;
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

const VegetableCard = (props) => {
    const State = useSelector((state) => state.CartAndOrders.cart);
    const inCart = State.find(o => o.itemDatabase === props.itemDatabase);
    const [data, _setData] = useState({
        name: "",
        price: "",
        prevPrice: "",
        image: "",
        miniDescription: "",
        minQuantity: "",
        maxQuantity: "",
        prefix: "",
        purchasePrice: ""
    });
    const [quantity, _setQuantity] = useState({
        quantity: 0,
    });
    const [localValue,setLocalValue]=useState(0);
    const Dispatch = useDispatch();

    const {productName, price, url, miniDescription} =
        data;
    useEffect(() => {
        _setData({...props});
    }, [props]);

    useEffect(() => {
        if(!props.keyboardOn) updateQuantity(localValue)
    }, [props.keyboardOn]);
    function updateQuantity(val){
        if (data.maxQuantity > val) {
            let newQuantity;
            if (val >0&&val<data.minQuantity) {
                if(val>quantity.quantity){
                    newQuantity={
                        label: `${parseInt(data.minQuantity)}${data.prefix}`,
                        quantity: parseInt(data.minQuantity),
                    };
                } else {
                    newQuantity={
                        label: `0${data.prefix}`,
                        quantity: 0,
                    };
                }

            } else {
                newQuantity={
                    label: `${val}${data.prefix}`,
                    quantity: val,
                };
            }
            // console.log(newQuantity)
            _setQuantity(newQuantity);
            setLocalValue(newQuantity.quantity)
        }
    }
    return (
        <Container
            style={{
                height: "auto",
                alignItems: "center",
            }}
        >
            <Image source={{uri: url}}/>
            <View
                style={{
                    paddingLeft: 10,
                    width: "35%",
                    borderWidth: 0,
                    borderColor: "#000"
                }}
            >
                <Text style={{color: "#000"}}>{productName} </Text>
                <Text style={{fontSize: 10, color: "#000"}}>
                    {miniDescription}
                </Text>
                <View style={{flexDirection: "row"}}>

                    {Object.keys(quantity).length === 0 ? (
                        <Text style={{color: "#000"}}>
                            {" "}
                            {`\u20B9`}
                            {price}/{data.prefix}
                        </Text>
                    ) : (
                        <Text style={{color: "#000"}}>
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
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <AntDesign
                            onPress={() => updateQuantity(quantity.quantity-1)}
                            name="minuscircle"
                            size={24}
                        />
                        <TextInput keyboardType="numeric" onChangeText={(v)=>{
                            const num=parseInt(v);
                            if(!isNaN(num)){
                                setLocalValue(num);
                            }
                        }} defaultValue={localValue.toString()} style={{fontSize: 20, marginHorizontal: 10}}/>

                        <MaterialIcons
                            onPress={() => updateQuantity(quantity.quantity+1)}
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
                                console.log("VC", porodObj);
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
                        <ButtonView style={{backgroundColor: (inCart ? "red" : "#5ee363")}}>
                            <Text style={{fontWeight: "bold", color: "white"}}>Add{inCart && "ed"}</Text>
                        </ButtonView>
                    </TouchableWithoutFeedback>
                </>
            )}
        </Container>
    );
};
export default VegetableCard;
