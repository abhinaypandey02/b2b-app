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
      <Container></Container>
    </>
  );
};
export default About;