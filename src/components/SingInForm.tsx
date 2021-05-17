import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormInput } from "semantic-ui-react";
import { singInRequest } from "../api";
import { setAutorizationStatusAction } from "../redux/actions/autorizationAction";

export default function SingInForm(props: { history: string[] }): JSX.Element {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let userDataFromDataBase;

  async function checkUserData() {
    const promise = await singInRequest(userLogin);
    userDataFromDataBase = promise.data;

    userDataFromDataBase.map((user) => {
      if (userPassword === user.password) {
        dispatch(setAutorizationStatusAction());
        props.history.push("/board");
      } else {
        toast.error("Your login or password is not correct");
      }
    });
  }

  const handleLoginChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserLogin(data.value);
    console.log("event:", event, "data", data.value);
  };

  const handlePasswordChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserPassword(data.value);
    console.log("event:", event, "data", data.value);
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

        <Button type="submit" onClick={checkUserData}>
          Submit
        </Button>
        <Button>
          <Link to="/">Return to SingUpForm</Link>
        </Button>
      </Form>
    </div>
  );
}
