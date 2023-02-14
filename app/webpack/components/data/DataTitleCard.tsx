import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import React from "react";
import ReactTooltip from "react-tooltip";
import { ActionCreators } from "redux-undo";
import styled, { css } from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";
import { cardContainerStyles } from "../../styledComponents/style";
import Card from "../Card";

interface DataTitleCardProps {
  title: string;
  undo: ActionCreatorWithoutPayload;
  children?: React.ReactNode;
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 1.5rem;
  cursor: pointer;
`;

function Title(props: DataTitleCardProps) {
  const dispatch = useAppDispatch();

  const handleUndo = () => {
    dispatch(props.undo());
  };

  return (
    <TitleWrapper>
      <span>{props.title}</span>
      <Icon
        className="fas fa-undo-alt"
        data-tip={`${props.title}-undo`}
        onClick={handleUndo}
      />
      <ReactTooltip place="top" effect="solid">
        Undo
      </ReactTooltip>
    </TitleWrapper>
  );
}

export default function DataTitleCard(props: DataTitleCardProps) {
  return (
    <Card
      title={<Title {...props} />}
      containerStyles={cardContainerStyles}
      titleStyles={css`
        font-size: 2rem;
      `}
    >
      {props.children}
    </Card>
  );
}
