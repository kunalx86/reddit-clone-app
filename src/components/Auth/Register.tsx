import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Divider, Flex, Heading } from "@chakra-ui/layout";
import { Button, FormErrorMessage, Input, Spinner } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/auth";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email")
    .required("Email is a necessary field"),
  username: yup
    .string()
    .min(3, "Username should be 3 characters at least")
    .max(15, "Username should not exceed 15 characters")
    .matches(
      /^[a-zA-Z0-9]([_]|[a-zA-Z0-9]){2,15}[a-zA-Z0-9]$/,
      "Username must begin with alphanumberic character, can have _ and must end with alphanumeric character"
    )
    .required("Username is a necessary field"),
  password: yup
    .string()
    .min(8, "Password should be 8 characters at least")
    .max(150, "Password should not exceed 150 characters")
    .matches(
      /^[a-zA-Z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{3,15}$/,
      "Password must begin with an alphanumeric character and should include numeric, lower, upper case characters and one special character"
    )
    .required("Password is a necessary field"),
});

export const RegisterForm = () => {
  const { register, error } = useAuth();
  return (
    <Flex direction="column" p={3} rounded="3xl">
      <Heading mb={2}>Register</Heading>
      <Divider />
      {error && (
        <Flex
          backgroundColor="red.300"
          borderRadius="md"
          justifyContent="center"
          alignContent="center"
          p={2}
        >
          {error}
        </Flex>
      )}
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async ({ username, password, email }, actions) => {
          await register({
            username,
            email,
            password,
          });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <>
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    pt={-2}
                    p={2}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="text">Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="text"
                      id="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    pt={-2}
                    p={2}
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="text">Username</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter username"
                      type="text"
                      id="username"
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    p={2}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="text">Password</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter password"
                      type="password"
                      id="password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex justify="center" direction="row" p={2}>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  {isSubmitting && <Spinner />}Register
                </Button>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </Flex>
  );
};
