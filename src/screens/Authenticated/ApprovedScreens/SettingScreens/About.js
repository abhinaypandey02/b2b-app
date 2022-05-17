import React from 'react';
import styled from 'styled-components/native';

import Header from '../../../../components/AuthenticatedServices/Common/Header';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Text = styled.Text``

const About = () => {
  return (
    <>
      <Header title="About Us" />
      <Container>
          <Text style={{margin:15}}>
              <Text style={{fontWeight:"bold",fontSize:20}}>Freshtables is Farm to Door fresh vegetables delivery.</Text>{"\n"}
              We grow and procure vegetables from local farms and deliver them to urban areas like Home & Retail outlets, Businesses, etc.
          </Text>
      </Container>
    </>
  );
};
export default About;