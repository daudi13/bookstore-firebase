import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';
import { Box, Container } from '@mui/material';
import { borderRadius } from '@mui/system';


const HomePage = () => {

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center"
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1.5px solid black",
      padding: "20px",
      borderRadius: "10px",
      width: "1000px",
      margin: "20px auto",
    },
    box: {
      textAlign: "start",
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

  const IncreaseChapters = async (id, chapter, totalChapters) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) < totalChapters ? +(chapter) + 1 : totalChapters };
    await updateDoc(booksDoc, newFields);
  }

  const decreaseChapters = async (id, chapter) => {
    const booksDoc = doc(db, "Books", id);
    const newFields = { currentChapter: +(chapter) > 0 ? +(chapter) - 1 : 0 };
    await updateDoc(booksDoc, newFields);
  }

  
  const addNewBook = async () => {
    await addDoc(booksCollectionRef, { bookName: title, author: bookAuthor, genre: genre, currentChapter: currentChapter, TotalChapters: totalChapters, createdAt: serverTimestamp(), createdBy: doc(db, "User", userId)})
    setGenre("");
    setTitle("");
    setTotalChapters("");
    setBookAuthor("")
    setCurrentChapter("")
  }

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "Books", id))
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
            <Container key={book.id} className={classes.wrapper}>
              <Box className={classes.box}>
              <h4>{book.genre}</h4>
              <h3>{book.bookName}</h3>
              <h3>{book.author}</h3>
              <button onClick={() => deleteBook(book.id)}>Delete Book</button>
              </Box>
              <Box className={classes.box}>
              <h3>Percentage: {((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%</h3>
              </Box>
              <Box className={classes.box}>
              <h3>Current Chapter</h3>
              <h3>chapter{book.currentChapter}</h3>
              <div>
              <button onClick={() => IncreaseChapters(book.id, book.currentChapter, book.TotalChapters)}>+chapters</button>
              <button onClick={() => decreaseChapters(book.id, book.currentChapter)}>-chapters</button>
              </div>
              </Box>
            </Container>
            
          )
        })
      }
    </div>
  );
}

export default HomePage