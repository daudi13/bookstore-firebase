import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, where, query, collection, getDocs } from 'firebase/firestore';
import firebaseEngine from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Bookstore = createContext();

const BookstoreContext = ({ children }) => {

  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  const { db, auth } = firebaseEngine;
  
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "Books"), where("createdBy", "==", doc(db, "User", user.uid)));
      const unsubScribe = onSnapshot(q, (snapShot) => {
        let booksArr = []
        snapShot.docs.forEach((doc) => {
          booksArr.push({...doc.data(), id: doc.id})
        })
        setBooks(booksArr)
    })
      return () => unsubScribe();
    }
    // eslint-disable-next-line
  }, [user])

  console.log(books)
  
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
    })
  })

  
  console.log(user);
  return (
    <Bookstore.Provider value={{
      books,
      alert,
      setAlert,
      user,
    }}>
      {children}
    </Bookstore.Provider>
  )
}

export default BookstoreContext

export const BookstoreState = () => {
  return useContext(Bookstore)
};