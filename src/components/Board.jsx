import React from "react";
import CustomInput from "./CustomInput";
import List from "./List";
import Card from "./Card";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setAppDataAction } from "../redux/actions/inputAction";
import getData, { changeTaskColumnIdRequest } from "../api";
import { deleteTaskRequest } from "../api";

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
        <button
          key={column.id}
          onClick={() =>
            changeTaskColumnIdRequest(taskId, column.id).then(getAppData)
          }
        >
          {column.title}
        </button>
      ))}
    </div>
  );

  return (
    <div className="board">
      {appData.map((column) => (
        <List key={column.id} className="column" title={column.title}>
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
      ))}
    </div>
  );
}
