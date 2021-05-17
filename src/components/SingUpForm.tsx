import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormInput } from "semantic-ui-react";
import { singUpRequest } from "../api";

interface Props {
  history: {
    push(url: string): void;
  };
}

export default function SingUpForm(props: Props): JSX.Element {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRepeatPassword, setUserRepeatPassword] = useState("");

  const isInvalid =
    userPassword !== userRepeatPassword ||
    userLogin === "" ||
    userPassword === "" ||
    userRepeatPassword === "";

  function createUser() {
    if (isInvalid) {
      toast.error("Please check your data");
    } else {
      singUpRequest(userLogin, userPassword);
      props.history.push("/singIn");
    }
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
  const handleRepeatPasswordChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setUserRepeatPassword(data.value);
    console.log("event:", event, "data", data.value);
  };

  return (
    <div className="form_wrapper">
      <Form>
        <label>SingUp Form</label>
        <Form.Field>
          <label>Login</label>
          <FormInput placeholder="login" onChange={handleLoginChange} />
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

        <Button disabled={false} type="submit" onClick={createUser}>
          Submit
        </Button>
        <Button>
          <Link to="/singIn">Already registered</Link>
        </Button>
      </Form>
    </div>
  );
}
