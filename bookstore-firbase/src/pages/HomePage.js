import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { BookstoreState } from '../BookstoreContex';
import { makeStyles } from 'tss-react/mui';
import firebaseEngine from '../firebase';
import { Box, Button, ButtonGroup, Container, Modal, Typography } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const HomePage = () => {

  const [open, setOpen] = useState(false);

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center"
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "10px",
      width: "1150px",
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
      width: "180px"
    },
    genre: {
      fontFamily: "Montserrat",
      color: "#3D3D3D",
      fontWeight: "bold",
      fontSize: "15px"
    },
    title: {
      fontFamily: "Montserrat",
      fontWeight: "bolder",
      color: "#1aa7ec",
      fontSize: "18px",
    },
    author: {
      fontFamily: "Montserrat",
      fontSize: "16px",
    },
    chapterTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bolder",
      fontSize: "18px",
    },
    chapter: {

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container className={classes.App}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
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
        </Box>
      </Modal>
      {
        books.map((book) => {
          return (
            <Container key={book.id} className={classes.wrapper}>
              <Box className={classes.boxOne}>
              <Typography variant='caption' className={classes.genre}>{book.genre}</Typography>
              <Typography variant='body2' className={classes.title}>{book.bookName}</Typography>
              <Typography variant='caption' className={classes.author}>{book.author}</Typography>
              <Button variant='outlined' onClick={() => deleteBook(book.id)}>Delete Book</Button>
              </Box>
              <Box className={classes.box}>
                <Box style={{ width: 80, height: 80 }}>
                <CircularProgressbar value={((book.currentChapter/book.TotalChapters)*100).toFixed(0)} text={`${((book.currentChapter/book.TotalChapters)*100).toFixed(0)}%`} />;
                </Box>
              </Box>
              <Box className={classes.box}>
              <Typography variant='caption' className={classes.chapterTitle}>Current Chapter</Typography>
              <Typography variant='body1' className={classes.chapter}>Chapter{book.currentChapter}</Typography>
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
      <Button variant='contained' onClick={handleOpen}>
        Add Book
      </Button>
    </Container>
  );
}

export default HomePage