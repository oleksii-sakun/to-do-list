import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormInput } from "semantic-ui-react";
import { singInAction } from "../redux/actions/autorizationAction";
import { Props } from "./SingUpForm";

export interface SelectData {
  value?: any;
}

export default function SingInForm(props: Props): JSX.Element {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();

  const isSinged = useSelector(
    ({ authorization }: { authorization: boolean }) => authorization
  );

  useEffect(() => {
    if (isSinged) {
      props.history.push("/board");
      console.log("redir");
    }
  }, [isSinged]);

  async function checkUserPassword() {
    dispatch(singInAction(userLogin, userPassword));
    console.log("test");
  }

  const handleLoginChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: SelectData
  ) => {
    setUserLogin(data.value);
  };

  const handlePasswordChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: SelectData
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
