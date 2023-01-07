import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import React, { useEffect } from 'react'; 
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import AlertBox from './components/Alert';
import HomePage from './pages/HomePage';
import { BookstoreState } from './BookstoreContex';
function App() {
  
  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center",
    }
  }))


  const { classes } = useStyle();
  const { setUser } = BookstoreState();

  useEffect(() => {
    setUser(null)
  }, [])

  return (
    <BrowserRouter>      
      <div className={classes.App}>
        <Header />
        <AlertBox/>
        <div>
          <Routes>
            <Route path='/' element={<LoginPage />} exact />
            <Route path='/homepage' element={<HomePage/>} exact/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
