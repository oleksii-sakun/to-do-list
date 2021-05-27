import { ToastContainer } from "react-toastify";
import Board from "./components/Board";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import SingInForm from "./components/SingInForm";
import SingUpForm, { Props } from "./components/SingUpForm";
import { Loader } from "semantic-ui-react";
import { singInAction } from "./redux/actions/autorizationAction";
import { useDispatch, useSelector } from "react-redux";

function App(props: Props): JSX.Element {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const isSinged = useSelector(
    ({ authorization }: { authorization: boolean }) => authorization
  );

  useEffect(() => {
    if (isSinged) {
      props.history.push("/board");
    } else {
      props.history.push("/singIn");
    }
  }, [isSinged]);

  useEffect(() => {
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");

    if (login && password) {
      dispatch(singInAction(login, password, setLoader));
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
          isSinged={isSinged}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
