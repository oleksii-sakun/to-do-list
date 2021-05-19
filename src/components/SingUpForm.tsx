import { debounce } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormInput } from "semantic-ui-react";
import { singInRequest } from "../api";
import { singUpAction } from "../redux/actions/autorizationAction";

export interface Props {
  history: {
    push(url: string): void;
  };
}

export default function SingUpForm(props: Props): JSX.Element {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRepeatPassword, setUserRepeatPassword] = useState("");
  const [disabled, setSumbmitButton] = useState(false);
  const [inputColor, setInputColor] = useState("");
  const dispatch = useDispatch();

  const isPasswordsMatched = userPassword === userRepeatPassword;
  const isValid =
    isPasswordsMatched && userLogin && userPassword && userRepeatPassword;

  function createUser() {
    if (!isValid) {
      toast.error("Please check your data");
    } else {
      dispatch(singUpAction(userLogin, userPassword));
      props.history.push("/singIn");
    }
  }

  const debounceHandleLoginChange = debounce(handleLoginChange, 400);

  async function handleLoginChange(
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) {
    const userData = await singInRequest(data.value);
    const userDataFromDataBase = userData.data;
    let userLoginFromDataBase;
    // const isLoginInvalid = userData.data.some(
    //   (user) => userLoginFromDataBase === user.login
    // );

    userDataFromDataBase.forEach(
      (user) => (userLoginFromDataBase = user.login)
    );
    if (userLoginFromDataBase) {
      // toast.error("This login is already used by another user");
      setInputColor("1px solid red");
      setSumbmitButton(true);
      setUserLogin(data.value);
    } else {
      setInputColor("");
      setUserLogin(data.value);
      setSumbmitButton(false);
    }
  }

  const handlePasswordChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserPassword(data.value);
  };
  const handleRepeatPasswordChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserRepeatPassword(data.value);
  };

  return (
    <div className="form_wrapper">
      <Form>
        <label>SingUp Form</label>
        <Form.Field>
          <label>Login</label>
          <FormInput
            placeholder="login"
            onChange={debounceHandleLoginChange}
            style={{ borderRadius: ".28571429rem", border: inputColor }}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <FormInput placeholder="password" onChange={handlePasswordChange} />
        </Form.Field>
        <Form.Field>
          <label>Repeat password</label>
          <FormInput
            placeholder="repeat password"
            onChange={handleRepeatPasswordChange}
          />
        </Form.Field>

        <Button disabled={disabled} type="submit" onClick={createUser}>
          Submit
        </Button>
        <Button>
          <Link to="/singIn">Already registered</Link>
        </Button>
      </Form>
    </div>
  );
}
