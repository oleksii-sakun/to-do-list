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
  changeTaskColorAction,
} from "../redux/actions/inputAction";
import { Button, Input, SemanticCOLORS } from "semantic-ui-react";
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
  color: SemanticCOLORS;
  id: number;
}

export default function Board(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppDataAction());
  }, [dispatch]);

  const appData = useSelector(({ app }: { app: Column[] }) => app);

  const GetMoveButtonsForTask = (taskId: number, columnId: number) => {
    return (
      <div className="move_buttons">
        {appData
          .filter((column) => {
            if (column.id !== columnId) {
              return true;
            }
          })
          .map((column) => {
            return (
              <Button
                size="mini"
                key={column.id}
                onClick={() =>
                  dispatch(updateTaskColumnIdAction(taskId, column.id))
                }
              >
                {column.title}
              </Button>
            );
          })}
      </div>
    );
  };

  const AddColumnButton = (): JSX.Element => {
    return (
      <div>
        <Input
          size="mini"
          placeholder="new column name"
          onKeyPress={(event: { key: string; target: { value: string } }) => {
            if (event.key === "Enter") {
              dispatch(createColumnAction(event.target.value));
            }
          }}
        ></Input>
      </div>
    );
  };

  const GetDeleteColumnButton = (columnId: number) => {
    return (
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
  };

  const ChangeTaskColor = () => {
    appData.map((column) => {
      column.tasks.map((task) => console.log(task.color));
    });
  };
  ChangeTaskColor();

  return (
    <div className="board">
      {appData.map((column) => {
        return (
          <List
            key={column.id}
            deleteColumnButton={GetDeleteColumnButton(column.id)}
            title={column.title}
          >
            {column.tasks.map((task) => {
              return (
                <CustomCard
                  handleActionForDeleteTaskButtton={() => {
                    dispatch(deleteTaskAction(task.id));
                  }}
                  buttons={GetMoveButtonsForTask(task.id, column.id)}
                  key={task.id}
                  title={task.title}
                  color={task.color}
                  onChangeColor={(color: string) =>
                    dispatch(changeTaskColorAction(task.id, color))
                  }
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
