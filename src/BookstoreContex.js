import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase'

const Bookstore = createContext();

const BookstoreContext = ({ children }) => {

  const [books, setBooks] = useState([])


  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getBooks();
    // eslint-disable-next-line
  }, [books])
  

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