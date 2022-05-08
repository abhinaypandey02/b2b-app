import React from 'react';
import styled from 'styled-components/native';
import {
  Keyboard,
  ScrollView,
  Dimensions,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {theme} from '../../../../config/themeFile';
import Header from '../../../../components/AuthenticatedServices/Common/Header';

const {height} = Dimensions.get('screen');

const Container = styled.View`
  flex: 100%;
`;

const Loading = () => (
  <View style={{flex: 1, margin: 10}}>
    <ActivityIndicator color={'#000'} />
  </View>
);

const AlertMessage = (title) => {
  return Alert.alert('FixOrie', title);
};

const Input = ({value, onChangeText, ...rest}) => (
  <TextInput
    {...rest}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    style={{
      fontFamily: theme.fontFamilyPrimary,
      width: '90%',
      elevation: 20,
      fontSize: 18,
      alignSelf: 'center',
      marginTop: 10,
      backgroundColor: '#fff',
    }}
    theme={{colors: {text: 'black', primary: 'black'}}}
  />
);

const Address = ({navigation}) => {
  const [values, _setValues] = React.useState({
    houseNo: '',
    sector: '',
    pinCode: '',
  });

  const ChangeVals = (value, key) => {
    _setValues({...values, [key]: value});
  };

  const CheckVals = () => {
    let bool = true;
    if (values.houseNo === '') {
      AlertMessage('Please provide your house no.');
      bool = false;
    } else if (values.sector === '') {
      AlertMessage('Please provide your house no.');
      bool = false;
    } else if (values.pinCode.length !== 6) {
      AlertMessage('Please provide a valid Pin Code');
      bool = false;
    }
    return bool;
  };

  const Submit = () => {
    Keyboard.dismiss();

    if (CheckVals()) {
      navigation.navigate('OrderReview', values);
    }
  };

  return (
    <Container>
      <Header title="Address" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Input
          label="House No, Building"
          onChangeText={(text) => ChangeVals(text, 'houseNo')}
          value={values.houseNo}
        />
        <Input
          onChangeText={(text) => ChangeVals(text, 'sector')}
          label="Sector, Phase or Landmark"
          value={values.sector}
        />
        <Input
          onChangeText={(text) => ChangeVals(text, 'pinCode')}
          label="Your Pin Code"
          maxLength={6}
          keyboardType="numeric"
          value={values.pinCode}
        />
        <Button
          style={{width: '90%', marginTop: 10, alignSelf: 'center'}}
          mode="contained"
          onPress={Submit}
          color="#000">
          Continue
        </Button>
        <View style={{height: 300}} />
      </ScrollView>
    </Container>
  );
};
export default Address;
