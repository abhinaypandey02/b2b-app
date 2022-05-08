import React from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native-paper';
import Logout from '../../../functions/Logout';

import SettingsOptions from './../../../components/AuthenticatedServices/Settings/SettingsOptions';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text``;

const Settings = ({navigation}) => {
  const Navigate = () => navigation.navigate('entry');
  return (
    <Container>
      <SettingsOptions />
      <Button
        mode="contained"
        color="#000"
        style={{width: '95%',alignSelf:'center',marginTop:20}}
        onPress={() => {
          Logout(Navigate);
        }}>
        Logout
      </Button>
    </Container>
  );
};
export default Settings;
