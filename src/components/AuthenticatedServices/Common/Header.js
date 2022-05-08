import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../config/themeFile';

const Container = styled.View`
  width: 100%;
  background-color: #000;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
  margin-right: 30px;
`;

const Header = ({title, onBackCallback, goBack = true}) => {
  const Navigation = useNavigation();
  return (
    <Container>
      {goBack && (
        <MaterialCommunityIcons
          onPress={() => {
            Navigation.goBack();
            if (onBackCallback) {
              onBackCallback();
            }
          }}
          name="keyboard-backspace"
          style={{padding: 5}}
          color="#fff"
          size={30}
        />
      )}

      <Heading>{title}</Heading>
    </Container>
  );
};
export default Header;
