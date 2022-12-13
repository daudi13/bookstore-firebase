import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseEngine from '../firebase';

const SignUpTab = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = firebaseEngine;

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("passwords do not match")
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user
        console.log(user)
      })
      .catch((error) => {
      console.log(error)
    })
  } 

  const useStyle = makeStyles()(() => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center"
    }
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
      fullWidth
      />
      <TextField
      variant='outlined'
      type="password"
      value={password}
      label="Enter password"
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      />
      <TextField
      variant='outlined'
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
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