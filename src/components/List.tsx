import React, { ReactNode } from "react";

interface ListProps {
  deleteColumnButton: JSX.Element;
  title: string;
  children: ReactNode;
}
const List: React.FC<ListProps> = (props: ListProps) => {
  return (
    <div className="list_item">
      {props.deleteColumnButton}
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

export default List;
