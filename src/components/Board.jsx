import React from "react";
import CreateTaskInput from "./CreateTaskInput";
import List from "./List";
import CustomCard from "./CustomCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { createColumnAction, createTaskAction, deleteColumnAction, deleteTaskAction, getAppDataAction, updateTaskColumnIdAction } from "../redux/actions/inputAction";

export default function Board() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(getAppDataAction()), [dispatch]);

  const appData = useSelector(({ app }) => app);

  const getMoveButtonsForTask = (taskId) => () => (
    <div className="move_buttons">
      {appData.map((column) => (
        <Button
          size="mini"
          key={column.id}
          onClick={() =>
            dispatch(updateTaskColumnIdAction(taskId, column.id))
          }
        >
          {column.title}
        </Button>
      ))}
    </div>
  );

  const AddColumnButton = () => {
    return (
      <div>
        <Input
          size="mini"
          placeholder="new column name"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              dispatch(createColumnAction(event.target.value));
            }
          }}
        ></Input>
      </div>
    );
  };

  const getDeleteColumnButton = (columnId) => () => (
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
            className="column"
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
                  task={task.title}
                />
              );
            })}
            <CreateTaskInput column={column.id} onAddTask={(title) => dispatch(createTaskAction(title, column.id))} />
          </List>
        );
      })}
      {<AddColumnButton />}
    </div>
  );
}
