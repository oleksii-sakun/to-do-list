import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Board from "./components/Board";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import SingInForm from "./components/SingInForm";
import SingUpForm, { Props } from "./components/SingUpForm";
import { singInRequest } from "./api";
import { setAutorizationStatusAction } from "./redux/actions/autorizationAction";
import { Loader } from "semantic-ui-react";

function App(props: Props): JSX.Element {
  const [loader, setLoader] = useState(false);

  const autorizationStatus = useSelector(
    (store: RootStateOrAny) => store.autorization
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");
    async function checkUserPassword(userLogin: string, userPassword: string) {
      setLoader(true);
      const userData = await singInRequest(userLogin, userPassword);
      setLoader(false);

      if (userData.data.length) {
        dispatch(setAutorizationStatusAction());
        props.history.push("/board");
      } else {
        toast.error("Your login or password is not correct");
      }
    }
    if (login && password) {
      checkUserPassword(login, password);
    }
  }, []);

  if (loader) {
    return <Loader active size="big" />;
  }

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Switch>
        <Route exact path="/singIn" component={SingInForm} />
        <Route exact path="/" component={SingUpForm} />
        <PrivateRoute
          exact
          path="/board"
          component={Board}
          isSinged={autorizationStatus}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
