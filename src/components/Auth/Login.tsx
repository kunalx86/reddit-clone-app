import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Divider, Flex, Heading } from "@chakra-ui/layout";
import { Button, FormErrorMessage, Input, Spinner } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/auth";

const loginSchema = yup.object({
  usernameOrEmail: yup.string().when("isEmail", {
    is: 1,
    then: yup
      .string()
      .email("Please enter a valid email")
      .required("Username or Email is a necessary field"),
    otherwise: yup
      .string()
      .min(3, "Username should be 3 characters at least")
      .max(15, "Username should not exceed 15 characters")
      .matches(
        /^[a-zA-Z0-9]([_]|[a-zA-Z0-9]){2,15}[a-zA-Z0-9]$/,
        "Username must begin with alphanumberic character, can have _ and must end with alphanumeric character"
      )
      .required("Username or Email is a necessary field"),
  }),
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

export const LoginForm = () => {
  const { login, error } = useAuth();
  return (
    <Flex direction="column" p={3} rounded="3xl">
      <Heading mb={2}>Login</Heading>
      <Divider />
      <Flex
        backgroundColor="red.300"
        borderRadius="md"
        justifyContent="center"
        alignContent="center"
        p={2}
      >
        {error}
      </Flex>
      <Formik
        initialValues={{
          isEmail: 0,
          usernameOrEmail: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={({ usernameOrEmail, password }, actions) => {
          login({
            usernameOrEmail,
            password,
          });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, handleChange, values }) => (
          <>
            <Input
              height={0}
              width={0}
              readOnly={true}
              visibility="hidden"
              value={values.isEmail}
            />
            <Form>
              <Field name="usernameOrEmail">
                {({ field, form }) => (
                  <FormControl
                    pt={-2}
                    p={2}
                    isInvalid={
                      form.errors.usernameOrEmail &&
                      form.touched.usernameOrEmail
                    }
                  >
                    <FormLabel htmlFor="text">Username or Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter username or email"
                      type="text"
                      id="usernameOrEmail"
                      onChange={(e) => {
                        handleChange("usernameOrEmail")(e);
                        if (e.target.value.includes("@"))
                          handleChange("isEmail")("1");
                        else handleChange("isEmail")("0");
                      }}
                    />
                    <FormErrorMessage>
                      {form.errors.usernameOrEmail}
                    </FormErrorMessage>
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
                  {isSubmitting && <Spinner />}Login
                </Button>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </Flex>
  );
};
