import React, { useState } from 'react';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import db from '../firebase';
import { makeStyles } from 'tss-react/mui';


const HomePage = () => {

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center"
    }
  }))


  const { books, booksCollectionRef } = BookstoreState();
  const [title, setTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);

  const IncreaseChapters = async (id, chapter, totalChapters) => {
    const booksDoc = doc(db, "books", id);
    const newFields = { currentChapter: +(chapter) < totalChapters ? +(chapter) + 1 : totalChapters};
    await updateDoc(booksDoc, newFields);
  }

  const decreaseChapters = async (id, chapter) => {
    const booksDoc = doc(db, "books", id);
    const newFields = { currentChapter: +(chapter) > 0 ? +(chapter) - 1 : 0 };
    await updateDoc(booksDoc, newFields);
  }

  const addNewBook = async () => {
    await addDoc(booksCollectionRef, { bookName: title, author: bookAuthor, genre: genre, currentChapter: currentChapter, TotalChapters: totalChapters })
    setGenre("");
    setTitle("");
    setTotalChapters("");
    setBookAuthor("")
    setCurrentChapter("")
  }

  const { classes } = useStyle();

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
            <div key={book.id}>
              <h3>Book name: {book.bookName}</h3>
              <h3>Author: {book.author}</h3>
              <h3>Total chapters: {book.TotalChapters}</h3>
              <h3>Total chapters: {book.currentChapter}</h3>
              <h3>Percentage: {((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%</h3>
              <div>
              <button onClick={() => IncreaseChapters(book.id, book.currentChapter, book.TotalChapters)}>+chapters</button>
              <button onClick={() => decreaseChapters(book.id, book.currentChapter)}>-chapters</button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default HomePage