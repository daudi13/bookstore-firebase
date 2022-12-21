import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';


const HomePage = () => {

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center"
    }
  }))


  const { books, user } = BookstoreState();
  const [title, setTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);
  const { db } = firebaseEngine;

  const userId = user.uid;
  
  const booksCollectionRef = collection(db, "Books");
  // const IncreaseChapters = async (id, chapter, totalChapters) => {
  //   const booksDoc = doc(d);
  //   console.log(booksDoc,`hey`)
  //   const newFields = { currentChapter: +(chapter) < totalChapters ? +(chapter) + 1 : totalChapters };
  //   await updateDoc(booksDoc, newFields);
  // }

  // const decreaseChapters = async (id, chapter) => {
  //   const booksDoc = doc(db, "books", id);
  //   const newFields = { currentChapter: +(chapter) > 0 ? +(chapter) - 1 : 0 };
  //   await updateDoc(booksDoc, newFields);
  // }

  
  const addNewBook = async () => {
    await addDoc(booksCollectionRef, { bookName: title, author: bookAuthor, genre: genre, currentChapter: currentChapter, TotalChapters: totalChapters, createdAt: serverTimestamp(), createdBy: doc(db, "User", userId)})
    setGenre("");
    setTitle("");
    setTotalChapters("");
    setBookAuthor("")
    setCurrentChapter("")
  }

  const { classes } = useStyle();
  console.log(books)

  return (
    <div className={classes.App}>
      <input
      placeholder="Add book title"
      value={title}
      onChange={(e) =>{ setTitle( e.target.value)} }
      />
      <input
      placeholder="Add book author"
      value={bookAuthor}
      onChange={(e) => { setBookAuthor(e.target.value)}}
      />
      <input
      placeholder="Add book genres"
      value={genre}
      onChange={(e) => { setGenre(e.target.value)}}
      />
      <input
      placeholder="Add total chapters"
      type="number"
      value={totalChapters}
      onChange={(e) => {setTotalChapters(e.target.value)}}
      />
      <input
      placeholder="Add current"
      type="number"
      value={currentChapter}
      onChange={(e) => { setCurrentChapter(e.target.value)} }
      />
      <button onClick={addNewBook}>Add book</button>
      {
        books.map((book) => {
          return (
            <div key={book.bookId}>
              <h3>Book name: {book.bookName}</h3>
              <h3>Author: {book.author}</h3>
              <h3>Total chapters: {book.TotalChapters}</h3>
              <h3>Current chapter: {book.currentChapter}</h3>
              <h3>Percentage: {((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%</h3>
              <div>Engage
              {/* <button onClick={() => IncreaseChapters(book.bookId, book.currentChapter, book.TotalChapters)}>+chapters</button>
              <button onClick={() => decreaseChapters(book.bookId, book.currentChapter)}>-chapters</button> */}
              </div>
            </div>
            
          )
        })
      }
    </div>
  );
}

export default HomePage