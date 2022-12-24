import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';


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
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.23)",
    },
    box: {
      textAlign: "start",
    },
    boxOne: {
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      width: "150px"
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
              <Box className={classes.boxOne}>
              <Typography variant='caption'>{book.genre}</Typography>
              <Typography variant='body2'>{book.bookName}</Typography>
              <Typography variant='caption'>{book.author}</Typography>
              <Button variant='outlined' onClick={() => deleteBook(book.id)}>Delete Book</Button>
              </Box>
              <Box className={classes.box}>
              <Typography variant='body1'>{((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%</Typography>
              </Box>
              <Box className={classes.box}>
              <Typography variant='caption'>Current Chapter</Typography>
              <Typography variant='body1'>Chapter{book.currentChapter}</Typography>
              <ButtonGroup
              disableElevation
              variant='contained'
              aria-label="Disabled elevation buttons"
              >
              <Button onClick={() => IncreaseChapters(book.id, book.currentChapter, book.TotalChapters)}>+</Button>
              <Button onClick={() => decreaseChapters(book.id, book.currentChapter)}>-</Button>
              </ButtonGroup>
              </Box>
            </Container>
            
          )
        })
      }
    </div>
  );
}

export default HomePage