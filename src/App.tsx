import { RootStateOrAny, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Board from "./components/Board";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import SingInForm from "./components/SingInForm";
import SingUpForm from "./components/SingUpForm";

function App(): JSX.Element {
  const autorizationStatus = useSelector(
    (store: RootStateOrAny) => store.autorization
  );
  console.log(autorizationStatus);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Switch>
          <Route exact path="/" component={SingUpForm} />
          <Route exact path="/singIn" component={SingInForm} />
          <PrivateRoute
            exact
            path="/board"
            component={Board}
            isSinged={autorizationStatus}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
