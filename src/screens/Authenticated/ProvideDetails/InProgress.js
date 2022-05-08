import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const InProgress = () => {
  return (
    <Container>
        
      <Text style={{fontSize:20}}>Waiting for approval</Text>
    </Container>
  );
};
export default InProgress;
