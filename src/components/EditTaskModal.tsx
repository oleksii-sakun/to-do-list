import "antd/dist/antd.css";
import { DatePicker } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import {
  addTaskDedalineAction,
  changeTaskColorAction,
  editTaskTitleAction,
  getAppDataAction,
  updateTaskColumnIdAction,
} from "../redux/actions/inputAction";
import { Column, Task } from "./Board";
import { Moment } from "moment";
import { ColorItem } from "./ColorItem";
import { resetTaskToEditAction } from "../redux/actions/editTaskActions";
import moment from "moment";

interface EditTaskModalInterface {
  onClose: () => void;
  taskToEdit: Task;
  columns: Column[];
}

export default function EditTaskModal(
  props: EditTaskModalInterface
): JSX.Element {
  const dispatch = useDispatch();

  const taskToEdit = props.taskToEdit;

  const [inputValue, setEditInputValue] = useState(taskToEdit?.title);
  const [dateDeadline, setDateDeadeline] = useState(taskToEdit?.date);
  const [taskColumnId, setTaskColumnId] = useState(taskToEdit?.columnId);
  const [cardColor, setCardColor] = useState(taskToEdit?.color);

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

  const handleDateSelect = (date: Moment) => {
    setDateDeadeline(date.format("DD-MM-YYYY").toString());
  };

  const handleSaveModal = () => {
    dispatch(editTaskTitleAction(taskToEdit.id, inputValue));
    dispatch(addTaskDedalineAction(taskToEdit.id, dateDeadline));
    dispatch(updateTaskColumnIdAction(taskToEdit.id, taskColumnId));
    dispatch(changeTaskColorAction(taskToEdit.id, cardColor));
    dispatch(getAppDataAction());
    dispatch(resetTaskToEditAction());
  };

  return (
    <Modal size="tiny" open={Boolean(taskToEdit)} onClose={props.onClose}>
      <Modal.Header>Edit task</Modal.Header>
      <div className="modal-content">
        <Modal.Content>
          <div className="modal__edit-task">
            <Input value={inputValue} onChange={handleChangeTaskTitile}></Input>
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
              <DatePicker
                className="data-picker"
                onSelect={handleDateSelect}
                defaultValue={moment(dateDeadline, "DD-MM-YYYY")}
              />
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
