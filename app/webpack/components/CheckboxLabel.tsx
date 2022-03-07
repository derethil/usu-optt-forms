import React from "react";
import styled from "styled-components";
import Color from "../styledComponents/colors";
import Checkbox from "./Checkbox";

interface Props extends React.ComponentPropsWithRef<"input"> {
  label: string;
}

const Label = styled.label`
  color: ${(props) => Color.neutrals.grayDark};
  user-select: none;
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.span`
  margin-left: 8px;
`;

export default function CheckboxLabel(props: Props) {
  return (
    <Wrapper>
      <Label>
        <Checkbox {...props} />
        <Text>{props.label}</Text>
      </Label>
    </Wrapper>
  );
}
