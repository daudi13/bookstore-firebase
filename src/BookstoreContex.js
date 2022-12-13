import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import firebaseEngine from './firebase';

const Bookstore = createContext();

const BookstoreContext = ({ children }) => {

  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const { db } = firebaseEngine;


  const booksCollectionRef = collection(db, "books");
  
  useEffect(() => {
    const booksCollectionRef = collection(db, "books");
    const unsubScribe = onSnapshot(booksCollectionRef, (querySnapshot) => {
      let bookArr = []
      querySnapshot.forEach((doc) => {
        bookArr.push({ ...doc.data(), id: doc.id })
      });
      setBooks(bookArr)
    })

    return () => unsubScribe();
    // eslint-disable-next-line
  }, [])
  

  return (
    <Bookstore.Provider value={{
      books,
      booksCollectionRef
    }}>
      {children}
    </Bookstore.Provider>
  )
}

export default BookstoreContext

export const BookstoreState = () => {
  return useContext(Bookstore)
};