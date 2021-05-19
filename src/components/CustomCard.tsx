import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Input, Select } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { ColorItem } from "./ColorItem";
import {
  editTaskTitleAction,
  addTaskDedalineAction,
} from "../redux/actions/inputAction";
import { useDispatch } from "react-redux";
import { Calendar } from "antd";
import "antd/dist/antd.css";
import { Moment } from "moment";

interface CustomCardProps {
  title: string;
  buttons: JSX.Element;
  color: SemanticCOLORS;
  id: number;
  date: Moment;
  handleActionForDeleteTaskButtton: () => void;
  onChangeColor: (color: string) => void;
}

export default function CustomCard(props: CustomCardProps): JSX.Element {
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [inputValue, setEditInputValue] = useState(props.title);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateDeadline, setDateDeaeline] = useState(props.date);

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
      key: "white",
      value: "#FFFFFF",
      text: <ColorItem color="#FFFFFF" />,
    },
  ];

  const handleChangeCardColor = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ) => {
    console.log(event, data);

    props.onChangeColor(data.value);
  };

  const handleChangeEditableStatus = () => {
    setEditable(true);
  };

  const handleChangeTaskTitile = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setEditInputValue(data.value);
  };

  const handleEditCardTitle = (taskId: number, title: string) => {
    dispatch(editTaskTitleAction(taskId, title));
    setEditable(false);
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };
  const handleHideCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateSelect = (date: Moment) => {
    setDateDeaeline(date);
    addTaskDedalineAction(props.id, date);
  };

  return (
    <Card className="custom_card" color={props.color}>
      <Card.Content>
        <div style={{ width: 50 }}></div>

        <Button
          floated="right"
          size="tiny"
          onClick={props.handleActionForDeleteTaskButtton}
        >
          <Icon name="trash" />
        </Button>

        <Card.Content>
          {editable ? (
            <div>
              <Input
                value={inputValue}
                onChange={handleChangeTaskTitile}
              ></Input>
              <Button
                size="mini"
                onClick={() => handleEditCardTitle(props.id, inputValue)}
              >
                Save
              </Button>
            </div>
          ) : (
            props.title
          )}

          <Card.Content>{dateDeadline}</Card.Content>
        </Card.Content>
      </Card.Content>

      <div className="custom-card__footer">
        <Select
          value={props.color}
          options={colorOptions}
          onChange={handleChangeCardColor}
        />
        {props.buttons}
      </div>
      <div>
        <Button onClick={handleChangeEditableStatus}>
          <Icon name="edit" className="etit-task-btn"></Icon>
        </Button>
        <Button onClick={handleShowCalendar}>
          <Icon name="calendar alternate outline"></Icon>
        </Button>
        <div>
          {showCalendar ? (
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onSelect={handleDateSelect} />
              <Button size="mini" onClick={handleHideCalendar}>
                Hide calendar
              </Button>
            </div>
          ) : (
            <span />
          )}
        </div>
      </div>
    </Card>
  );
}
