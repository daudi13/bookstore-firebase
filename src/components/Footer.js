import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { makeStyles } from 'tss-react/mui'

const Footer = () => {

  const date = new Date();

  const useStyle = makeStyles()((theme) => ({
    footer: {
      padding: "10px", 
      background: "grey",
    }
  }));

  const { classes } = useStyle();
  return (
    <Box className={classes.footer}>
      <Typography variant='caption' gutterBottom >
        &#169; <Link href="">David Ouma</Link> | {date.getFullYear()} 
      </Typography>
    </Box>
  )
}

export default Footer