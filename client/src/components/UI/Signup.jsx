import React from "react";
import { Modal, TextField, Box, Typography, Button } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Signup = ({ open, handleClose }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setPasswordConfirm("");
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form method="post" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Signup
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, marginBottom: "10px" }}
          >
            Please fill out the text fields
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            error={password !== passwordConfirm && passwordConfirm.length > 0}
            id="passwordConfirm"
            label="Password Confirmation"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            helperText={
              password !== passwordConfirm && passwordConfirm.length > 0
                ? "Passwords do not match"
                : ""
            }
          />
          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "5px" }}
              disabled={
                !(
                  password === passwordConfirm &&
                  password.length > 0 &&
                  email.length > 0
                )
              }
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default Signup;
