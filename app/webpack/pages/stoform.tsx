import React from "react";
import styled from "styled-components";

import { FormInformation } from "../components/formInformation";
import { RubricSTO } from "../components/rubricsto";

const PageBaseDiv = styled.div`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  margin: auto;
  text-align: center;

  display: flex;
  justify-content: space-around;

`;


export const STOForm = () => {
  return (
    <PageBaseDiv className="student-teaching-form">
      <FormInformation />
      <RubricSTO />
    </PageBaseDiv>
  )
}