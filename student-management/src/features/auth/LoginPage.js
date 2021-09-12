import "./LoginPage.css";

import { Box, Button } from "@material-ui/core";

import React from "react";
import { login } from "./authSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      login({
        username: "",
        password: "",
      })
    );
  };
  return (
    <div className="login-page">
      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Fake Login
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
