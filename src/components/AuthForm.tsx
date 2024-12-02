import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PageCenter from "./PageCenter";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export type AuthFormField = {
  name: string;
  label: string;
  password: boolean;
};

export type AuthFormSubmission = {
  // this.fields.length == props.fields.length
  fieldValues: { [key: string]: string };
};

export type AuthFormSubmitFn = (
  submission: AuthFormSubmission
) => Promise<void>;

export type AuthLink = {
  label: string;
  navigateTo: string;
};

export type AuthFormProps = {
  formLabel: string;
  fields: AuthFormField[];
  onSubmit: AuthFormSubmitFn;
  submitButtonLabel: string;
  link?: AuthLink;
};

export const AuthForm = (props: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState(
    Object.fromEntries(props.fields.map((field) => [field.name, ""]))
  );

  const onSubmitInner = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    props
      .onSubmit({
        fieldValues,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFieldValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const link = props.link && (
    <Box sx={{ textAlign: "right" }}>
      <Link component={RouterLink} to={props.link.navigateTo}>
        {props.link.label}
      </Link>
    </Box>
  );

  const buttonContent = loading ? (
    <CircularProgress size="30px" color="inherit" />
  ) : (
    props.submitButtonLabel
  );

  return (
    <PageCenter>
      <form onSubmit={onSubmitInner}>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
        >
          <Typography variant="h3" color="primary">
            {props.formLabel}
          </Typography>
        </Box>

        {props.fields.map((field) => (
          <TextField
            key={field.name}
            margin="normal"
            required
            fullWidth
            variant="outlined"
            label={field.label}
            type={field.password ? "password" : "text"}
            name={field.name}
            value={fieldValues[field.name]}
            onChange={handleChange}
          />
        ))}

        <Box
          sx={{ marginBottom: 2, marginTop: 1, display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" color="primary" type="submit">
            {buttonContent}
          </Button>
        </Box>

        {link}
      </form>
    </PageCenter>
  );
};
