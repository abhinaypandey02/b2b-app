import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Title, TextInput, Button, Text, Snackbar } from "react-native-paper";
import {
  ScrollView,
  Dimensions,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStore from "@react-native-async-storage/async-storage";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

const { width } = Dimensions.get("screen");

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;
const Input = styled(TextInput)`
  width: 70%;
  border-radius: 10px;
`;

const RowView = styled.View`
  width: 100%;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;
const CurvedButton = styled(Button)``;

const LogoImage = styled.Image`
  width: 200px;
  height: 100px;
`;

let phoneNumber;

const Landing = () => {
  const [phone, _setPhone] = React.useState("");
  const [confirm, setConfirm] = React.useState(null);
  const [OTP, _setOTP] = React.useState("");
  const [loading, _setLoading] = React.useState(false);
  const [loading2, _setLoading2] = React.useState(false);
  const [visible, _setVisible] = React.useState(false);

  async function signInWithPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 10) {
      _setLoading(true);
      AsyncStore.setItem("phone", phoneNumber);
      console.log("phone number" + phoneNumber);
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          "+91" + phoneNumber
        );
        _setVisible(true);
        console.log("confirmation", confirmation);
        setConfirm(confirmation);
        _setLoading(false);
        setTimeout(() => {
          _setVisible(false);
        }, 700);
        console.log(confirmation);
      } catch (err) {
        Alert.alert("FreshTables", err.message);
      }
    } else {
      Alert.alert("Company", "Please provide a valid 10 digit phone number.");
    }
  }
  async function confirmCode(code) {
    try {
      _setLoading2(true);
      await confirm.confirm(code);
      _setLoading2(false);
      _setLoading(false);
      setTimeout(() => {
        _setPhone("");
        _setOTP("");
      }, 1500);
    } catch (error) {
      Alert.alert("Invalid code.", "Given code is invalid");
    } finally {
      _setLoading2(false);
    }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <ViewContainer>
          <Title style={{ color: "#000" }}>FreshTables</Title>
          {!confirm ? (
            <>
              <Input
                label="PhoneNo (+91)"
                mode="outlined"
                value={phone}
                keyboardType={"numeric"}
                maxLength={10}
                onChangeText={(text) => _setPhone(text)}
                theme={{ colors: { text: "black", primary: "black" } }}
              />
              <CurvedButton
                loading={loading}
                color="#000"
                uppercase={false}
                onPress={() => signInWithPhoneNumber(phone)}
                style={{ marginTop: 10, width: "50%", elevation: 10 }}
                mode="contained"
              >
                Send OTP
              </CurvedButton>
            </>
          ) : (
            <>
              <Input
                label="OTP"
                mode="outlined"
                value={OTP}
                maxLength={6}
                keyboardType={"numeric"}
                onChangeText={(text) => _setOTP(text)}
                theme={{ colors: { text: "black", primary: "black" } }}
              />
              <Text style={{ marginTop: 10 }}>
                OTP sent To {`+91 ${phone}`}
              </Text>
              <CurvedButton
                loading={loading2}
                color="#000"
                uppercase={false}
                onPress={() => confirmCode(OTP)}
                style={{ marginTop: 10, width: "50%", elevation: 10 }}
                mode="contained"
              >
                Verify OTP
              </CurvedButton>
              <RowView>
                <CurvedButton
                  style={{
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: "#000",
                    width: 170,
                    elevation: 10,
                  }}
                  uppercase={false}
                  mode="contained"
                  onPress={() => {
                    _setOTP("");
                    setConfirm(null);
                  }}
                  color="#fff"
                >
                  <Text style={{ color: "#000" }}> Change Phone No</Text>
                </CurvedButton>
                <CurvedButton
                  loading={loading}
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: "#000",
                    elevation: 10,
                  }}
                  uppercase={false}
                  mode="contained"
                  onPress={() => signInWithPhoneNumber(phone)}
                  color="#fff"
                >
                  <Text style={{ color: "#000" }}>Resend OTP</Text>
                </CurvedButton>
              </RowView>
            </>
          )}
        </ViewContainer>
        <Snackbar visible={visible}>OTP SENT</Snackbar>
      </ScrollView>
    </Container>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ navigation }) => {
  const focused = useIsFocused();

  let Navigated = false;

  React.useEffect(() => {
    if (focused) {
      Navigated = false;
    }
  }, [focused]);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      const userData = user;
      console.log(userData);
      setTimeout(() => {
        try {
          if (auth().currentUser.phoneNumber && Navigated === false) {
            _setLoading(true);
            console.log(user);
            console.log("navigation done this time");
            database()
              .ref(`users/${user.uid}`)
              .update({ phone: auth().currentUser.phoneNumber });
            AsyncStore.setItem("login", "true");
            auth()
              .currentUser.getIdToken(true)
              .then((token) => {
                AsyncStore.setItem("token", token);
              });
            AsyncStore.setItem("uid", user.uid);
            setTimeout(() => {
              navigation.reset({ index: 0, routes: [{ name: "homeScreen" }] });
            }, 1200);
            Navigated = true;
          } else {
          }
        } catch {}
      }, 200);
    });
  }, []);

  const [loading, _setLoading] = React.useState(false);
  return (
    <>
      <Landing />
      <Snackbar
        visible={loading}
        duration={1200}
        onDismiss={() => _setLoading(false)}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: width - 100,
          }}
        >
          <Text style={{ color: "#fff" }}> VERIFYING OTP</Text>
          <ActivityIndicator color={"#fff"} />
        </View>
      </Snackbar>
    </>
  );
};
