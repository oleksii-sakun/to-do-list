import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Select } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

interface CustomCardProps {
  title: string;
  buttons: JSX.Element;
  color: SemanticCOLORS;
  handleActionForDeleteTaskButtton: () => void;
  onChangeColor: (color: string) => void;
}

export default function CustomCard(props: CustomCardProps): JSX.Element {
  const colorOptions = [
    {
      key: "yellow",
      value: "yellow",
      text: (
        <div
          style={{
            width: 20,
            height: 20,
            background: "#CEFF00",
          }}
        ></div>
      ),
    },
    {
      key: "blue",
      value: "blue",
      text: (
        <div style={{ width: 20, height: 20, background: "#0048BA" }}></div>
      ),
    },
    {
      key: "green",
      value: "green",
      text: (
        <div style={{ width: 20, height: 20, background: "#00FF00" }}></div>
      ),
    },
    {
      key: "red",
      value: "red",
      text: (
        <div style={{ width: 20, height: 20, background: "#FF0800" }}></div>
      ),
    },
    {
      key: "teal",
      value: "teal",
      text: (
        <div style={{ width: 20, height: 20, background: "#008080" }}></div>
      ),
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

        <Card.Content>{props.title}</Card.Content>
        <Select
          value={props.color}
          options={colorOptions}
          onChange={handleChangeCardColor}
        />
      </Card.Content>

      {props.buttons}
    </Card>
  );
}
