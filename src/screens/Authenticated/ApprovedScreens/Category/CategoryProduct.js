import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ListOfVegies from "../../../../components/AuthenticatedServices/Common/ListOfVegies";
import axiosInitialize from "../../../../api/InitializeAxios";
import GenerateToken from "../../../../functions/GenerateToken";

const Container = styled.View``;
const Heading = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

const Switch = ({ data, caseType, fetch }) => {
  if (caseType === true) {
    return (
      <>
        {data.length === 0 ? (
          <Text style={{ color: "#000", padding: 10 }}>
            No products in this category
          </Text>
        ) : (
          <>
            <ListOfVegies data={data} />
          </>
        )}
      </>
    );
  } else if (caseType === false) {
    return (
      <>
        <Text style={{ padding: 20, fontSize: 20 }}>Network Error</Text>
        <Button onPress={fetch}>Retry</Button>
      </>
    );
  } else if (caseType === null) {
    return (
      <ActivityIndicator
        color="#000"
        size={30}
        style={{ width: "100%", alignSelf: "center", padding: 20 }}
      />
    );
  }
};

const CategoryProduct = ({ route, navigation }) => {
  const [data, _setData] = React.useState([]);
  const [status, _setStatus] = React.useState(null);

  const Fetch = async () => {
    _setStatus(null);
    try {
      const token = await GenerateToken();
      axiosInitialize
        .post(
          "/fetchOneCategory",
          { data: { name: route.params.title } },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          _setStatus(true);
          _setData([...res.data.data]);
        });
    } catch {
      _setStatus(false);
    }
  };

  React.useEffect(() => {
    Fetch();
  }, [route.params]);

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 15,
          alignItems: "center",
        }}
      >
        <Heading>{route.params.title}</Heading>
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          name="arrow-down"
          size={30}
          color="#000"
        />
      </View>
      <Switch caseType={status} data={data} fetch={Fetch} />
    </Container>
  );
};
export default CategoryProduct;
