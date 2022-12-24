import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseEngine from '../firebase';
import { BookstoreState } from '../BookstoreContex';
import { useNavigate } from 'react-router';

const SignUpTab = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = BookstoreState();
  const navigate = useNavigate();

  const { auth } = firebaseEngine;

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Your passwords do not match",
        type: "error"
      })
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user
        setAlert({
        open: true,
        message: `You've successfully created an account with ${user.email}`,
        type: "success"
        })
        navigate("/homepage");
      })
      .catch((error) => {
      setAlert({
        open: true,
        message: `${error.message}`,
        type: "error"
      })
    })
  } 

  const useStyle = makeStyles()((theme) => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
      minWidth: "450px"
    },
    input: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "300px"
      },
    },
  }))

  const { classes } = useStyle();

  return (
    <Box p={3} className={classes.wrapper}>
      <TextField
      variant='outlined'
      type="email"
      label="Enter email"
      value={email}
        onChange={(e) => setEmail(e.target.value)}
      className={classes.input}
      />
      <TextField
      variant='outlined'
      type="password"
      value={password}
      label="Enter password"
      onChange={(e) => setPassword(e.target.value)}
      className={classes.input}
      fullWidth
      />
      <TextField
      variant='outlined'
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className={classes.input}
      fullWidth
      />
      <Button
        variant='contained'
        type="submit"
        size="large"
        onClick={handleSubmit
        }
      >
        Sign up
      </Button>
    </Box>
  )
}

export default SignUpTab