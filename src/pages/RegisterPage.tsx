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

      return await auth.register(username, password);
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
      formLabel="Register"
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Register"
      link={{ label: "Have an account? Login", navigateTo: "/login" }}
    />
  );
};

export default RegisterPage;
