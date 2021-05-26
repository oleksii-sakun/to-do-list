import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { useDispatch } from "react-redux";
import { Task } from "./Board";
import { setTaskToEditAction } from "../redux/actions/editTaskActions";

interface CustomCardProps {
  task: Task;
  title: string;
  color: SemanticCOLORS;
  id: number;
  date: string;
  handleActionForDeleteTaskButtton: () => void;
}

export default function CustomCard(props: CustomCardProps): JSX.Element {
  const dispatch = useDispatch();

  const handleEditTask = () => {
    dispatch(setTaskToEditAction(props.task));
  };

  return (
    <Card color={props.color} className="card-wrapper">
      <div className="custom-card">
        <Card.Content>
          <Button
            floated="right"
            onClick={handleEditTask}
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
          <Card.Header>{props.title}</Card.Header>
          <Card.Content>Deadline: {props.date}</Card.Content>
        </Card.Content>
      </div>
    </Card>
  );
}
