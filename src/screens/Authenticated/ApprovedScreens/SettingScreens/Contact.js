import React from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native'

import Header from '../../../../components/AuthenticatedServices/Common/Header';
import {Text} from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Contact = () => {
  return (
    <>
      <Header title="Contact Us" />
      <Container>
          <Text style={{margin:15}}>
              <Text style={{fontWeight:"bold",fontSize:30}}>Contact Us:</Text>{"\n"}{"\n"}
              <Text style={{fontSize:20}} onPress={()=>{
                  Linking.openURL(`tel:+919110514772`)
              }}>+91 9110514772</Text>
              {"\n"}{"\n"}
              <Text style={{fontSize:20}} onPress={()=>{
                  Linking.openURL(`mailto:freshtables.in@gmail.com`)
              }}>freshtables.in@gmail.com</Text>
              {"\n"}{"\n"}
          </Text>
      </Container>
    </>
  );
};
export default Contact;