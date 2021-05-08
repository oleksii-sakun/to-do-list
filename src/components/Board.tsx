import React, { useEffect } from "react";
import CreateTaskInput from "./CreateTaskInput";
import List from "./List";
import CustomCard from "./CustomCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createColumnAction,
  createTaskAction,
  deleteColumnAction,
  deleteTaskAction,
  getAppDataAction,
  updateTaskColumnIdAction,
} from "../redux/actions/inputAction";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  columnId: number;
  id: number;
}

export default function Board() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppDataAction());
  }, [dispatch]);

  const appData = useSelector(({ app }: { app: Column[] }) => app);

  const getMoveButtonsForTask = (taskId: number) => () => (
    <div className="move_buttons">
      {appData.map((column) => (
        <Button
          size="mini"
          key={column.id}
          onClick={() => dispatch(updateTaskColumnIdAction(taskId, column.id))}
        >
          {column.title}
        </Button>
      ))}
    </div>
  );

  const AddColumnButton = (): JSX.Element => {
    return (
      <div>
        <Input
          size="mini"
          placeholder="new column name"
          onKeyPress={(event: any) => {
            if (event.key === "Enter") {
              dispatch(createColumnAction(event.target.value));
            }
          }}
        ></Input>
      </div>
    );
  };

  const getDeleteColumnButton = (columnId: number) => () => (
    <div>
      <Button
        size="mini"
        negative
        className="delete_column_btn"
        onClick={() => dispatch(deleteColumnAction(columnId))}
      >
        X
      </Button>
    </div>
  );

  return (
    <div className="board">
      {appData.map((column) => {
        const DeleteColumnButton = getDeleteColumnButton(column.id);
        return (
          <List
            key={column.id}
            deleteColumnButton={<DeleteColumnButton />}
            title={column.title}
          >
            {column.tasks.map((task) => {
              const MoveButton = getMoveButtonsForTask(task.id);
              return (
                <CustomCard
                  handleActionForDeleteTaskButtton={() => {
                    dispatch(deleteTaskAction(task.id));
                  }}
                  buttons={<MoveButton />}
                  key={task.id}
                  title={task.title}
                />
              );
            })}
            <CreateTaskInput
              onAddTask={(title: string) =>
                dispatch(createTaskAction(title, column.id))
              }
            />
          </List>
        );
      })}
      {<AddColumnButton />}
    </div>
  );
}
