import React, { useState } from "react";
import styled, { css } from "styled-components";
import Slider from "react-input-slider";
import Color from "../../styledComponents/colors";
import OptionRow from "../../components/optionRow";

const NotebookSliderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionRowWrapperStyles = css`
  width: 65%;
  border-left: 2px solid ${Color.neutrals.grayDarker};

  padding-left: 1em;
`;

const ContentStyles = styled.p`
  width: 35%;
  font-size: 1.2rem;

  margin: auto;
  padding-right: 1em;

  text-align: center;
`;

interface Props {
  content: string;
}

export default function NotebookSlider(props: Props) {
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <NotebookSliderContainer>
      <ContentStyles>{props.content}</ContentStyles>
      <OptionRow
        currSelection={String(sliderValue)}
        contentOptions={[...Array(6)].map((_, i) => (i * 2).toString())}
        updateSelection={(newSelection) => setSliderValue(Number(newSelection))}
        titleStyles={css`
          color: ${Color.neutrals.grayDark};
        `}
        containerStyles={OptionRowWrapperStyles}
      />
    </NotebookSliderContainer>
  );
}
