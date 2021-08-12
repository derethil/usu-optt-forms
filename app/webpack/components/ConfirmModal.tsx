import React, { useState } from "react";
import Modal from "react-modal";

import { Button, Title } from "../styledComponents/style";
import Color from "../styledComponents/colors";
import { hexToRGBA } from "../utils/utils";
import styled from "styled-components";

const customStyles = {
  overlay: {
    backgroundColor: `${hexToRGBA(Color.neutrals.black, 0.95)}`,
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overlay: "hidden",
    padding: "2em",

    border: "none",
    color: `${Color.neutrals.grayDarker}`,

    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    borderRadius: "0.75em",
  },
};

const ModalTitle = styled(Title)`
  padding: 0.9em 1.8em 1.8em 1.8em;
  text-align: center;
`;

const ModalContent = styled.p`
  text-align: center;
`;

const ActionsWrapper = styled.div`
  padding-top: 3.25em;
  display: flex;
  justify-content: space-evenly;
`;

const ModalButton = styled(Button)`
  width: 50%;
  font-weight: 600;
`;

Modal.setAppElement("#app-root");

type ConfirmModalProps = {
  handleConfirm: () => void;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleConfirmClicked = () => {
    props.handleConfirm();
    setIsOpen(false);
  };

  return (
    <div
      style={{
        fontWeight: 600,
        width: "45%",
        height: "104px",
      }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        color={Color.contextual.danger}
        textColor={Color.lights.light}
        style={{
          border: `3px solid ${Color.accents.brick}`,
          borderRadius: "0.25em",
          height: "98px",
          padding: 0,
        }}
      >
        Reset Form
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Confirm Reset"
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "auto")}
      >
        <ModalTitle>Confirm Form Reset</ModalTitle>

        <ModalContent>
          This action will erase <strong>ALL</strong> information and cannot be
          undone.
        </ModalContent>
        <ModalContent>Are you sure you want to continue?</ModalContent>

        <ActionsWrapper>
          <ModalButton
            onClick={() => handleConfirmClicked()}
            color={Color.blues.blue}
            textColor={Color.lights.light}
          >
            Confirm
          </ModalButton>
          <ModalButton
            onClick={() => setIsOpen(false)}
            style={{ color: Color.blues.blue }}
          >
            Cancel
          </ModalButton>
        </ActionsWrapper>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
