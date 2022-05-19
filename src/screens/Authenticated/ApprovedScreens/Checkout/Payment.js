import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text, ActivityIndicator, Alert } from "react-native";
import { Button } from "react-native-paper";
import BookOrder from "../../../../api/BookOrder";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../../redux/CartAndOrders";
import GenerateToken from "../../../../functions/GenerateToken";
import axiosInitialize from "./../../../../api/InitializeAxios";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import Header from "../../../../components/AuthenticatedServices/Common/Header";
import PaymentUPI from "./PaymentUPI";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View``;

const Payment = ({ navigation, route }) => {
  const State = useSelector((state) => state.CartAndOrders.cart);
  const Dispatch = useDispatch();

  const Order = async (paymentType) => {
    console.log("Order page ", State);
    _setLoading(true);
    let price = 0;
    State.map((item) => {
      price += parseInt(item.price * item.quantity.quantity);
    });

    try {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const hoursAndTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
      const newdate = year + "/" + month + "/" + day;
      const { delieveryPrice } = route.params;
      database()
        .ref(`users/${auth().currentUser.uid}/details`)
        .once("value", async (snap) => {
          if (snap.val()) {
            const token = await GenerateToken();
            const request = await axiosInitialize.post(
              "/bookOrder",
              {
                price,
                product: State,
                quantitySold: null,
                phone: auth().currentUser.phoneNumber,
                date: newdate,
                time: hoursAndTime,
                shopName: snap.val().shopName,
                paymentType,
                uid: auth().currentUser.uid,
                address: snap.val().shopAddress,
                shippingSlot: shippingSlots[selectedshippingSlot].title+" "+ shippingSlots[selectedshippingSlot].time,
                delieveryPrice,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            _setLoading(false);
            Dispatch(actions.clearCart());
            request.data.data.map((order) => {
              Dispatch(actions.addOrders(order));
            });
            navigation.navigate("home", { screen: "Orders" });
          }
        });
    } catch (err) {
      Alert.alert(
        "Freshtables",
        "Network Error Occured",
        {
          text: "Try Again",
          onPress: () => Order,
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.popToTop() }
      );
      _setLoading(false);
    }
  };

  const [loading, _setLoading] = React.useState(false);
  const [shippingSlots, setShippingSlots] = React.useState({});
  const [selectedshippingSlot, setSelectedShippingSlot] = React.useState("");


  useEffect(() => {
    fetchShippingSlots()
  }, []);
  useEffect(() => {
    if (selectedshippingSlot) {
      console.log("selectedshippingSlot loaded ", selectedshippingSlot);
    }
  }, [selectedshippingSlot])
  const fetchShippingSlots = () => {
    database()
      .ref('/shippingTimes')
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        console.log("shippingTimes ", data);
        if (data) {
          setShippingSlots(data)
        }
      });
  }

  return (
    <>
      <Header title="Payment" />

      <Container>
        <Text style={{ fontSize: 16, textAlign: "center" }}>Select your prefreable delivery time</Text>
        {
          Object.keys(shippingSlots).map((spid) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedShippingSlot(spid)
                }}
                style={{
                  margin: 5, width: "90%", alignSelf: "center",
                  backgroundColor: spid === selectedshippingSlot ? "#919191" : "#e6e6e6",
                  padding: 8,
                  borderRadius: 3
                }}

                mode="contained"
                color="#000"
              >
                <Text>{shippingSlots[spid].title} {shippingSlots[spid].time}</Text>
              </TouchableOpacity>
            )
          })
        }
        {
          ((selectedshippingSlot != "") && (
            <Button
              onPress={() => {
                Order("COD");
              }}
              disabled={loading}
              style={{ margin: 5, width: "90%", alignSelf: "center" }}
              mode="contained"
              color="#000"
            >
              Cash On Delivery
            </Button>
          ))
        }


        {loading == true && (
          <ActivityIndicator
            color="#000"
            style={{ width: "100%", alignSelf: "center", margin: 10 }}
          />
        )}
      </Container>
    </>
  );
};
export default Payment;
