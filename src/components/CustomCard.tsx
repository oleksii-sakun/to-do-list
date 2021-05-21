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
  date: string;
  handleActionForDeleteTaskButtton: () => void;
  onChangeColor: (color: string) => void;
}

export default function CustomCard(props: CustomCardProps): JSX.Element {
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [inputValue, setEditInputValue] = useState(props.title);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateDeadline, setDateDeadeline] = useState(props.date);

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
    setDateDeadeline(date.format("DD-MM-YYYY").toString());
    dispatch(
      addTaskDedalineAction(props.id, date.format("DD-MM-YYYY").toString())
    );
  };

  return (
    <Card color={props.color}>
      <div className="custom-card">
        <Card.Content>
          <div style={{ width: 50 }}></div>

          <Button
            floated="right"
            onClick={handleChangeEditableStatus}
            className="edit-calendar__btn show-calendar__btn"
            size="tiny"
          >
            <Icon name="edit"></Icon>
          </Button>

          <Button
            floated="right"
            size="tiny"
            onClick={props.handleActionForDeleteTaskButtton}
            className="trash-btn"
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

            <Card.Content>Deadline: {dateDeadline}</Card.Content>
          </Card.Content>
        </Card.Content>

        <div className="custom-card__footer">
          <Select
            value={props.color}
            options={colorOptions}
            onChange={handleChangeCardColor}
          />

          {props.buttons}
          <Button
            onClick={handleShowCalendar}
            className="edit-calendar__btn"
            size="mini"
          >
            <Icon name="calendar alternate outline"></Icon>
          </Button>
        </div>

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
