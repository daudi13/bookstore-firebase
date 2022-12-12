import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

const LoginTab = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {

  }

  const useStyle = makeStyles()(() => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
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
      <Button
        variant="contained"
        type="submit"
        size="large"
        onClick={handleSubmit}
      >
        login
      </Button>
    </Box>
  )
}

export default LoginTab