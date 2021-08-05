import React from "react";
import styled from "styled-components";
import { Color } from "../styledComponents/colors";

import { Button } from "../styledComponents/style";

const CounterButtonEl = styled(Button)`
  padding: 0.5em 1em;
  border: 3px solid transparent;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: all 0.12s ease-in-out;
  font-weight: 600;

  text-shadow: 2px 2px 3px ${Color.neutrals.blackLight};

  :hover {
    cursor: pointer;
  }

  user-select: none;
`;

type CounterButtonProps = {
  color: string
  content: string,
  value: number,
  onClick: (newValue: number) => void
}

const CounterButton = (props: CounterButtonProps) => {
  return (
    <CounterButtonEl
      color={props.color}
      textColor={"white"}
      onClick={() => props.onClick(props.value + 1)}
      style={{ marginRight: "1em" }}
    >
      {props.content}
    </CounterButtonEl>
  )
}

export default CounterButton;