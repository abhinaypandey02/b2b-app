import React from 'react';
import styled from 'styled-components/native';

import Header from '../../../../components/AuthenticatedServices/Common/Header';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TermsAndConditions = () => {
  return (
    <>
      <Header title="Terms And Conditions" />
      <Container></Container>
    </>
  );
};
export default TermsAndConditions;