import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  const toast = useToast();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          //check for errors and use toErrorMap util
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
            //give a toast on failure of account setup
            toast({
              title: "Registration failed.",
              description: "We could not create your account for you.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else if (response.data?.register.user) {
            router.push("/");
            //give a toast on completion of account setup
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              variant="solid"
              colorScheme="orange"
              type="submit"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
