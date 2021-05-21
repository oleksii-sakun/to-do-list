import React, { ReactNode } from "react";

interface ListProps {
  deleteColumnButton: JSX.Element;
  title: string;
  children: ReactNode;
}
const List: React.FC<ListProps> = (props: ListProps) => {
  return (
    <div className="list_item">
      <div className="list-item__header">
        <h1 className="list-item_title">{props.title}</h1>
        {props.deleteColumnButton}
      </div>
      {props.children}
    </div>
  );
};

export default List;
