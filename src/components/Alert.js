import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react'
import BookstoreContext from '../BookstoreContex';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertBox = () => {
  const { alert, setAlert } = BookstoreContext();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({
      open: false,
      message: "",
      type: ""
    })
  }
  return (
    <Snackbar open autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%', margin: "0 auto" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertBox;