import React, {useEffect} from "react";
import styled from "styled-components/native";
import {TextInput, Button} from "react-native-paper";
import {
    ScrollView, Dimensions, View, TouchableWithoutFeedback, Alert, Platform
} from "react-native";
import GetLocation from 'react-native-get-location'
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

const Input = styled(TextInput)`
  width: 90%;
  margin-top: 10px;
`;
const Text = styled.Text`
  font-size: 15px;
  padding: 2px;
  color: #fff;
`;

const ButtonView = styled.View`
  width: 30%;
  border-radius: 10px;
  padding: 5px;
  background-color: #000;
  align-items: center;
  justify-content: center;
  margin-horizontal: 1.5%;
`;

const Image = styled.Image`
  width: 30%;
  height: 100px:
`;

const {width, height} = Dimensions.get("screen");

const ProvideDetails = ({FetchStatus}) => {
    const [UploadImages, _setUploadImages] = React.useState([]);
    const [details, _setDetails] = React.useState({
        shopName: "", ownerName: "", shopAddress: "", locationLink:"",businessType:""

    });
    console.log(details)
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true, timeout: 15000,
        })
            .then(({longitude, latitude}) => {
                _setDetails(old => ({...old, location: {latitude, longitude}}))
            });
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);

    const ImageUpload = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5,
        });
        if (!result.cancelled) {
            let imagesObject = [...UploadImages];
            imagesObject[index] = {...result};
            console.log(result)
            storage()
                .ref(`images/${auth().currentUser.uid}/${index}`)
                .putFile(result.uri)
                .then(() => {
                    console.log("yay");
                    storage()
                        .ref(`images/${index}`)
                        .getDownloadURL()
                        .then((url) => {
                            database()
                                .ref(`users/${auth().currentUser.uid}/${index}`)
                                .set(url);
                        })
                        .catch(() => {
                            alert("Network error occured");
                        });
                });
            _setUploadImages([...imagesObject]);
            // console.log(imagesObject);
        }
    };

    const CheckValue = () => {
        if (UploadImages.length !== 3) {
            Alert.alert("FreshTables", "You need to provide required 3 photos");
            return false;
        }
        if (details.shopName === "") {
            Alert.alert("FreshTables", "You need to provide the Shop Name");
            return false;
        }
        if (details.shopAddress === "") {
            Alert.alert("FreshTables", "You need to provide the Shop Address");
            return false;
        }
        if (details.ownerName === "") {
            Alert.alert("FreshTables", "You need to provide the Owner Name");
            return false;
        }
        if (details.businessType === "") {
            Alert.alert("FreshTables", "You need to provide the Owner Name");
            return false;
        }
        return true;
    };

    const Submit = () => {
        if (CheckValue()) {
            database()
                .ref(`users/${auth().currentUser.uid}`)
                .update({details: details, profileStatus: "pending"})
                .then(() => {
                    FetchStatus();
                });
        }
    };

    return (<Container>
        <ScrollView
            contentContainerStyle={{
                width: width, alignItems: "center", height: height,
            }}
        >
            <Text style={{color: "#000", paddingTop: 20, fontSize: 20}}>
                Complete Your Profile
            </Text>
            <Input
                label="Shop Name"
                theme={{colors: {text: "black", primary: "black"}}}
                mode="outlined"
                value={details.shopName}
                onChangeText={(e) => {
                    _setDetails({...details, shopName: e});
                }}
            />
            <Input
                label="Owner Name"
                theme={{colors: {text: "black", primary: "black"}}}
                mode="outlined"
                value={details.ownerName}
                onChangeText={(e) => {
                    _setDetails({...details, ownerName: e});
                }}
            />
            <Input
                label="Shop Address"
                theme={{colors: {text: "black", primary: "black"}}}
                mode="outlined"
                value={details.shopAddress}
                onChangeText={(e) => {
                    _setDetails({...details, shopAddress: e});
                }}
            />
            <Input
                label="Location Link"
                theme={{colors: {text: "black", primary: "black"}}}
                mode="outlined"
                value={details.locationLink}
                onChangeText={(e) => {
                    _setDetails({...details, locationLink: e});
                }}
            />
            <Input
                label="Business Type"
                theme={{colors: {text: "black", primary: "black"}}}
                mode="outlined"
                value={details.businessType}
                onChangeText={(e) => {
                    _setDetails({...details, businessType: e});
                }}
            />
            {UploadImages.length !== 3 && (<Text
                style={{
                    color: "black", fontWeight: "bold", marginTop: 10, marginBottom: 10, fontSize: 25,
                }}
            >
                Upload Images
            </Text>)}

            <View style={{width: "90%", flexDirection: "row"}}>
                {typeof UploadImages[0] === "object" ? (<>
                    <View style={{width: "30%", height: 40}}>
                        {/* <Button
                  onPress={() => {
                    const array = [...UploadImages];
                    array[0] = "";
                    _setUploadImages([...array]);
                  }}
                  mode="contained"
                  style={{ marginHorizontal: "1.5%", height: 40 }}
                  color="#000"
                >
                  Cancel
                </Button> */}
                    </View>
                </>) : (<TouchableWithoutFeedback onPress={() => ImageUpload(0)}>
                    <ButtonView>
                        <Text style={{padding: 5, textAlign: "center"}}>
                            Shop Internal
                        </Text>
                    </ButtonView>
                </TouchableWithoutFeedback>)}
                {typeof UploadImages[1] === "object" ? (<View style={{width: "30%", height: 40}}>
                    {/* <Button
                  onPress={() => {
                    const array = [...UploadImages];
                    array[0] = "";
                    _setUploadImages([...array]);
                  }}
                  mode="contained"
                  style={{ marginHorizontal: "1.5%", height: 40 }}
                  color="#000"
                >
                  Cancel
                </Button> */}
                </View>) : (<TouchableWithoutFeedback onPress={() => ImageUpload(1)}>
                    <ButtonView>
                        <Text style={{padding: 5, textAlign: "center"}}>
                            Shop External
                        </Text>
                    </ButtonView>
                </TouchableWithoutFeedback>)}
                {typeof UploadImages[2] === "object" ? (<View style={{width: "30%", height: 40}}>
                    {/* <Button
                  onPress={() => {
                    const array = [...UploadImages];
                    array[0] = "";
                    _setUploadImages([...array]);
                  }}
                  mode="contained"
                  style={{ marginHorizontal: "1.5%", height: 40 }}
                  color="#000"
                >
                  Cancel
                </Button> */}
                </View>) : (<TouchableWithoutFeedback onPress={() => ImageUpload(2)}>
                    <ButtonView>
                        <Text style={{padding: 5, textAlign: "center"}}>
                            Business Banner
                        </Text>
                    </ButtonView>
                </TouchableWithoutFeedback>)}
            </View>
            <Button
                onPress={Submit}
                mode="contained"
                color="#000"
                style={{marginTop: 10, width: "90%"}}
            >
                Continue
            </Button>
        </ScrollView>
    </Container>);
};
export default ProvideDetails;
