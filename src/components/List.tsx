import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Icon, Input } from "semantic-ui-react";
import { editColumnTitleAction } from "../redux/actions/inputAction";

interface ListProps {
  deleteColumnButton: JSX.Element;
  title: string;
  children: ReactNode;
  id: number;
}
const List: React.FC<ListProps> = (props: ListProps) => {
  const [editInputStatus, setEditInput] = useState(false);
  const [columnTitle, setColumnTitle] = useState(props.title);

  const dispatch = useDispatch();

  const handleEditInputStatusChange = () => {
    setEditInput(true);
  };

  const handleEditColumnTitile = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setColumnTitle(data.value);
  };

  return (
    <div className="list_item">
      <div className="list-item__header">
        {editInputStatus ? (
          <Input
            value={columnTitle}
            onChange={handleEditColumnTitile}
            onKeyPress={(event: { key: string; target: { value: string } }) => {
              if (event.key === "Enter") {
                dispatch(editColumnTitleAction(props.id, event.target.value));
                setEditInput(false);
              }
            }}
          />
        ) : (
          <>
            <div className="list-item_title">
              <h1>{props.title}</h1>
              <Button
                size="tiny"
                onClick={handleEditInputStatusChange}
                className="edit-column-btn"
              >
                <Icon name="edit"></Icon>
              </Button>
            </div>
          </>
        )}

        {props.deleteColumnButton}
      </div>
      {props.children}
    </div>
  );
};

export default List;
