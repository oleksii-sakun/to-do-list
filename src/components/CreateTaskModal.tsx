import { DatePicker } from "antd";
import moment from "moment";
import { Moment } from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import {
  createTaskAction,
  getAppDataAction,
} from "../redux/actions/inputAction";
import { Column } from "./Board";
import { ColorItem } from "./ColorItem";

interface CreateTaskModalInterface {
  columns: Column[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal(
  props: CreateTaskModalInterface
): JSX.Element {
  const dispatch = useDispatch();

  const [inputValue, setEditInputValue] = useState("");
  const [dateDeadline, setDateDeadeline] = useState("");
  const [taskColumnId, setTaskColumnId] = useState(1);
  const [cardColor, setCardColor] = useState("olive");

  const colorOptions = [
    {
      key: "yellow",
      value: "yellow",
      text: <ColorItem color="#CEFF00" />,
    },
    {
      key: "blue",
      value: "blue",
      text: <ColorItem color="#0048BA" />,
    },
    {
      key: "green",
      value: "green",
      text: <ColorItem color="#00FF00" />,
    },
    {
      key: "red",
      value: "red",
      text: <ColorItem color="#FF0800" />,
    },
    {
      key: "teal",
      value: "teal",
      text: <ColorItem color="#008080" />,
    },
    {
      key: "olive",
      value: "olive",
      text: <ColorItem color="#808000" />,
    },
  ];

  const handleChangeCardColor = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setCardColor(data.value);
  };

  const handleChangeTaskTitile = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setEditInputValue(data.value);
  };
  const now = moment().format("DD-MM-YYYY").toString();

  const handleDateSelect = (date: Moment) => {
    setDateDeadeline(date.format("DD-MM-YYYY").toString());
  };

  const handleSaveModal = () => {
    if (inputValue) {
      dispatch(
        createTaskAction(
          inputValue,
          cardColor,
          dateDeadline || now,
          taskColumnId
        )
      );
      props.onClose();
    } else {
      toast.error("write your task title, please");
    }

    dispatch(getAppDataAction());
  };

  return (
    <Modal size="tiny" open={Boolean(props.isOpen)} onClose={props.onClose}>
      <Modal.Header>Create task</Modal.Header>
      <div className="modal-content">
        <Modal.Content>
          <div className="modal__edit-task">
            <Input
              placeholder="write your task"
              value={inputValue}
              onChange={handleChangeTaskTitile}
            ></Input>
          </div>
        </Modal.Content>
        <Modal.Content>
          <div>
            <Select
              onChange={(_, data: any) => setTaskColumnId(data.value)}
              value={taskColumnId}
              options={props.columns.map((column) => ({
                value: column.id,
                text: column.title,
              }))}
            />
          </div>
        </Modal.Content>
        <Modal.Content>
          <div>
            <div className="site-calendar-demo-card">
              <DatePicker className="data-picker" onSelect={handleDateSelect} />
            </div>
          </div>
        </Modal.Content>
        <Modal.Content>
          <Select
            value={cardColor}
            options={colorOptions}
            onChange={handleChangeCardColor}
          />
        </Modal.Content>
      </div>
      <Modal.Actions>
        <Button negative onClick={props.onClose}>
          Cancel
        </Button>
        <Button positive onClick={handleSaveModal}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
