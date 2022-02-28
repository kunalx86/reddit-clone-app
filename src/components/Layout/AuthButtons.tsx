import { Button } from "@chakra-ui/button";
import React from "react";
import { useAuth } from "../../hooks/auth";

export const LoginButton: React.FC = (props) => {
  const { login } = useAuth();
  return (
    <Button
      variant="ghost"
      as="button"
      aria-label="Login"
      onClick={() =>
        login({
          usernameOrEmail: "Tiger_boi",
          password: "TigeR@123boi",
        })
      }
    >
      Login
    </Button>
  );
};

export const RegisterButton: React.FC = (props) => {
  return (
    <Button variant="ghost" as="button" aria-label="Register">
      Register
    </Button>
  );
};

export const LogoutButton: React.FC = (props) => {
  const { logout } = useAuth();
  return (
    <Button
      variant="ghost"
      as="button"
      aria-label="Logout"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
};
