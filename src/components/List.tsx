import React from "react";

interface ListProps {
  deleteColumnButton: JSX.Element;
  title: string;
}
const List: React.FC<ListProps> = (props) => {
  return (
    <div className="list_item">
      {props.deleteColumnButton}
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

export default List;
