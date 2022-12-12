import { makeStyles } from 'tss-react/mui';
import React from 'react'; 


function App() {

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center",
      color: "white"
    }
  }))

  const { classes } = useStyle();

  return (
    <div className={classes.App}>

    </div>
  );
}

export default App;
