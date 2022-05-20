import React from "react";
import { IComments } from "../defaults/defaults";

import Card from "./Card";
import TextInput from "./TextInput";

// Simple component that provides a card with only a single text area child

type Key = keyof IComments | "narrative";

type FeedbackCardProps = {
  title: string;
  field: Key;
  content: string;
  updateContent: (newFeedback: { [key: string]: string }) => void;
};

const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <Card title={`${props.title}:`}>
      <TextInput
        value={props.content}
        updateForm={props.updateContent}
        field={props.field}
        noLabel
        placeholder={props.title}
        textArea
      />
    </Card>
  );
};

export default FeedbackCard;
