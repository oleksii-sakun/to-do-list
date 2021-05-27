import "antd/dist/antd.css";
import { DatePicker } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import { Column, Task } from "./Board";
import { Moment } from "moment";
import { ColorItem } from "./ColorItem";
import { updateTaskAction } from "../redux/actions/editTaskActions";
import moment from "moment";
import { SelectData } from "./SingInForm";

interface EditTaskModalInterface {
  onClose: () => void;
  taskToEdit: Task;
  columns: Column[];
}

interface HandlerFunctionInterface {
  event: React.SyntheticEvent<HTMLElement, Event>;
  data: { value?: any };
}

export default function EditTaskModal(
  props: EditTaskModalInterface
): JSX.Element {
  const dispatch = useDispatch();

  const { taskToEdit } = props;

  const [inputValue, setEditInputValue] = useState(taskToEdit.title);
  const [dateDeadline, setDateDeadeline] = useState(taskToEdit.date);
  const [taskColumnId, setTaskColumnId] = useState(taskToEdit.columnId);
  const [cardColor, setCardColor] = useState(taskToEdit.color);

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
  const dateFormat = "DD-MM-YYYY";

  const handleChangeCardColor = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: SelectData
  ) => {
    setCardColor(data.value);
  };

  const handleChangeTaskTitile = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: SelectData
  ) => {
    setEditInputValue(data.value);
  };

  const handleDateSelect = (date: Moment) => {
    setDateDeadeline(date.format(dateFormat).toString());
  };

  const handleSaveModal = () => {
    dispatch(
      updateTaskAction({
        id: taskToEdit.id,
        title: inputValue,
        color: cardColor,
        date: dateDeadline,
        columnId: taskColumnId,
      })
    );
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
              <DatePicker
                className="data-picker"
                onSelect={handleDateSelect}
                defaultValue={moment(dateDeadline, dateFormat)}
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
