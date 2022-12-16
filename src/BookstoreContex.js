import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
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
    const booksCollectionRef = doc(db, "books", user.uid);
      const unsubScribe = onSnapshot(booksCollectionRef, book => {
        if (book.exists()) {
        setBooks(book.data().books)
      }
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