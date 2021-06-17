import React from "react";
import styled from "styled-components";

import { FormInformation } from "../components/formInformation";

const PageBaseDiv = styled.div`
  font-family: 'Poppins', sans-serif;
  width: 50%;
  margin: auto;
  text-align: center;
`;


export const STOForm = () => {
  return (
    <PageBaseDiv className="student-teaching-form">
      <h1>Student Teaching Observation Form</h1>
      <FormInformation />
    </PageBaseDiv>
  )
}