import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";

export default function CustomCard(props) {
  return (
    <Card className="custom_card">
      <Card.Content>
        <Button
          floated="right"
          size="tiny"
          onClick={props.handleActionForDeleteTaskButtton}
        >
          <Icon name="trash" />
        </Button>

        <Card.Content>{props.task}</Card.Content>
      </Card.Content>

      {props.buttons}
    </Card>
  );
}
