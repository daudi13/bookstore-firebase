import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from './firebase'

const Bookstore = createContext();

const BookstoreContext = ({ children }) => {

  const [books, setBooks] = useState([])


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

    return () => unsubScribe()
  }, [])

  console.log(books)
  

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