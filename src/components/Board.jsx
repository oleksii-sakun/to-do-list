import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import CustomCard from "./CustomCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setAppDataAction } from "../redux/actions/inputAction";
import getData, {
  changeTaskColumnIdRequest,
  createColumnRequest,
  deleteColumnRequest,
} from "../api";
import { deleteTaskRequest } from "../api";
import { Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function Board(props) {
  const dispatch = useDispatch();

  const getAppData = () => {
    getData().then((data) => {
      dispatch(setAppDataAction(data));
    });
  };

  React.useEffect(getAppData, []);

  const appData = useSelector(({ app }) => app);

  const getMoveButtonsForTask = (taskId) => () => (
    <div className="move_buttons">
      {appData.map((column) => (
        <Button
          size="mini"
          key={column.id}
          onClick={() =>
            changeTaskColumnIdRequest(taskId, column.id).then(getAppData)
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
              createColumnRequest(event.target.value).then(getAppData);
            }
          }}
        ></Input>
      </div>
    );
  };

  const deleteColumnButton = (columnId) => () => (
    <div>
      <Button
        size="mini"
        negative
        className="delete_column_btn"
        onClick={() => deleteColumnRequest(columnId).then(getAppData)}
      >
        X
      </Button>
    </div>
  );

  return (
    <div className="board">
      {appData.map((column) => {
        const DeleteColumnButton = deleteColumnButton(column.id);
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
                    deleteTaskRequest(task.id).then(getAppData);
                  }}
                  buttons={<MoveButton />}
                  key={task.id}
                  task={task.title}
                />
              );
            })}
            <CustomInput column={column.id} getDataFunction={getAppData} />
          </List>
        );
      })}
      {<AddColumnButton />}
    </div>
  );
}
