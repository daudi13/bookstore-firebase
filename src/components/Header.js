import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import BookstoreContext from '../BookstoreContex';

export default function Header() {

  const { user } = BookstoreContext;
  const useStyle = makeStyles()(() => ({
    Appbar: {
      display: "flex",
      alignItems: "center",
      width: "100%"
    }
  }))

  const { classes } = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.Appbar}>
            BookStoreCMS
          </Typography>
          {user && <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}