import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Form, FormInput } from "semantic-ui-react";
import { singInRequest } from "../api";
import { setAutorizationStatusAction } from "../redux/actions/autorizationAction";
import { Props } from "./SingUpForm";

export default function SingInForm(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function checkUserPassword() {
    const userData = await singInRequest(userLogin, userPassword);

    if (userData.data.length) {
      dispatch(setAutorizationStatusAction());
      localStorage.setItem("login", userLogin);
      localStorage.setItem("password", userPassword);
      props.history.push("/board");
    } else {
      toast.error("Your login or password is not correct");
    }
  }

  const handleLoginChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserLogin(data.value);
  };

  const handlePasswordChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserPassword(data.value);
  };

  const handleReturnToSingUp = () => {
    props.history.push("/");
  };

  return (
    <div className="form_wrapper">
      <Form>
        <label>SingIn, please</label>
        <Form.Field>
          <label>Login</label>
          <FormInput placeholder="login" onChange={handleLoginChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <FormInput placeholder="password" onChange={handlePasswordChange} />
        </Form.Field>

        <Button type="submit" onClick={checkUserPassword}>
          Submit
        </Button>
        <Button onClick={handleReturnToSingUp}>Return to SingUpForm</Button>
      </Form>
    </div>
  );
}
