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
} from "../redux/actions/boardActions";
import { Column } from "./Board";
import { ColorItem } from "./ColorItem";
import "semantic-ui-css/semantic.min.css";

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

  const dateFormat = "DD-MM-YYYY";

  const colorOptions = [
    {
      value: "yellow",
      text: <ColorItem color="#CEFF00" />,
    },
    {
      value: "blue",
      text: <ColorItem color="#0048BA" />,
    },
    {
      value: "green",
      text: <ColorItem color="#00FF00" />,
    },
    {
      value: "red",
      text: <ColorItem color="#FF0800" />,
    },
    {
      value: "teal",
      text: <ColorItem color="#008080" />,
    },
    {
      value: "olive",
      text: <ColorItem color="#808000" />,
    },
  ];

  const handleChangeCardColor = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: { value?: any }
  ) => {
    setCardColor(data.value);
  };

  const handleChangeTaskTitile = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: { value?: any }
  ) => {
    setEditInputValue(data.value);
  };
  const dateNow = moment().format(dateFormat).toString();

  const handleDateSelect = (date: Moment) => {
    setDateDeadeline(date.format(dateFormat).toString());
  };

  const createTaskActionArguments = {
    title: inputValue,
    color: cardColor,
    date: dateDeadline || dateNow,
    columnId: taskColumnId,
  };

  const handleSaveModal = () => {
    if (inputValue) {
      dispatch(createTaskAction(createTaskActionArguments));
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
              onChange={(_, data: { value?: any }) =>
                setTaskColumnId(data.value)
              }
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
