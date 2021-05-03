import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import Card from "./Card";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setAppDataAction } from "../redux/actions/inputAction";
import getData, {
  changeTaskColumnIdRequest,
  createColumnRequest,
  deleteColumnRequest,
} from "../api";
import { deleteTaskRequest } from "../api";
import { Button } from "semantic-ui-react";

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
    <div>
      {appData.map((column) => (
        <Button
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

  const addColumnButton = (newColumnTitle) => () => {
    return (
      <div>
        <Button
          onClick={() => createColumnRequest(newColumnTitle).then(getAppData)}
        >
          +Add column
        </Button>
      </div>
    );
  };

  const AddColumnButton = addColumnButton("test col");

  const deleteColumnButton = (columnId) => () => (
    <div>
      <Button
        className="delete_column_btn"
        onClick={() => deleteColumnRequest(columnId).then(getAppData)}
      >
        Delete column
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
                <Card
                  handleActionForLeftButtton={() => {
                    deleteTaskRequest(task.id).then(getAppData);
                  }}
                  buttons={<MoveButton />}
                  key={task.id}
                  task={task.title}
                  textForTheLeftButton="X"
                  textForTheRightButton="Move to"
                />
              );
            })}
            <CustomInput column={column.id} getDataFunction={getAppData} />
          </List>
        );
      })}
      {<AddColumnButton className="delete_column_btn" />}
    </div>
  );
}
