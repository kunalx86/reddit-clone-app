import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { LoginForm } from "../Auth/Login";
import { RegisterForm } from "../Auth/Register";

export const LoginButton: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" as="button" aria-label="Login" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <LoginForm />
        </ModalContent>
      </Modal>
    </>
  );
};

export const RegisterButton: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="ghost"
        onClick={onOpen}
        as="button"
        aria-label="Register"
      >
        Register
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <RegisterForm />
        </ModalContent>
      </Modal>
    </>
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
