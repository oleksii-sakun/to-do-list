import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Select } from "semantic-ui-react";
import "./styles.css";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { ColorItem } from "./ColorItem";

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
      </Card.Content>

      <div className="custom-card__footer">
        <Select
          value={props.color}
          options={colorOptions}
          onChange={handleChangeCardColor}
        />
        {props.buttons}
      </div>
    </Card>
  );
}
