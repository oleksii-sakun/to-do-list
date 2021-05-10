import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";

interface CustomCardProps {
  title: string;
  buttons: JSX.Element;
  handleActionForDeleteTaskButtton: () => void;
}

export default function CustomCard(props: CustomCardProps): JSX.Element {
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

        <Card.Content>{props.title}</Card.Content>
      </Card.Content>

      {props.buttons}
    </Card>
  );
}
