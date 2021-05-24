import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";

export default function ModalComponent(props: {
  onClose: () => void;
  onConfirm: (id: number) => void;
}): JSX.Element {
  const taskToDelete = useSelector((store: any) => store.taskToDelete);

  const handleConfirm = () => {
    props.onConfirm(taskToDelete.id);
  };
  return (
    <Modal size="mini" open={Boolean(taskToDelete)} onClose={props.onClose}>
      <Modal.Header>Delete Your Task</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your task {taskToDelete?.title}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={props.onClose}>
          No
        </Button>
        <Button positive onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
