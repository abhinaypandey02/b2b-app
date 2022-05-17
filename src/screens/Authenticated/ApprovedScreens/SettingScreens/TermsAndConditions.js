import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native'
import Header from '../../../../components/AuthenticatedServices/Common/Header';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TermsAndConditions = () => {
  return (
    <>
      <Header title="Terms And Conditions" />
      <Container>
          <Text style={{margin:15}}>
              <Text style={{fontWeight:"bold",fontSize:20}}>Terms & Conditions:</Text>{"\n"}{"\n"}
              - You can either make an online payment or pay cash at the time of delivery{"\n"}{"\n"}
              - Any damaged items can be returned at the time of delivery{"\n"}{"\n"}
              - Returns are not accepted once delivery is confirmed and acknowledged
          </Text>

      </Container>
    </>
  );
};
export default TermsAndConditions;