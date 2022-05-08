import React from 'react';
import styled from 'styled-components/native';

import Header from '../../../../components/AuthenticatedServices/Common/Header';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Contact = () => {
  return (
    <>
      <Header title="Contact Us" />
      <Container></Container>
    </>
  );
};
export default Contact;