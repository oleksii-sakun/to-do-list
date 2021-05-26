import React, { useEffect, useState } from "react";
import List from "./List";
import CustomCard from "./CustomCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createColumnAction,
  deleteColumnAction,
  getAppDataAction,
  changeTaskColorAction,
  deleteTaskAction,
} from "../redux/actions/inputAction";
import { Button, Icon, Input, Loader, SemanticCOLORS } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Props } from "./SingUpForm";
import ModalComponent from "./DeleteModal";
import {
  resetTaskToDeleteAction,
  setTaskToDeleteAction,
} from "../redux/actions/deletionAction";
import EditTaskModal from "./EditTaskModal";
import { resetTaskToEditAction } from "../redux/actions/editTaskActions";
import CreateTaskModal from "./CreateTaskModal";

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
  date: string;
  id: number;
}

export default function Board(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [createModalStatus, setCreateModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addColumnInputStatus, setAddColumnInputStatus] = useState(false);

  useEffect(() => {
    dispatch(getAppDataAction());
    setTimeout(() => setLoading(false), 50);
  }, [dispatch]);

  const appData = useSelector(({ app }: { app: Column[] }) => app);
  const taskToEdit = useSelector((store: any) => store.taskToEdit);

  const AddColumnButton = (): JSX.Element => {
    return (
      <div>
        {addColumnInputStatus ? (
          <Input
            size="mini"
            placeholder="new column name"
            onKeyPress={(event: { key: string; target: { value: string } }) => {
              if (event.key === "Enter") {
                dispatch(createColumnAction(event.target.value));
                setAddColumnInputStatus(false);
              }
            }}
          ></Input>
        ) : (
          <Button
            className="add-column-btn"
            size="small"
            onClick={() => setAddColumnInputStatus(true)}
          >
            +Add new column
          </Button>
        )}
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

  const userLoginFromLocalStorage = localStorage.getItem("login");

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    props.history.push("/singIn");
  };

  const handleCloseModal = () => {
    dispatch(resetTaskToDeleteAction());
  };

  const handleConfirmModal = (taskId: number) => {
    dispatch(deleteTaskAction(taskId));
  };

  const handleCloseEditTaskModal = () => {
    dispatch(resetTaskToEditAction());
  };

  const handleCreateTaskModal = () => {
    setCreateModalStatus(true);
  };

  const handleCloseCreateTaskModal = () => {
    setCreateModalStatus(false);
  };

  return (
    <>
      <header className="board-header">
        <h1>My Todo App</h1>
        <div>
          <CreateTaskModal
            columns={appData}
            isOpen={createModalStatus}
            onClose={handleCloseCreateTaskModal}
          />
        </div>
        <div>
          {!!taskToEdit && (
            <EditTaskModal
              onClose={handleCloseEditTaskModal}
              taskToEdit={taskToEdit}
              columns={appData}
            />
          )}
        </div>

        <ModalComponent
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
        <div>
          <span className="logout">Hello,{userLoginFromLocalStorage}!</span>
          <Button size="mini" className="singout-btn" onClick={handleLogout}>
            <Icon name="sign out alternate"></Icon>
          </Button>
        </div>
      </header>
      <div className="board-scrollable">
        <div className="board">
          <Loader active={loading} size="big" />

          {appData.map((column) => {
            return (
              <div key={column.id}>
                <List
                  deleteColumnButton={GetDeleteColumnButton(column.id)}
                  title={column.title}
                  id={column.id}
                >
                  {column.tasks.map((task) => {
                    return (
                      <div key={task.id}>
                        <CustomCard
                          handleActionForDeleteTaskButtton={() => {
                            dispatch(setTaskToDeleteAction(task));
                          }}
                          task={task}
                          title={task.title}
                          date={task.date}
                          id={task.id}
                          color={task.color}
                          onChangeColor={(color: string) =>
                            dispatch(changeTaskColorAction(task.id, color))
                          }
                        />
                      </div>
                    );
                  })}
                  <Button
                    className="create-task-btn"
                    onClick={handleCreateTaskModal}
                  >
                    Create task
                  </Button>
                </List>
              </div>
            );
          })}
          {<AddColumnButton />}
        </div>
      </div>
    </>
  );
}
