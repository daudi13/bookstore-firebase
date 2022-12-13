import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import React, { useState } from 'react';

const SignUpTab = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    
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
      type="email"
      value={password}
      label="Enter password"
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      />
      <TextField
      variant='outlined'
      label="Confirm Password"
      type="email"
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