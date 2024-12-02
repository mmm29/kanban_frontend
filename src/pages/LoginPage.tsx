import { Navigate } from "react-router-dom";
import { useAuth } from "../api/AuthProvider";
import {
  AuthForm,
  AuthFormField,
  AuthFormSubmission,
} from "../components/AuthForm";
import { useCallback } from "react";

const RegisterPage = () => {
  const { user, auth } = useAuth();

  const onSubmit = useCallback(
    async (submission: AuthFormSubmission) => {
      const username = submission.fieldValues["username"];
      const password = submission.fieldValues["password"];

      return await auth.login(username, password);
    },
    [auth]
  );

  if (user != null) {
    return <Navigate to="/"></Navigate>;
  }

  const fields: AuthFormField[] = [
    {
      name: "username",
      label: "Username",
      password: false,
    },
    {
      name: "password",
      label: "Password",
      password: true,
    },
  ];

  return (
    <AuthForm
      formLabel="Login"
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Sign in"
      link={{ label: "No account? Register", navigateTo: "/register" }}
    />
  );
};

export default RegisterPage;
